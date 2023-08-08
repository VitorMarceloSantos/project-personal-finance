import { useContext, useState } from 'react';
import { ObjectiveProvider } from '../Context/ObjectiveProvider';
import { ObjectiveListCards } from '../components/Objectives/ObjectiveListCards';
import { ObjectiveType } from '../Types/Objectives/ObjectivesType';
import { ActionsType } from '../Types/ActionsType';
import { ObjectiveFilter } from '../components/Objectives/ObjectiveFilter';
import { CreateNewObjective } from '../components/Objectives/CreateNewObjective';
import { ThemeContext } from '../Context/ThemeContext';

export const Objectives = () => {
	const [objectivesFiltered, setObjectivesFiltered] = useState<ObjectiveType[]>([]);
	const [formDisplay, setFormDisplay] = useState<boolean>(false);
	const [verifyActionObjective, setverifyActionObjective] = useState<ActionsType>(ActionsType.ADD);
	const { state } = useContext(ThemeContext);
	return (
		<ObjectiveProvider>
			<section className={`${state}-theme-objectives`}>
				<ObjectiveFilter stateObjectives={{ objectivesFiltered, setObjectivesFiltered }} />
				<CreateNewObjective
					stateFormDisplay={{ formDisplay, setFormDisplay }}
					stateObjectiveAction={{ setverifyActionObjective, verifyActionObjective }}
				/>
				<ul className={`${state}-theme-objectives-list`}>
					<ObjectiveListCards
						objectivesFiltered={objectivesFiltered}
						setFormDisplay={setFormDisplay}
						setverifyActionObjective={setverifyActionObjective}
					/>
				</ul>
			</section>
		</ObjectiveProvider>
	);
};
