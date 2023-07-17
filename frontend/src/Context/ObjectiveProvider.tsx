import { ObjectiveType } from '../Types/Objectives/ObjectivesType';
import { ChildrenType } from '../Types/ChildrenType';
import { ReducerActionType } from '../Types/Objectives/ReducerObjectivesType';
import { useEffect, useReducer, useState } from 'react';
import { ObjectivesData } from '../data/ObjectivesData';
import { initialObjectives } from '../util/InitialStateObjectives';
import { ObjectiveContext } from './ObjectiveContext';

const reducer = (state: ObjectiveType[], action: ReducerActionType): ObjectiveType[] => {
	const { type, payload } = action;
	switch (type) {
		case 'add':
		const newState = [...state, payload];
		return newState;
		case 'update':
		const udpdateId = payload.id;
		const updateState = [...state];
		const indexUpdate = state.findIndex(({ id }) => id === udpdateId);
		updateState[indexUpdate] = payload;
		return updateState;
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

export const ObjectiveProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(reducer, ObjectivesData);
	const [stateForm, setStateForm] = useState<ObjectiveType>(initialObjectives);

	useEffect(() => {
		localStorage.setItem('localObjectives', JSON.stringify(state));
	}, [state]);

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
