import { Dispatch } from 'react';
import { ActionsType } from '../ActionsType';
import { DashBoardType } from './DashBoardType';

export type ReducerActionType = {
	type: ActionsType;
	payload: DashBoardType;
};

export type DashBoardValueType = {
	state: DashBoardType
	dispatch: Dispatch<ReducerActionType>;
};
