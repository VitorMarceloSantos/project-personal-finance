import { useContext } from 'react';
import { LastCategories } from '../components/DashBoard/LastCategories';
import { LastObjectives } from '../components/DashBoard/LastObjectives';
import { LastTransations } from '../components/DashBoard/LastTransations';
import { Loading } from '../components/DashBoard/Loading';
import { LoginContext } from '../Context/LoginContext';
import { ChartDistribution } from '../components/DashBoard/ChartDistribution';

export const DashBoard = () => {
	const {
		state: { isConnected },
	} = useContext(LoginContext);
	return (
		<>
			<h1>DashBoard</h1>
			{!isConnected && <Loading />}
			{isConnected && (
				<div className='dashboard-container'>
					<LastTransations />
					<LastObjectives />
					<LastCategories />
					<ChartDistribution />
				</div>
			)}
		</>
	);
};
