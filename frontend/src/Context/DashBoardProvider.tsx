import { useReducer } from 'react';
import { ChildrenType } from '../Types/ChildrenType';
import { ReducerActionType } from '../Types/DashBoard/ReducerDashBoardType';
import { InitialStateDashBoard } from '../utils/InitialStateDashBoard';
import { DashBoardType } from '../Types/DashBoard/DashBoardType';
import { DashBoardContext } from './DashBoardContext';

const reducer = (state: DashBoardType, action: ReducerActionType): DashBoardType => {
	const { type, payload } = action;
	switch (type) {
		// 	case 'add':
		// 		const newIcon = { name: 'OthersIcon', component: OthersIcon };
		// 		payload.icon = newIcon; // Adicionando ícone default
		// 		const newState = [...state, payload];
		// 		UpdateValuesData<CategorieType>(CategoriesData, newState, 'localCategories');
		// 		return newState;
		// 	case 'update':
		// 		const udpdateId = payload.id;
		// 		const updateState = [...state];
		// 		const indexUpdate = state.findIndex(({ id }) => id === udpdateId);
		// 		updateState[indexUpdate].name = payload.name;
		// 		UpdateValuesData<CategorieType>(CategoriesData, updateState, 'localCategories');
		// 		return updateState;
		// 	case 'delete':
		// 		const deleteId = payload.id;
		// 		const deletedState = [...state];
		// 		const idDelete = state.findIndex(({ id }) => id === deleteId);
		// 		deletedState.splice(idDelete, 1);
		// 		UpdateValuesData<CategorieType>(CategoriesData, deletedState, 'localCategories');
		// 		return deletedState;
		default:
			return state;
	}
};

export const DashBoardProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(reducer, InitialStateDashBoard);

	return <DashBoardContext.Provider value={{ state, dispatch }}>{children}</DashBoardContext.Provider>;
};
