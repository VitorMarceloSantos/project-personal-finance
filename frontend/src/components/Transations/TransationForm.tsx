import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TransationType } from '../../Types/TransationsType';
import { joiResolver } from '@hookform/resolvers/joi';
import { createFormSchema } from '../../validations/FormTransationSchema';
import { initialTransation } from '../../util/InitialStateTransation';
import { useEffect } from 'react';
import { Form } from 'react-router-dom';
import { InputBase, Paper } from '@mui/material';

export const TransationForm = () => {
	const {
		handleSubmit,
		setFocus,
		formState: { errors },
		control,
	} = useForm<TransationType>({
		resolver: joiResolver(createFormSchema),
		defaultValues: { ...initialTransation, value: undefined },
	}); // value foi definida como undefined para que o conteúdo do placeholder possa aparecer, caso contrário o conteúdo do campo seria 0

	const onSubmit: SubmitHandler<TransationType> = (data) => {
		console.log(data);
		// actionSelected.actionSelected === 'update'
		// 	? dispatch({
		// 			type: actionSelected.actionSelected,
		// 			payload: { currentValues: data, valuesDepreciated: missionValueUpdate.valuesUpdate },
		// 	  })
		// 	: dispatch({ type: actionSelected.actionSelected, payload: { currentValues: data } });
		// setFormDisplay(false); // Fechando o formulário(ao fechar o formulário os valores(input values) são apagados)
	};

	useEffect(() => {
		//https://react-hook-form.com/docs/useform/setfocus
		setFocus('value');
	}, [setFocus]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
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
      </Paper>
		</Form>
	);
};
