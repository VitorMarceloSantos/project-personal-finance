import { Dispatch } from 'react';
import { ObjectiveType } from './ObjectivesType';
import { ActionsType } from '../ActionsType';

export type ReducerActionType = {
	type: ActionsType;
	payload: ObjectiveType;
};

export type ObjectivesValueType = {
	state: {
		cards: ObjectiveType[];
		formValues: ObjectiveType;
	};
	dispatch: Dispatch<ReducerActionType>;
	handlerSetFormValues: (updateValues: ObjectiveType) => void;
};
