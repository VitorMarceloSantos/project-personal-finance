import { SubmitHandler, useForm } from 'react-hook-form';
import { TransationType } from '../../Types/Transations/TransationsType';
import { joiResolver } from '@hookform/resolvers/joi';
import { createFormSchemaTransation } from '../../validations/FormTransationSchema';
import { initialTransation } from '../../utils/InitialStateTransation';
import { useCallback, useContext, useMemo, useState } from 'react';
import {
	Button,
	InputBase,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	ThemeProvider,
	createTheme,
	useMediaQuery,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CategoryType } from '../../Types/Transations/CategoryType';
import { ObjectivesData } from '../../data/ObjectivesData';
import { TransationContext } from '../../Context/TransationContext';
import { ActionsType } from '../../Types/ActionsType';
import { TransationFormProps } from '../../Types/Transations/TransationFormProps';
import AlertFormObjectivesDefault from './AlertFormObjectivesDefault';
import { ObjectiveType } from '../../Types/Objectives/ObjectivesType';
import { UpdateValuesData } from '../../utils/UpdateValuesData';
import AlertFormVerifyValueObjective from './AlertFormVerifyValueObjective';
import { initialCategories } from '../../utils/InitialStateCategories';
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeForm } from '../Themes/ThemeForm';

export const TransationForm = ({ verifyActionTransation, setFormDisplay }: TransationFormProps) => {
	const {
		state: { formValues },
		dispatch,
	} = useContext(TransationContext);
	const insertValuesForm = verifyActionTransation === 'update' ? formValues : initialTransation;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TransationType>({
		resolver: joiResolver(createFormSchemaTransation, { allowUnknown: true }), // https://github.com/hapijs/joi/blob/v15.0.3/API.md#validatevalue-schema-options-callback
		defaultValues: { ...insertValuesForm },
	});
	const [valueForm, setValueForm] = useState<number | undefined>(undefined);
	const [filterCategorySelected, setFilterCategorySelected] = useState<string>(insertValuesForm.category);
	const [filterDestinationSelected, setFilterDestinationSelected] = useState<string>(insertValuesForm.destination);
	const [verifyTrueOrFalseValue, setverifyTrueOrFalseValue] = useState<boolean>(false);
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkForm = useMemo(() => createTheme(ThemeForm(state)), [state]);
	const widthDisplayButton = useMediaQuery(themeLigthOrDarkForm.breakpoints.down('small_device')); // Retorna: true/false

	const verifyRealizedObjective = (destination: string, value: number) => {
		const indexObjective = ObjectivesData.findIndex(({ name }) => name === destination);
		const objectiveSelect: ObjectiveType | undefined = ObjectivesData[indexObjective];

		if (!!objectiveSelect.value) {
			const sumValues = objectiveSelect.realized + value;
			if (sumValues <= objectiveSelect.value) {
				const objectivesDataUpdate = [...ObjectivesData];
				objectivesDataUpdate[indexObjective].realized = sumValues;
				UpdateValuesData<ObjectiveType>(ObjectivesData, objectivesDataUpdate, 'localObjectives');
				return false;
			}
			return true;
		}
	};

	const handlerFilterCategorySelected = (e: SelectChangeEvent<string>) => {
		const { target } = e;
		setFilterCategorySelected(target.value as keyof CategoryType);
	};

	const handlerFilterDestinationSelected = (e: SelectChangeEvent<string>) => {
		const { target } = e;
		setFilterDestinationSelected(target.value);
		if (!!valueForm) setverifyTrueOrFalseValue(verifyRealizedObjective(target.value, valueForm) as boolean);
	};

	const handlerFilterDestinationOthers = (e: SelectChangeEvent<string>) => {
		const { target } = e;
		setFilterDestinationSelected(target.value);
	};

	const handlerSetValueForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { target } = e;
		setValueForm(Number(target.value));
	};

	// FAZER TRY/CATCH
	const onSubmit: SubmitHandler<TransationType> = (data) => {
		if (data.category === 'Metas') {
			data.type = 'Receita';
		} else {
			data.type = 'Despesa';
		}
		if (verifyActionTransation === 'update') {
			dispatch({
				type: ActionsType.UPDATE,
				payload: data,
			});
		} else {
			// Adicionando id em trasações que não possuem
			const localValue = localStorage.getItem('localTransations');
			if (localValue !== null) {
				const parseLocalValue = JSON.parse(localValue) as TransationType[];
				if (parseLocalValue.length === 0) {
					data.id = 0;
				} else {
					let keyId = parseLocalValue[parseLocalValue.length - 1].id;
					keyId += 1;
					data.id = keyId;
				}
			}
			// data.id = 0 -> value inicial
			dispatch({ type: ActionsType.ADD, payload: data });
		}
		setFormDisplay(false); // Fechando o formulário(ao fechar o formulário os valores(input values) são apagados)
	};

	//https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
	const refInputValue = useCallback((node: HTMLInputElement) => {
		node?.focus();
	}, []);

	return (
		// Utilizado a tag div, pois o paper já é um form
		<form onSubmit={handleSubmit(onSubmit)} className='form-transation'>
			<ThemeProvider theme={themeLigthOrDarkForm}>
				<Paper
					component='form'
					sx={[
						{
							border: `1px solid ${themeLigthOrDarkForm.palette.primary.main}`,
							width: '40vw',
						},
						{ [themeLigthOrDarkForm.breakpoints.down('laptop')]: { width: '50vw' } },
						{
							[themeLigthOrDarkForm.breakpoints.down('small_device')]: { width: '60vw' },
						},
						{
							[themeLigthOrDarkForm.breakpoints.down('mobile')]: { width: '85vw' },
						},
					]}
				>
					<InputBase
						{...register('value')}
						value={valueForm}
						onChange={(e) => handlerSetValueForm(e)}
						inputRef={refInputValue}
						sx={{
							flex: 1,
							color: themeLigthOrDarkForm.palette.text.primary,
							border: `1px solid ${themeLigthOrDarkForm.palette.primary.main}`,
							width: '95%',
						}}
						placeholder='Valor'
						type='number'
					/>
					{errors.value && <p>{errors.value?.message}</p>}
					<Select
						{...register('category')}
						onChange={(e) => handlerFilterCategorySelected(e)}
						value={filterCategorySelected}
						// Retirar bordas do input
						variant='standard'
						disableUnderline={true}
						sx={[
							{
								color: themeLigthOrDarkForm.palette.text.primary,
								width: '30%',
								backgroundColor: themeLigthOrDarkForm.palette.primary.main,
							},
							{
								[themeLigthOrDarkForm.breakpoints.down('small_device')]: { width: '40%' },
							},
						]}
					>
						<MenuItem value='Categoria' disabled>
							Categoria
						</MenuItem>
						{initialCategories.map((category, index) => (
							<MenuItem value={category.name} key={index}>
								{category.name}
							</MenuItem>
						))}
					</Select>
					{errors.category && <p>{errors.category?.message}</p>}
					{filterCategorySelected === 'Metas' && ObjectivesData.length === 0 && (
						<AlertFormObjectivesDefault setFormDisplay={setFormDisplay} />
					)}
					<Select
						{...register('destination')}
						className='input-options'
						value={filterDestinationSelected}
						onChange={(e) => {
							filterCategorySelected === 'Metas'
								? handlerFilterDestinationSelected(e)
								: handlerFilterDestinationOthers(e);
						}}
						// Retirar bordas do input
						variant='standard'
						disableUnderline={true}
						sx={[
							{
								color: themeLigthOrDarkForm.palette.text.primary,
								width: '30%',
								backgroundColor: themeLigthOrDarkForm.palette.primary.main,
							},
							{
								[themeLigthOrDarkForm.breakpoints.down('small_device')]: { width: '40%' },
							},
						]}
					>
						<MenuItem value='Destinação' disabled>
							Destinação
						</MenuItem>
						{filterCategorySelected === 'Metas' ? (
							ObjectivesData.map(({ name }, index) => (
								<MenuItem value={name} key={index}>
									{name}
								</MenuItem>
							))
						) : (
							<MenuItem value='Gastos'>Gastos</MenuItem>
						)}
					</Select>
					{errors.destination && <p>{errors.destination?.message}</p>}
					{verifyTrueOrFalseValue && <AlertFormVerifyValueObjective setFormDisplay={setFormDisplay} />}
					<InputBase
						{...register('description')}
						sx={{
							flex: 1,
							color: themeLigthOrDarkForm.palette.text.primary,
							border: `1px solid ${themeLigthOrDarkForm.palette.primary.main}`,
							width: '95%',
						}}
						placeholder='Descrição'
						type='text'
					/>
					{errors.description && <p>{errors.description?.message}</p>}
				</Paper>

				<div className='button-check-form'>
					<Button
						type='button'
						variant='outlined'
						startIcon={<CancelIcon />}
						onClick={() => setFormDisplay(false)}
						sx={[
							{
								borderColor: themeLigthOrDarkForm.palette.primary.main,
								color: '#000',
								backgroundColor: themeLigthOrDarkForm.palette.primary.main,
							},
							{
								'&:hover': {
									color: '#fff',
									backgroundColor: themeLigthOrDarkForm.palette.primary.main,
								},
							},
							{ [themeLigthOrDarkForm.breakpoints.down('small_device')]: { width: '10vw', paddingLeft: '1.7rem' } },
						]}
					>
						{!widthDisplayButton && 'Cancelar'}
					</Button>
					<Button
						type='submit'
						variant='outlined'
						startIcon={<CheckCircleIcon />}
						sx={[
							{
								borderColor: themeLigthOrDarkForm.palette.primary.main,
								color: '#000',
								backgroundColor: themeLigthOrDarkForm.palette.primary.main,
							},
							{
								'&:hover': {
									color: '#fff',
									backgroundColor: themeLigthOrDarkForm.palette.primary.main,
								},
							},
							{ [themeLigthOrDarkForm.breakpoints.down('small_device')]: { width: '10vw', paddingLeft: '1.7rem' } },
							// paddingLeft: utilizado para centralizar o startIcon
						]}
					>
						{!widthDisplayButton && 'Confirmar'}
					</Button>
				</div>
			</ThemeProvider>
		</form>
	);
};
