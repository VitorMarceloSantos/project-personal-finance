import AddIcon from '@mui/icons-material/Add';
import { Button, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { NewCategorieProps } from '../../Types/Categories/CreateNewCategorie';
import { ActionsType } from '../../Types/ActionsType';
import { CategorieForm } from './CategorieForm';
import { ThemeContext } from '../../Context/ThemeContext';
import { useContext, useMemo } from 'react';
import { ThemeButton } from '../Themes/ThemeButton';

export const CreateNewCategorie = ({ stateFormDisplay, stateCategoriesAction }: NewCategorieProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { setVerifyActionCategories, verifyActionCategories } = stateCategoriesAction;
	const { state } = useContext(ThemeContext); // Selecionar Modo Dark
	const themeLigthOrDarkButton = useMemo(() => createTheme(ThemeButton(state)), [state]);
	const widthDisplayButton = useMediaQuery(themeLigthOrDarkButton.breakpoints.down('small_device')); // Retorna: true/false

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setVerifyActionCategories(ActionsType.ADD);
	};
	return (
		<section className={`${state}-theme-categories-new-button`}>
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
					{!widthDisplayButton && 'Nova Categoria'}
				</Button>
				{formDisplay && (
					<CategorieForm verifyActionCategories={verifyActionCategories} setFormDisplay={setFormDisplay} />
				)}
			</ThemeProvider>
		</section>
	);
};
