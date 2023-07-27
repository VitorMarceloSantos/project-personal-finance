import { TransationsData } from '../../data/TransationsData';
import Chart from 'react-google-charts';

export const ChartDistribution = () => {
	const options = {
		title: '',
		is3D: true,
	};
	type ListTransationsType = {
		name: string;
		value: number;
	};
	const listTransations: ListTransationsType[] = [];
	if (TransationsData.length !== 0) {
		for (let i = 0; i < TransationsData.length; i += 1) {
			const index = listTransations.findIndex((transation) => transation.name === TransationsData[i].category);
			if (index === -1) {
				listTransations.push({ name: TransationsData[i].category, value: TransationsData[i].value as number });
			} else {
				const updateList = [...listTransations];
				updateList[index] = {
					name: TransationsData[i].category,
					value: ((TransationsData[i].value as number) + updateList[index].value) as number,
				};
				listTransations.splice(0, listTransations.length); // zerando o array
				listTransations.push(...updateList);
			}
		}
	}

	const dataCharts: [string, string | number][] = [['Categoria', 'Valor Total']];
	listTransations.forEach((transation) => dataCharts.push([transation.name, transation.value]));

	return (
		<>
			<Chart chartType='PieChart' data={dataCharts} options={options} width={'100%'} height={'400px'} />
		</>
	);
};
