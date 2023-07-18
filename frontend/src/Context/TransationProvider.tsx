import { useReducer, useState } from 'react';
import { ChildrenType } from '../Types/ChildrenType';
import { TransationContext } from './TransationContext';
import { TransationType } from '../Types/Transations/TransationsType';
import { ReducerActionType } from '../Types/Transations/ReducerTransationType';
import { TransationsData } from './../data/TransationsData';
import { initialTransation } from '../utils/InitialStateTransation';
import { UpdateValuesData } from '../utils/UpdateValuesData';

const reducer = (state: TransationType[], action: ReducerActionType): TransationType[] => {
	const { type, payload } = action;
	switch (type) {
		case 'add':
			const newState = [...state, payload];
			UpdateValuesData<TransationType>(TransationsData, newState, 'localTransations');
			return newState;
		case 'update':
			const udpdateId = payload.id;
			const updateState = [...state];
			const indexUpdate = state.findIndex(({ id }) => id === udpdateId);
			updateState[indexUpdate] = payload;
			UpdateValuesData<TransationType>(TransationsData, updateState, 'localTransations');
			return updateState;
		case 'delete':
			const deleteId = payload.id;
			const deletedState = [...state];
			const idDelete = state.findIndex(({ id }) => id === deleteId);
			deletedState.splice(idDelete, 1);
			UpdateValuesData<TransationType>(TransationsData, deletedState, 'localTransations');
			return deletedState;
		default:
			return state;
	}
};

export const TransationProvider = ({ children }: ChildrenType) => {
	const verifyValueTransationsData: TransationType[] = TransationsData.length !== 0 ? [...TransationsData] : [];
	const [state, dispatch] = useReducer(reducer, verifyValueTransationsData);
	const [stateForm, setStateForm] = useState<TransationType>(initialTransation);

	const handlerSetFormValues = (updateValues: TransationType) => {
		setStateForm(updateValues);
	};
	return (
		<TransationContext.Provider
			value={{ state: { cards: state, formValues: stateForm }, dispatch, handlerSetFormValues }}
		>
			{children}
		</TransationContext.Provider>
	);
};
