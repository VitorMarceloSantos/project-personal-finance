import { useReducer } from 'react';
import { ChildrenType } from '../Types/ChildrenType';
import { TransationContext } from './TransationContext';
import { TransationType } from '../Types/TransationsType';
import { ReducerActionType } from '../Types/ReducerTransationType';
import { TransationsData } from '../data/TransationsData';

const reducer = (state: TransationType[], action: ReducerActionType): TransationType[] => {
	const { type, payload } = action;
  console.log(payload)
	switch (type) {
		case 'add':
			console.log('Adicionado');
      return state;
		// 	const newValues = payload.currentValues;
		// 	const newState = [...state, newValues];
		// 	return newState;
		case 'update':
		// 	const { currentValues, valuesDepreciated } = payload;
		// 	const updateState = [...state];
		// 	const indexUpdate = state.findIndex(({ name }) => name === valuesDepreciated?.name);
		// 	updateState[indexUpdate] = currentValues;
		// 	return updateState;
		case 'delete':
      console.log('Deletado');
      return state;
		// 	const deleteValues = payload.currentValues;
		// 	const deletedState = [...state];
		// 	const indexDelete = state.findIndex(({ name }) => name === deleteValues.name);
		// 	deletedState.splice(indexDelete, 1);
		// 	return deletedState;
		default:
			return state;
	}
};

export const TransationProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(reducer, TransationsData); // o estado inicial é um array vazio

	return <TransationContext.Provider value={{ state, dispatch }}>{children}</TransationContext.Provider>;
};
