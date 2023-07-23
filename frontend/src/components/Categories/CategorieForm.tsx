import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useCallback, useContext, useState } from 'react';
import { Button, InputBase, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CategorieFormProps } from '../../Types/Categories/CategorieForm';
import { CategoriesContext } from '../../Context/CategoriesContex';
import { initialCategories, initialCategoriesZero } from '../../utils/InitialStateCategories';
import { CategorieType } from '../../Types/Categories/CategorieType';
import { createFormSchemaCategorie } from '../../validations/FormCategorieSchema';
import { ActionsType } from '../../Types/ActionsType';
import { CategoriesData } from '../../data/CategoriesData';
import AlertFormVerifyValueCategorie from './AlertFormVerifyValueCategorie';

export const CategorieForm = ({ verifyActionCategories, setFormDisplay }: CategorieFormProps) => {
	const {
		state: { formValues },
		dispatch,
	} = useContext(CategoriesContext);
	const insertValuesForm = verifyActionCategories === 'update' ? formValues : initialCategoriesZero;
	const [verifyNameExist, setVerifyNameExist] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CategorieType>({
		resolver: joiResolver(createFormSchemaCategorie, { allowUnknown: true }), // https://github.com/hapijs/joi/blob/v15.0.3/API.md#validatevalue-schema-options-callback
		defaultValues: { ...insertValuesForm },
	});

	const verifyNameExistAdd = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = e.target;
		// A categoria Metas é obrigatória, não pode ser alterada ou excluida
		const verifyValueCategoriesData: CategorieType[] =
			CategoriesData.length !== 0 ? [...CategoriesData] : initialCategories;
		if (verifyValueCategoriesData.some(({ name }) => name.toLocaleLowerCase() === value.toLocaleLowerCase())) {
			setVerifyNameExist(true);
		}
	};

	const onSubmit: SubmitHandler<CategorieType> = (data) => {
		// Verificar se a categoria já se encontra cadastrada
		if (verifyActionCategories === 'update') {
			dispatch({
				type: ActionsType.UPDATE,
				payload: data,
			});
		} else {
			// Adicionando id em categoria que não possuem
			const localValue = localStorage.getItem('localCategories');
			if (localValue !== null) {
				// Categories sempre vai existir no mínimo length ===1, Metas(não pode apagar/editar)
				const parseLocalValue = JSON.parse(localValue) as CategorieType[];
				let keyId = parseLocalValue[parseLocalValue.length - 1].id;
				keyId += 1;
				data.id = keyId;
			} else {
				data.id = 7; // initialCategories possui length 6
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
		<>
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
						onBlur={(e) => verifyNameExistAdd(e)}
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
				</Paper>
				{verifyNameExist && <AlertFormVerifyValueCategorie setFormDisplay={setFormDisplay} />}
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
		</>
	);
};
