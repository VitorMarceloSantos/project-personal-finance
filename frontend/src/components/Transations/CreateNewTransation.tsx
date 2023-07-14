import { useContext, useState } from 'react';
import { TransationContext } from '../../Context/TransationContext';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { TransationForm } from './TransationForm';

export const CreateNewTransation = () => {
	// const { state, dispatch } = useContext(TransationContext);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);

	const handlerSetDisplayForm = () => {
		setFormDisplay((prev) => !prev);
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
				Nova Trasação
			</Button>
      {formDisplay && (
         <TransationForm />
      )}
		</div>
   
	);
};
