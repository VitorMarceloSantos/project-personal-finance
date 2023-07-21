import { Dispatch } from 'react';
import { ActionsType } from '../ActionsType';
import { CategorieType } from './CategorieType';

export type ReducerActionType = {
	type: ActionsType;
	payload: CategorieType;
};

export type CategoriesValueType = {
	state: {
		cards: CategorieType[];
		formValues: CategorieType[];
	};
	dispatch: Dispatch<ReducerActionType>;
	handlerSetFormValues: (updateValues: CategorieType) => void;
};
