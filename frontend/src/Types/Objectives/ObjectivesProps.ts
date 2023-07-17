import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';
import { ObjectiveType } from './ObjectivesType';

export type ObjectiveProps = {
	objective: ObjectiveType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setverifyActionObjective: Dispatch<SetStateAction<ActionsType>>;
};

export type ObjectivesFilteredProps = {
	stateObjectives: {
		objectivesFiltered: ObjectiveType[];
		setObjectivesFiltered: Dispatch<SetStateAction<ObjectiveType[]>>;
	};
};

export type ObjectivesFilteredStateProps = {
	objectivesFiltered: ObjectiveType[];
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setverifyActionObjective: Dispatch<SetStateAction<ActionsType>>;
};
