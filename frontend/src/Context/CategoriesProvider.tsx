import { useReducer, useState } from 'react';
import { CategorieType } from '../Types/Categories/CategorieType';
import { ChildrenType } from '../Types/ChildrenType';
import { CategoriesData } from '../data/CategoriesData';
import { initialCategories } from '../utils/InitialStateCategories';
import { CategoriesContext } from './CategoriesContex';
import { ReducerActionType } from '../Types/Categories/ReducerCategoriesType';

const reducer = (state: CategorieType[], action: ReducerActionType): CategorieType[] => {
	const { type, payload } = action;
	switch (type) {
		// case 'add':
		// 	const newState = [...state, payload];
		// 	UpdateValuesData<CategorieType>(CategoriesData, newState, 'localObjectives');
		// 	return newState;
		// case 'update':
		// 	const udpdateId = payload.id;
		// 	const updateState = [...state];
		// 	const indexUpdate = state.findIndex(({ name }) => name === udpdateId);
		// 	updateState[indexUpdate] = payload;
		// 	UpdateValuesData<CategorieType>(ObjectivesData, updateState, 'localObjectives');
		// 	return updateState;
		// case 'delete':
		// 	const deleteId = payload.id;
		// 	const deletedState = [...state];
		// 	const idDelete = state.findIndex(({ id }) => id === deleteId);
		// 	deletedState.splice(idDelete, 1);
		// 	UpdateValuesData<ObjectiveType>(ObjectivesData, deletedState, 'localObjectives');
		// 	updateValuesChartRoot();
		// 	return deletedState;
		default:
			return state;
	}
};

export const CategoriesProvider = ({ children }: ChildrenType) => {
	const verifyValueCategoriesData: CategorieType[] =
		CategoriesData.length !== 0 ? [...CategoriesData] : initialCategories;
	const [state, dispatch] = useReducer(reducer, verifyValueCategoriesData);
	const [stateForm, setStateForm] = useState<CategorieType[]>(initialCategories);

	const handlerSetFormValues = (updateValues: CategorieType) => {
		setStateForm((prev) => [...prev, updateValues]);
	};
	return (
		<CategoriesContext.Provider
			value={{ state: { cards: state, formValues: stateForm }, dispatch, handlerSetFormValues }}
		>
			{children}
		</CategoriesContext.Provider>
	);
};
