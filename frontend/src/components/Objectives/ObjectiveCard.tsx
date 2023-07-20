import { ActionsType } from '../../Types/ActionsType';
import { useContext, useEffect } from 'react';
import { ObjectiveProps } from '../../Types/Objectives/ObjectivesProps';
import { ObjectiveContext } from '../../Context/ObjectiveContext';

export const ObjectiveCard = ({ objective, setverifyActionObjective, setFormDisplay, index }: ObjectiveProps) => {
	const { dispatch, handlerSetFormValues } = useContext(ObjectiveContext);
	const convertingToPercentage = !!objective.value && (objective.realized / objective.value) * 100;
	const handlerFormValues = () => {
		handlerSetFormValues(objective); // adicionando valores a serem atualizados
		setverifyActionObjective(ActionsType.UPDATE);
		setFormDisplay(true);
	};
	const listVariablesRoot = ['one', 'two', 'three', 'four', 'five']; //:root css

	// Atualizando o valor do gráfico
	useEffect(() => {
		!!objective.realized &&
			document.documentElement.style.setProperty(
				`--progress-objective-realized-${listVariablesRoot[index]}`,
				convertingToPercentage.toString(),
			);
	}, []);

	return (
		<div className='objective-card'>
			<p>#{objective.id}</p>
			<p>{objective.name}</p>
			<p>{objective.description}</p>
			{/* Verficando objective.value não é undefined */}
			<p>{objective.value && objective.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			<p>Realizado:{objective.realized.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
			{/* https://www.treinaweb.com.br/blog/barra-de-progresso-que-muda-de-tamanho-e-cor-com-apenas-uma-variavel-do-css */}
			<p>Percentual: {convertingToPercentage} %</p>
			<div className={`objective-card-chart chart-${listVariablesRoot[index]}`}></div>
			<button onClick={() => handlerFormValues()}>Editar</button>
			<button onClick={() => dispatch({ type: ActionsType.DELETE, payload: objective })}>Apagar</button>
		</div>
	);
};
