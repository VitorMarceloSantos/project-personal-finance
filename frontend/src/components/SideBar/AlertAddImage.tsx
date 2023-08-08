import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
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

export default function AlertAddImage() {
	const { state } = React.useContext(ThemeContext);
	const themeLigthOrDarkDialog = React.useMemo(() => createTheme(ThemeDialog(state)), [state]);
	const [open, setOpen] = React.useState(true); // true, será aberto a janela ao iniciar
	const handleClose = () => {
		setOpen(false);
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
					<DialogTitle sx={{ color: themeLigthOrDarkDialog.palette.primary.main }}>{'Formato Inválido'}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-slide-description'>
							O formato do arquivo não é permitido. Formatos válidos: JPEG/PNG
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
							onClick={() => handleClose()}
						>
							Fechar
						</Button>
					</DialogActions>
				</Dialog>
			</ThemeProvider>
		</>
	);
}
