import { ObjectiveType } from '../Types/Objectives/ObjectivesType';
import { ChildrenType } from '../Types/ChildrenType';
import { ReducerActionType } from '../Types/Objectives/ReducerObjectivesType';
import { useReducer, useState } from 'react';
import { ObjectivesData } from './../data/ObjectivesData';
import { initialObjectives } from '../utils/InitialStateObjectives';
import { ObjectiveContext } from './ObjectiveContext';
import { UpdateValuesData } from '../utils/UpdateValuesData';
import { UpdateValuesChartRoot } from '../utils/UpdateValuesChartRoot';

const reducer = (state: ObjectiveType[], action: ReducerActionType): ObjectiveType[] => {
	const { type, payload } = action;
	switch (type) {
		case 'add':
			payload.realized = 0;
			const newState = [...state, payload];
			UpdateValuesData<ObjectiveType>(ObjectivesData, newState, 'localObjectives');
			return newState;
		case 'update':
			const udpdateId = payload.id;
			const updateState = [...state];
			const indexUpdate = state.findIndex(({ id }) => id === udpdateId);
			updateState[indexUpdate] = payload;
			UpdateValuesData<ObjectiveType>(ObjectivesData, updateState, 'localObjectives');
			return updateState;
		case 'delete':
			const deleteId = payload.id;
			const deletedState = [...state];
			const idDelete = state.findIndex(({ id }) => id === deleteId);
			deletedState.splice(idDelete, 1);
			UpdateValuesData<ObjectiveType>(ObjectivesData, deletedState, 'localObjectives');
			UpdateValuesChartRoot();
			return deletedState;
		default:
			return state;
	}
};

export const ObjectiveProvider = ({ children }: ChildrenType) => {
	const verifyValueObjectivesData: ObjectiveType[] = ObjectivesData.length !== 0 ? [...ObjectivesData] : [];
	const [state, dispatch] = useReducer(reducer, verifyValueObjectivesData);
	const [stateForm, setStateForm] = useState<ObjectiveType>(initialObjectives);

	const handlerSetFormValues = (updateValues: ObjectiveType) => {
		setStateForm(updateValues);
	};
	return (
		<ObjectiveContext.Provider
			value={{ state: { cards: state, formValues: stateForm }, dispatch, handlerSetFormValues }}
		>
			{children}
		</ObjectiveContext.Provider>
	);
};
