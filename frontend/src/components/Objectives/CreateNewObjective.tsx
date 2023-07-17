import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { ActionsType } from '../../Types/ActionsType';
import { NewObjectivesProps } from '../../Types/Objectives/CreateNewObjective';
import { ObjectiveForm } from './ObjectiveForm';

export const CreateNewObjective = ({ stateFormDisplay, stateObjectiveAction }: NewObjectivesProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { setverifyActionObjective, verifyActionObjective } = stateObjectiveAction;

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setverifyActionObjective(ActionsType.ADD);
	};
	return (
		<div>
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
				Nova Meta
			</Button>
			{formDisplay && <ObjectiveForm verifyActionObjective={verifyActionObjective} setFormDisplay={setFormDisplay} />}
		</div>
	);
};
