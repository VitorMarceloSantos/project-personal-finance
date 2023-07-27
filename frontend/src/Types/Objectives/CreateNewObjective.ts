import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';

export type NewObjectivesProps = {
	stateFormDisplay: {
		formDisplay: boolean;
		setFormDisplay: Dispatch<SetStateAction<boolean>>;
	};
	stateObjectiveAction: {
		verifyActionObjective: ActionsType;
		setverifyActionObjective: Dispatch<SetStateAction<ActionsType>>;
	};
};
