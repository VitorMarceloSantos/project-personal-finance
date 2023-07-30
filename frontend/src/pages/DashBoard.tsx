import { useContext } from 'react';
import { LastCategories } from '../components/DashBoard/LastCategories';
import { LastObjectives } from '../components/DashBoard/LastObjectives';
import { LastTransations } from '../components/DashBoard/LastTransations';
import { Loading } from '../components/DashBoard/Loading';
import { LoginContext } from '../Context/LoginContext';
import { ChartDistribution } from '../components/DashBoard/ChartDistribution';
import { ChartIncomeAndExpense } from '../components/DashBoard/ChartIncomeAndExpense';
import { ThemeContext } from '../Context/ThemeContext';

export const DashBoard = () => {
	const {
		state: { isConnected },
	} = useContext(LoginContext);
	const { state } = useContext(ThemeContext);

	return (
		<section className={`${state}-theme`}>
			<h1 className={`${state}-theme-title`}>DashBoard</h1>
			{!isConnected && <Loading />}
			{isConnected && (
				<div className='dashboard-container'>
					<LastTransations />
					<LastObjectives />
					<LastCategories />
					<ChartDistribution />
					<ChartIncomeAndExpense />
				</div>
			)}
		</section>
	);
};
