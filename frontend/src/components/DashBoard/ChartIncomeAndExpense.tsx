import { TransationsData } from '../../data/TransationsData';
import { Chart } from 'react-google-charts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const ChartIncomeAndExpense = () => {
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
	};
	return (
		<>
			<h1>Receita e Despesa</h1>
			<>
				<CurrencyExchangeIcon sx={{ color: 'green' }} />
				<p>{dataIncomeAndExpense.income.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			</>
			<>
				<CurrencyExchangeIcon sx={{ color: 'red' }} />
				<p>{dataIncomeAndExpense.expense.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			</>
			<Chart chartType='BarChart' width='100%' height='150px' data={dataIncomeAndExpenseArray} options={options} />
		</>
	);
};
