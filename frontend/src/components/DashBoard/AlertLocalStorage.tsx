import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TransationsData } from '../../data/TransationsData';
import { TransationType } from '../../Types/Transations/TransationsType';
import { ObjectivesData } from '../../data/ObjectivesData';
import { ObjectiveType } from '../../Types/Objectives/ObjectivesType';
import { CategorieType } from '../../Types/Categories/CategorieType';
import { CategoriesData } from '../../data/CategoriesData';
import { LoginContext } from '../../Context/LoginContext';
import { ActionsType } from '../../Types/ActionsType';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertLocalStorage() {
	const {dispatch} = React.useContext(LoginContext)
	const [open, setOpen] = React.useState(true); // true, será aberto a janela ao iniciar

	const handleClose = () => {
		function verifyLocalStorage<T>(name: string, data: T[]): void {
			const localValue = localStorage.getItem(name);
			const parseLocalValue = !!localValue ? (JSON.parse(localValue) as T[]) : [];
			if (parseLocalValue.length !== 0) {
				data.splice(0, data.length); // zerando o array(não correr o risco de lixo na memória)
				data.push(...parseLocalValue);
			}
		}
		verifyLocalStorage<TransationType>('localTransations', TransationsData);
		verifyLocalStorage<ObjectiveType>('localObjectives', ObjectivesData);
		verifyLocalStorage<CategorieType>('localCategories', CategoriesData);
		dispatch({ type: ActionsType.UPDATE, payload: {isConnected: true} })
		setOpen(false);
	};

	const removeLocalStorage = () => {
		localStorage.removeItem('localTransations');
		localStorage.removeItem('localObjectives');
		localStorage.removeItem('localCategories');
		dispatch({ type: ActionsType.UPDATE, payload: {isConnected: true} })
		setOpen(false);
	};
	// Não cliclando em nenhuma das opções e fechando a janela, será o mesmo que Aceitar.
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>{'Utilizar informações salvas?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						Utilizar informações anteriores referente as transações, metas e progresso salvas no histórico.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose()}>Aceito</Button>
					<Button onClick={() => removeLocalStorage()}>Rejeito</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
