import { useReducer, useState } from 'react';
import { CategorieType } from '../Types/Categories/CategorieType';
import { ChildrenType } from '../Types/ChildrenType';
import { CategoriesData } from '../data/CategoriesData';
import { initialCategories, initialCategoriesZero } from '../utils/InitialStateCategories';
import { CategoriesContext } from './CategoriesContex';
import { ReducerActionType } from '../Types/Categories/ReducerCategoriesType';
import { UpdateValuesData } from '../utils/UpdateValuesData';
import { OthersIcon } from '../components/Categories/Icons/IconsCategories';

const reducer = (state: CategorieType[], action: ReducerActionType): CategorieType[] => {
	const { type, payload } = action;
	switch (type) {
		case 'add':
			const newIcon = { name: 'OthersIcon', component: OthersIcon };
			payload.icon = newIcon; // Adicionando ícone default
			const newState = [...state, payload];
			UpdateValuesData<CategorieType>(CategoriesData, newState, 'localCategories');
			return newState;
		case 'update':
			const udpdateId = payload.id;
			const updateState = [...state];
			const indexUpdate = state.findIndex(({ id }) => id === udpdateId);
			updateState[indexUpdate].name = payload.name;
			UpdateValuesData<CategorieType>(CategoriesData, updateState, 'localCategories');
			return updateState;
		case 'delete':
			const deleteId = payload.id;
			const deletedState = [...state];
			const idDelete = state.findIndex(({ id }) => id === deleteId);
			deletedState.splice(idDelete, 1);
			UpdateValuesData<CategorieType>(CategoriesData, deletedState, 'localCategories');
			return deletedState;
		default:
			return state;
	}
};

export const CategoriesProvider = ({ children }: ChildrenType) => {
	const verifyValueCategoriesData: CategorieType[] =
		CategoriesData.length !== 0 ? [...CategoriesData] : initialCategories;
	const [state, dispatch] = useReducer(reducer, verifyValueCategoriesData);
	const [stateForm, setStateForm] = useState<CategorieType>(initialCategoriesZero);

	const handlerSetFormValues = (updateValues: CategorieType) => {
		setStateForm(updateValues);
	};
	return (
		<CategoriesContext.Provider
			value={{ state: { cards: state, formValues: stateForm }, dispatch, handlerSetFormValues }}
		>
			{children}
		</CategoriesContext.Provider>
	);
};
