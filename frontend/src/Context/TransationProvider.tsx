import { useReducer, useState } from 'react';
import { ChildrenType } from '../Types/ChildrenType';
import { TransationContext } from './TransationContext';
import { TransationType } from '../Types/TransationsType';
import { ReducerActionType } from '../Types/ReducerTransationType';
import { TransationsData } from '../data/TransationsData';
import { initialTransation } from '../util/InitialStateTransation';

const reducer = (state: TransationType[], action: ReducerActionType): TransationType[] => {
	const { type, payload } = action;
	switch (type) {
		case 'add':
			const newState = [...state, payload];
			return newState;
		case 'update':
		// const { currentValues, valuesDepreciated } = payload;
		// const updateState = [...state];
		// const indexUpdate = state.findIndex(({ description }) => description === payload?.description);
		// updateState[indexUpdate] = currentValues;
		// return updateState;
		case 'delete':
			const deleteId = payload.id;
			const deletedState = [...state];
			const idDelete = state.findIndex(({ id }) => id === deleteId);
			deletedState.splice(idDelete, 1);
			return deletedState;
		default:
			return state;
	}
};

export const TransationProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(reducer, TransationsData); // o estado inicial é um array vazio
	const [stateForm, setStateForm] = useState<TransationType>(initialTransation);

	const handlerSetFormValues = (updateValues: TransationType) => {
		setStateForm(updateValues);
	};
	return (
		<TransationContext.Provider value={{ state: { cards: state, formValues: stateForm },dispatch, handlerSetFormValues }}>
			{children}
		</TransationContext.Provider>
	);
};
