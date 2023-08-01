import { TransationsData } from '../../data/TransationsData';
import { Chart } from 'react-google-charts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { ThemeContext } from '../../Context/ThemeContext';
import { useContext } from 'react';

export const ChartIncomeAndExpense = () => {
	const { state } = useContext(ThemeContext);
	const dataIncomeAndExpense = { income: 0, expense: 0 };
	for (let i = 0; i < TransationsData.length; i += 1) {
		if (TransationsData[i].type === 'Receita') {
			dataIncomeAndExpense.income += TransationsData[i].value as number;
		} else {
			dataIncomeAndExpense.expense += TransationsData[i].value as number;
		}
	}
	const dataIncomeAndExpenseArray = [
		['', 'Receita', 'Despesa'],
		['', dataIncomeAndExpense.income, dataIncomeAndExpense.expense],
	];
	const options = {
		title: '',
		chartArea: { width: '50%' },
		isStacked: true,
		backgroundColor: 'transparent',
		colors: ['green', 'red'], 
		display: 'flex',
		justifyContent: 'center',
	};
	return (
		<section className={`${state}-chart-income-and-expense`}>
			<h1 className={`${state}-chart-income-and-expense-title`}>Consolidado</h1>
			<div className={`${state}-chart-income-and-expense-container`}>
				<article className={`${state}-chart-income-and-expense-income`}>
					<p className={`${state}-chart-income-and-expense-income-text`}>Receita</p>
					<div className={`${state}-chart-income-and-expense-income-div`}>
						<CurrencyExchangeIcon sx={{ color: 'green' }} />
						<p>{dataIncomeAndExpense.income.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
					</div>
				</article>
				<article className={`${state}-chart-income-and-expense-expense`}>
					<p className={`${state}-chart-income-and-expense-expense-text`}>Despesa</p>
					<div className={`${state}-chart-income-and-expense-expense-div`}>
						<CurrencyExchangeIcon sx={{ color: 'red' }} />
						<p>{dataIncomeAndExpense.expense.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
					</div>
				</article>
			</div>
			<Chart chartType='BarChart' width='100%' height='150px' data={dataIncomeAndExpenseArray} options={options} />
		</section>
	);
};
