import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginType } from '../Types/Login/LoginType';
import { joiResolver } from '@hookform/resolvers/joi';
import { createFormSchemaLogin } from '../validations/FormLoginSchema';
import { InitialStateLogin } from '../utils/InitialStateLogin';
import { Button, InputBase, Paper } from '@mui/material';
import { useCallback } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: joiResolver(createFormSchemaLogin), // https://github.com/hapijs/joi/blob/v15.0.3/API.md#validatevalue-schema-options-callback
		defaultValues: { ...InitialStateLogin },
	});

  const onSubmit: SubmitHandler<LoginType> = (data) => {
		if(!!localStorage.getItem('localLogin')) {
			navigate('/dashboard')
			console.log(data)
		} else {
			localStorage.setItem('localLogin', JSON.stringify(data));
		}
  }

	const refInputValue = useCallback((node: HTMLInputElement) => {
		node?.focus();
	}, []);
	return (
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
					// onBlur={(e) => verifyNameExistAdd(e)}
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
					{...register('password')}
					// onBlur={(e) => verifyNameExistAdd(e)}
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
					placeholder='Password'
					type='text'
				/>
				{errors.password && <p>{errors.password?.message}</p>}
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
					Confirmar
				</Button>
			</div>
		</form>
	);
};
