import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { NewCategorieProps } from '../../Types/Categories/CreateNewCategorie';
import { ActionsType } from '../../Types/ActionsType';
import { CategorieForm } from './CategorieForm';

export const CreateNewCategorie = ({ stateFormDisplay, stateCategoriesAction }: NewCategorieProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { setVerifyActionCategories, verifyActionCategories } = stateCategoriesAction;

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setVerifyActionCategories(ActionsType.ADD);
	};
	return (
		<>
			<Button
				type='button'
				onClick={handlerSetDisplayForm}
				variant='outlined'
				startIcon={<AddIcon />}
				sx={[
					{ marginTop: '.5rem', borderColor: 'yellow', color: 'black', fontWeight: 'bold' },
					{
						'&:hover': {
							color: 'black',
							backgroundColor: 'yellow',
							borderColor: 'black',
						},
					},
				]}
			>
				Nova Categoria
			</Button>
			{formDisplay && <CategorieForm verifyActionCategories={verifyActionCategories} setFormDisplay={setFormDisplay} />}
		</>
	);
};
