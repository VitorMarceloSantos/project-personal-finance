import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { NewCategorieProps } from '../../Types/Categories/CreateNewCategorie';
import { CategoriesData } from '../../data/CategoriesData';
import { ActionsType } from '../../Types/ActionsType';

export const CreateNewCategorie = ({ stateFormDisplay, stateCategoriesAction }: NewCategorieProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { setVerifyActionCategories, verifyActionCategories } = stateCategoriesAction;

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setVerifyActionCategories(ActionsType.ADD);
	};
	return (
		<div>
			<Button
				disabled={CategoriesData.length < 5 ? false : true}
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
				Nova Meta
			</Button>
			{/* {formDisplay && <CategorieForm verifyActionObjective={verifyActionCategorie} setFormDisplay={setFormDisplay} />} */}
		</div>
	);
};
