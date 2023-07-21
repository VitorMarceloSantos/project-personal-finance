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
import { AlertFormObjectivesType } from '../../Types/Transations/AlertFormObjectivesType';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertFormVerifyValueObjective({ setFormDisplay }: AlertFormObjectivesType) {
	const [open, setOpen] = React.useState(true); // true, será aberto a janela ao iniciar
	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
		setFormDisplay(false);
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
				<DialogTitle>{'Valor Excedente'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						O valor da transação excede o valor da meta.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => navigate('/metas')}>Verificar Meta</Button>
					<Button onClick={() => handleClose()}>Voltar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
