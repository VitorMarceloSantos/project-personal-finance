import { ActionsType } from '../../Types/ActionsType';
import { useContext, useEffect } from 'react';
import { ObjectiveProps } from '../../Types/Objectives/ObjectivesProps';
import { ObjectiveContext } from '../../Context/ObjectiveContext';
import { ThemeContext } from '../../Context/ThemeContext';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

export const ObjectiveCard = ({ objective, setverifyActionObjective, setFormDisplay, index }: ObjectiveProps) => {
	const { dispatch, handlerSetFormValues } = useContext(ObjectiveContext);
	const convertingToPercentage = !!objective.value && (objective.realized / objective.value) * 100;
	const { state } = useContext(ThemeContext);
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
	});

	return (
		<article className={`${state}-theme-objectives-card`}>
			<div className={`${state}-theme-objectives-card-id-name`}>
				<p className={`${state}-theme-objectives-card-id`}>#00{objective.id + 1}</p>
				<p className={`${state}-theme-objectives-card-name`}>{objective.name}</p>
			</div>
			{/* Verficando objective.value não é undefined */}
			<p className={`${state}-theme-objectives-card-value class-equal-card card-space`}>
				{objective.value && objective.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
			</p>
			<p className={`${state}-theme-objectives-card-realized class-equal-card card-space`}>
				Realizado: {objective.realized.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
			</p>
			<p className={`${state}-theme-objectives-card-description class-equal-card card-space`}>
				{objective.description}
			</p>
			{/* https://www.treinaweb.com.br/blog/barra-de-progresso-que-muda-de-tamanho-e-cor-com-apenas-uma-variavel-do-css */}
			<div className={`${state}-theme-objectives-card-percentage-chart class-equal-card`}>
				<p className={`${state}-theme-objectives-card-percentage`}>
					{!!convertingToPercentage ? convertingToPercentage.toFixed(1) : 0} %
				</p>
				<div
					className={`${state}-theme-objectives-card-chart objective-card-chart chart-${listVariablesRoot[index]}`}
				></div>
			</div>
			<div className={`${state}-theme-objectives-card-buttons`}>
				<IconButton sx={{ ':hover': { color: state === 'dark' ? '#1F2941' : '#fff' } }}>
					<SettingsIcon onClick={() => handlerFormValues()} />
				</IconButton>
				<IconButton>
					<DeleteIcon
						sx={{ ':hover': { color: state === 'dark' ? '#1F2941' : '#fff' } }}
						onClick={() => dispatch({ type: ActionsType.DELETE, payload: objective })}
					/>
				</IconButton>
			</div>
		</article>
	);
};
