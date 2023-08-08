import { useContext, useMemo } from 'react';
import { ObjectiveContext } from '../../Context/ObjectiveContext';
import { ObjectiveCard } from './ObjectiveCard';
import { ObjectivesFilteredStateProps } from '../../Types/Objectives/ObjectivesProps';
import { ThemeContext } from '../../Context/ThemeContext';

export const ObjectiveListCards = ({
	objectivesFiltered,
	setFormDisplay,
	setverifyActionObjective,
}: ObjectivesFilteredStateProps) => {
	const { state } = useContext(ThemeContext);
	const {
		state: { cards },
	} = useContext(ObjectiveContext);
	const verifyObjectivesFiltered = objectivesFiltered.length > 0 ? objectivesFiltered : cards;
	const memoCards = useMemo(
		() =>
			verifyObjectivesFiltered.map((objective, index) => (
				<li key={index}>
					<ObjectiveCard
						objective={objective}
						setFormDisplay={setFormDisplay}
						setverifyActionObjective={setverifyActionObjective}
						index={index}
					/>
				</li>
			)),
		[verifyObjectivesFiltered],
	);
	return (
		<>
			{verifyObjectivesFiltered.length !== 0 ? (
				memoCards
			) : (
				<h1 style={{ fontWeight: 'bold', margin: '1rem', color: state === 'dark' ? '#B0BEC5' : '#000' }}>
					Não há metas cadastradas.
				</h1>
			)}
		</>
	);
};
