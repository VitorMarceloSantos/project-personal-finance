import AddIcon from '@mui/icons-material/Add';
import { Button, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { TransationForm } from './TransationForm';
import { NewTransationProps } from '../../Types/Transations/CreateNewTransation';
import { ActionsType } from '../../Types/ActionsType';
import { ThemeButton } from '../Themes/ThemeButton';
import { ThemeContext } from '../../Context/ThemeContext';
import { useContext, useMemo } from 'react';

export const CreateNewTransation = ({ stateFormDisplay, stateTransationAction }: NewTransationProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { verifyActionTransation, setverifyActionTransation } = stateTransationAction;
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkButton = useMemo(() => createTheme(ThemeButton(state)), [state]);
	const widthDisplayButton = useMediaQuery(themeLigthOrDarkButton.breakpoints.down('small_device')); // Retorna: true/false

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setverifyActionTransation(ActionsType.ADD);
	};
	return (
		<section className={`${state}-theme-transations-new-button`}>
			<ThemeProvider theme={themeLigthOrDarkButton}>
				<Button
					type='button'
					onClick={handlerSetDisplayForm}
					variant='outlined'
					startIcon={<AddIcon />}
					sx={[
						{
							borderColor: themeLigthOrDarkButton.palette.primary.main,
							color: themeLigthOrDarkButton.palette.text.secondary,
							backgroundColor: themeLigthOrDarkButton.palette.primary.main,
							marginBottom: '1rem',
						},
						{
							'&:hover': {
								color: themeLigthOrDarkButton.palette.text.primary,
								backgroundColor: themeLigthOrDarkButton.palette.primary.main,
							},
						},
						{ [themeLigthOrDarkButton.breakpoints.down('small_device')]: { width: '10vw', paddingLeft: '1.7rem' } },
						// paddingLeft: utilizado para centralizar o startIcon
					]}
				>
					{!widthDisplayButton && 'Nova Transação'}
				</Button>
				{formDisplay && (
					<TransationForm verifyActionTransation={verifyActionTransation} setFormDisplay={setFormDisplay} />
				)}
			</ThemeProvider>
		</section>
	);
};
