import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useCallback, useContext } from 'react';
import { Button, InputBase, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ActionsType } from '../../Types/ActionsType';
import { ObjectiveFormProps } from '../../Types/Objectives/ObjectiveForm';
import { ObjectiveContext } from '../../Context/ObjectiveContext';
import { initialObjectives } from '../../utils/InitialStateObjectives';
import { ObjectiveType } from '../../Types/Objectives/ObjectivesType';
import { createFormSchemaObjective } from '../../validations/FormObjectiveSchema';

export const ObjectiveForm = ({ verifyActionObjective, setFormDisplay }: ObjectiveFormProps) => {
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
					{...register('name')}
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
					placeholder='Nome'
					type='text'
				/>
				{errors.name && <p>{errors.name?.message}</p>}

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

				<InputBase
					{...register('value')}
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
