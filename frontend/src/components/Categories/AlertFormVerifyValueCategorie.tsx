import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';
import { AlertFormCategoriesType } from '../../Types/Categories/AlertFormCategoriesType';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertFormVerifyValueCategorie({ setFormDisplay }: AlertFormCategoriesType) {
	const [open, setOpen] = React.useState(true); // true, será aberto a janela ao iniciar
	const navigate = useNavigate();
	const handleClose = () => {
		setOpen(false);
		setFormDisplay(false);
		navigate('/categorias');
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => handleClose()}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>{'Categoria Existente'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						O nome escolhida já se encontra cadastrado..
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose()}>Fechar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
