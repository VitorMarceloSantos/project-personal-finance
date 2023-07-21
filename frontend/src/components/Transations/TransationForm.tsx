import { SubmitHandler, useForm } from 'react-hook-form';
import { TransationType } from '../../Types/Transations/TransationsType';
import { joiResolver } from '@hookform/resolvers/joi';
import { createFormSchemaTransation } from '../../validations/FormTransationSchema';
import { initialTransation } from '../../utils/InitialStateTransation';
import { useCallback, useContext, useState } from 'react';
import { Button, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
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
					data.id = 1;
				} else {
					let keyId = parseLocalValue[parseLocalValue.length - 1].id;
					keyId += 1;
					data.id = keyId;
				}
			}
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
		<form onSubmit={handleSubmit(onSubmit)} className='form'>
			<Paper
				component='form'
				sx={{
					p: '1rem',
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					background: 'transparent',
					border: '1px solid yellow',
					color: 'yellow',
				}}
			>
				<InputBase
					{...register('value')}
					value={valueForm}
					onChange={(e) => handlerSetValueForm(e)}
					inputRef={refInputValue}
					sx={{
						m: 1,
						flex: 1,
						color: 'black',
						fontWeight: 'bold',
						fontFamily: 'Times New Roman',
						border: '1px solid yellow',
						borderRadius: '5px',
						textAlign: 'justify',
						width: '50vw',
						maxWidth: '550px',
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
							color: 'black',
							border: 'none',
							width: '130px',
							backgroundColor: 'yellow',
							textAlign: 'center',
							fontWeight: 'bold',
							fontFamily: 'Times New Roman',
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
					onChange={(e) => handlerFilterDestinationSelected(e)}
					// Retirar bordas do input
					variant='standard'
					disableUnderline={true}
					sx={[
						{
							color: 'black',
							border: 'none',
							width: '130px',
							backgroundColor: 'yellow',
							textAlign: 'center',
							fontWeight: 'bold',
							fontFamily: 'Times New Roman',
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

				{/* ALTERAR ALERT(passar parametros valores excedentes) PARA PARAMETROS CORRETOS */}

				{errors.destination && <p>{errors.destination?.message}</p>}
				{<p>{`Resultado: ${verifyTrueOrFalseValue}`}</p>}
				{verifyTrueOrFalseValue && <AlertFormVerifyValueObjective setFormDisplay={setFormDisplay} />}
				<InputBase
					{...register('description')}
					sx={{
						m: 1,
						flex: 1,
						color: 'black',
						fontWeight: 'bold',
						fontFamily: 'Times New Roman',
						border: '1px solid yellow',
						borderRadius: '5px',
						textAlign: 'justify',
						width: '50vw',
						maxWidth: '550px',
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
						{ marginTop: '.5rem', borderColor: 'yellow', color: 'yellow', fontWeight: 'bold' },
						{
							'&:hover': {
								color: 'black',
								backgroundColor: 'yellow',
								borderColor: 'black',
							},
						},
					]}
				>
					Cancelar
				</Button>
				<Button
					type='submit'
					variant='outlined'
					startIcon={<CheckCircleIcon />}
					sx={[
						{ marginTop: '.5rem', borderColor: 'yellow', color: 'yellow', fontWeight: 'bold' },
						{
							'&:hover': {
								color: 'black',
								backgroundColor: 'yellow',
								borderColor: 'black',
							},
						},
					]}
				>
					Confirmar
				</Button>
			</div>
		</form>
	);
};
