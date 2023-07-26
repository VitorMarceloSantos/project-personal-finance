import { Dispatch } from 'react';
import { ActionsType } from '../ActionsType';
import { LoginType } from './LoginType';

export type ReducerActionType = {
	type: ActionsType;
	payload: LoginType;
};

export type LoginValueType = {
	state: LoginType
	dispatch: Dispatch<ReducerActionType>;
};
