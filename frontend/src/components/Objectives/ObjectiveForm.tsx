import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useCallback, useContext, useMemo } from 'react';
import { Button, InputBase, Paper, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ActionsType } from '../../Types/ActionsType';
import { ObjectiveFormProps } from '../../Types/Objectives/ObjectiveForm';
import { ObjectiveContext } from '../../Context/ObjectiveContext';
import { initialObjectives } from '../../utils/InitialStateObjectives';
import { ObjectiveType } from '../../Types/Objectives/ObjectivesType';
import { createFormSchemaObjective } from '../../validations/FormObjectiveSchema';
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeForm } from '../Themes/ThemeForm';

export const ObjectiveForm = ({ verifyActionObjective, setFormDisplay }: ObjectiveFormProps) => {
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkForm = useMemo(() => createTheme(ThemeForm(state)), [state]);
	const widthDisplayButton = useMediaQuery(themeLigthOrDarkForm.breakpoints.down('small_device')); // Retorna: true/false
	const {
		state: { formValues },
		dispatch,
	} = useContext(ObjectiveContext);
	const insertValuesForm = verifyActionObjective === 'update' ? formValues : initialObjectives;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ObjectiveType>({
		resolver: joiResolver(createFormSchemaObjective, { allowUnknown: true }), // https://github.com/hapijs/joi/blob/v15.0.3/API.md#validatevalue-schema-options-callback
		defaultValues: { ...insertValuesForm },
	});

	const onSubmit: SubmitHandler<ObjectiveType> = (data) => {
		if (verifyActionObjective === 'update') {
			dispatch({
				type: ActionsType.UPDATE,
				payload: data,
			});
		} else {
			// Adicionando id em trasações que não possuem
			const localValue = localStorage.getItem('localObjectives');
			if (localValue !== null) {
				const parseLocalValue = JSON.parse(localValue) as ObjectiveType[];
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
		<form onSubmit={handleSubmit(onSubmit)} className='form'>
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
						{...register('name')}
						inputRef={refInputValue}
						sx={{
							flex: 1,
							color: themeLigthOrDarkForm.palette.text.primary,
							border: `1px solid ${themeLigthOrDarkForm.palette.primary.main}`,
							width: '95%', // leva em consideração o tamanho do Paper
						}}
						placeholder='Nome'
						type='text'
					/>
					{errors.name && <p>{errors.name?.message}</p>}

					<InputBase
						{...register('description')}
						sx={{
							flex: 1,
							color: themeLigthOrDarkForm.palette.text.primary,
							border: `1px solid ${themeLigthOrDarkForm.palette.primary.main}`,
							width: '95%', // leva em consideração o tamanho do Paper
						}}
						placeholder='Descrição'
						type='text'
					/>
					{errors.description && <p>{errors.description?.message}</p>}

					<InputBase
						{...register('value')}
						sx={{
							flex: 1,
							color: themeLigthOrDarkForm.palette.text.primary,
							border: `1px solid ${themeLigthOrDarkForm.palette.primary.main}`,
							width: '95%', // leva em consideração o tamanho do Paper
						}}
						placeholder='Valor'
						type='number'
					/>
					{errors.value && <p>{errors.value?.message}</p>}
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
						]}
					>
						{!widthDisplayButton && 'Confirmar'}
					</Button>
				</div>
			</ThemeProvider>
		</form>
	);
};
