import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { TransationForm } from './TransationForm';
import { NewTransationProps } from '../../Types/Transations/CreateNewTransation';
import { TransationActionType } from '../../Types/Transations/TransationActionType';

export const CreateNewTransation = ({ stateFormDisplay, stateTransationAction }: NewTransationProps) => {
	const { formDisplay, setFormDisplay } = stateFormDisplay;
	const { verifyActionTransation, setverifyActionTransation } = stateTransationAction;

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
		setverifyActionTransation(TransationActionType.ADD);
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
				Nova Transação
			</Button>
			{formDisplay && (
				<TransationForm verifyActionTransation={verifyActionTransation} setFormDisplay={setFormDisplay} />
			)}
		</div>
	);
};
