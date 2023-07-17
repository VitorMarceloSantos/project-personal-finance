import { Dispatch } from 'react';
import { ActionsType } from '../ActionsType';
import { TransationType } from './TransationsType';

export type ReducerActionType = {
	type: ActionsType;
	payload: TransationType;
};

export type TransationValueType = {
	state: {
		cards: TransationType[];
		formValues: TransationType;
	};
	dispatch: Dispatch<ReducerActionType>;
	handlerSetFormValues: (updateValues: TransationType) => void;
};
