import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TransationType } from '../../Types/TransationsType';
import { joiResolver } from '@hookform/resolvers/joi';
import { createFormSchema } from '../../validations/FormTransationSchema';
import { initialTransation } from '../../util/InitialStateTransation';
import { useCallback, useContext, useState } from 'react';
import { Button, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CategoryType } from '../../Types/CategoryType';
import { CategoriesData } from '../../data/CategoriesData';
import { ObjectivesData } from '../../data/ObjectivesData';
import { TransationContext } from '../../Context/TransationContext';
import { TransationActionType } from '../../Types/TransationActionType';
import { TransationFormProps } from '../../Types/TransationFormProps';

export const TransationForm = ({ verifyActionTransation, setFormDisplay }: TransationFormProps) => {
	const {
		state: { formValues },
		dispatch,
	} = useContext(TransationContext);
	const insertValuesForm = verifyActionTransation === 'update' ? formValues : initialTransation;
	console.log(`update: ${insertValuesForm.destination}`);
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<TransationType>({
		resolver: joiResolver(createFormSchema, { allowUnknown: true }), // https://github.com/hapijs/joi/blob/v15.0.3/API.md#validatevalue-schema-options-callback
		defaultValues: { ...insertValuesForm },
	}); // value foi definida como undefined para que o conteúdo do placeholder possa aparecer, caso contrário o conteúdo do campo seria 0
	const [filterCategorySelected, setFilterCategorySelected] = useState<string>(insertValuesForm.category);
	const [filterDestinationSelected, setFilterDestinationSelected] = useState<string>(insertValuesForm.destination);

	const handlerFilterCategorySelected = (e: SelectChangeEvent<string>) => {
		const { target } = e;
		setFilterCategorySelected(target.value as keyof CategoryType);
	};

	const handlerFilterDestinationSelected = (e: SelectChangeEvent<string>) => {
		const { target } = e;
		setFilterDestinationSelected(target.value);
	};

	const onSubmit: SubmitHandler<TransationType> = (data) => {
		data.category === 'Metas' ? (data.type = 'Receita') : (data.type = 'Despesa');

		// Adicionando a key id
		const localValue = localStorage.getItem('keyId');
		if (localValue === null) {
			localStorage.setItem('keyId', '1');
			data.id = 1;
		} else {
			let keyId = JSON.parse(localValue);
			keyId += 1;
			data.id = keyId;
			localStorage.setItem('keyId', JSON.stringify(keyId));
		}
		verifyActionTransation === 'update'
			? dispatch({
					type: TransationActionType.UPDATE,
					payload: data,
			  })
			: dispatch({ type: TransationActionType.ADD, payload: data });
		setFormDisplay(false); // Fechando o formulário(ao fechar o formulário os valores(input values) são apagados)
	};

	//https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
	const refInputValue = useCallback((node: HTMLInputElement) => {
		node?.focus();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				<Controller
					name='value'
					control={control}
					render={({ field }) => (
						<InputBase
							{...field}
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
					)}
				/>
				{errors.value && <p>{errors.value?.message}</p>}

				<Select
					//componente não controlado
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
					{CategoriesData.map((category, index) => (
						<MenuItem value={category} key={index}>
							{category}
						</MenuItem>
					))}
				</Select>
				{errors.category && <p>{errors.category?.message}</p>}
				<Select
					//componente não controlado
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
				{errors.destination && <p>{errors.destination?.message}</p>}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<InputBase
							{...field}
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
					)}
				/>
				{errors.description && <p>{errors.description?.message}</p>}
			</Paper>

			<div className='button-check-form'>
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
					Enviar
				</Button>
			</div>
		</form>
	);
};
