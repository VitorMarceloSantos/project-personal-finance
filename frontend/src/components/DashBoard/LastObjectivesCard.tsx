import { useEffect } from 'react';
import { ObjectivesCardType } from '../../Types/DashBoard/ObjectivesCardType';

export const LastObjectivesCard = ({objective, index}:ObjectivesCardType) => {
  const listVariablesRoot = ['one', 'two', 'three', 'four', 'five']; //:root css
  const convertingToPercentage = !!objective.value && (objective.realized / objective.value) * 100;
	// Atualizando o valor do gráfico
	useEffect(() => {
		!!objective.realized &&
			document.documentElement.style.setProperty(
				`--progress-objective-realized-${listVariablesRoot[index]}`,
				convertingToPercentage.toString(),
			);
	});
	return (
		<>
			<p>{objective.name}</p>
      <p>Percentual: {!!convertingToPercentage ? convertingToPercentage.toFixed(1) : 0} %</p>
			<div className={`objective-card-chart chart-${listVariablesRoot[index]}`}></div>
		</>
	);
};
