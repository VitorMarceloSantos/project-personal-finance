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
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeDialog } from '../Themes/ThemeDialog';
import { ThemeProvider, createTheme } from '@mui/material';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertFormVerifyValueObjective({ setFormDisplay }: AlertFormObjectivesType) {
	const { state } = React.useContext(ThemeContext);
	const themeLigthOrDarkDialog = React.useMemo(() => createTheme(ThemeDialog(state)), [state]);
	const [open, setOpen] = React.useState(true); // true, será aberto a janela ao iniciar
	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
		setFormDisplay(false);
	};

	return (
		<>
			<ThemeProvider theme={themeLigthOrDarkDialog}>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={() => handleClose()}
					aria-describedby='alert-dialog-slide-description'
				>
					<DialogTitle sx={{ color: themeLigthOrDarkDialog.palette.primary.main }}>{'Valor Excedente'}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-slide-description'>
							O valor da transação excede o valor da meta.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							sx={[
								{
									backgroundColor: themeLigthOrDarkDialog.palette.primary.main,
									color: themeLigthOrDarkDialog.palette.text.primary,
								},
								{
									'&:hover': {
										backgroundColor: themeLigthOrDarkDialog.palette.text.primary,
										color: themeLigthOrDarkDialog.palette.primary.main,
									},
								},
							]}
							onClick={() => navigate('/metas')}
						>
							Verificar Meta
						</Button>
						<Button
							sx={[
								{
									backgroundColor: themeLigthOrDarkDialog.palette.primary.main,
									color: themeLigthOrDarkDialog.palette.text.primary,
								},
								{
									'&:hover': {
										backgroundColor: themeLigthOrDarkDialog.palette.text.primary,
										color: themeLigthOrDarkDialog.palette.primary.main,
									},
								},
							]}
							onClick={() => handleClose()}
						>
							Voltar
						</Button>
					</DialogActions>
				</Dialog>
			</ThemeProvider>
		</>
	);
}
