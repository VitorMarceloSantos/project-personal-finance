import AddIcon from '@mui/icons-material/Add';
import { Button, ThemeProvider, createTheme } from '@mui/material';
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
						},
						{
							'&:hover': {
								color: themeLigthOrDarkButton.palette.text.primary,
								backgroundColor: themeLigthOrDarkButton.palette.primary.main,
							},
						},
					]}
				>
					Nova Transação
				</Button>
				{formDisplay && (
					<TransationForm verifyActionTransation={verifyActionTransation} setFormDisplay={setFormDisplay} />
				)}
			</ThemeProvider>
		</section>
	);
};
