import AddIcon from '@mui/icons-material/Add';
import { Button, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { ActionsType } from '../../Types/ActionsType';
import { NewObjectivesProps } from '../../Types/Objectives/CreateNewObjective';
import { ObjectiveForm } from './ObjectiveForm';
import { ObjectivesData } from '../../data/ObjectivesData';
import { ThemeContext } from '../../Context/ThemeContext';
import { useContext, useMemo } from 'react';
import { ThemeButton } from '../Themes/ThemeButton';

export const CreateNewObjective = ({ stateFormDisplay, stateObjectiveAction }: NewObjectivesProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { setverifyActionObjective, verifyActionObjective } = stateObjectiveAction;
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkButton = useMemo(() => createTheme(ThemeButton(state)), [state]);
	const widthDisplayButton = useMediaQuery(themeLigthOrDarkButton.breakpoints.down('small_device')); // Retorna: true/false

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setverifyActionObjective(ActionsType.ADD);
	};
	return (
		<section className={`${state}-theme-objectives-new-button`}>
			<ThemeProvider theme={themeLigthOrDarkButton}>
				<Button
					disabled={ObjectivesData.length < 5 ? false : true}
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
					{!widthDisplayButton && 'Nova Meta'}
				</Button>
				{formDisplay && <ObjectiveForm verifyActionObjective={verifyActionObjective} setFormDisplay={setFormDisplay} />}
			</ThemeProvider>
		</section>
	);
};
