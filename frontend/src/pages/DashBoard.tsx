import { useState } from 'react';
import AlertLocalStorage from '../components/DashBoard/AlertLocalStorage';
import { LastCategories } from '../components/DashBoard/LastCategories';
import { LastObjectives } from '../components/DashBoard/LastObjectives';
import { LastTransations } from '../components/DashBoard/LastTransations';
import { VerifyTrueOrFalseLocalStorage } from '../utils/VerifyLocalStorage';

export const DashBoard = () => {
	
	const [returnLocalStorage, setReturnLocalStorage] = useState<boolean>(false)
	const [verifyLocalStorage] = useState<boolean>(VerifyTrueOrFalseLocalStorage());
	
	return (
		<>
			<h1>DashBoard</h1>
			{verifyLocalStorage && <AlertLocalStorage />}
			{returnLocalStorage && (
				<div className='dashboard-container'>
					<LastTransations />
					<LastObjectives />
					<LastCategories />
				</div>
			)}
		</>
	);
};
