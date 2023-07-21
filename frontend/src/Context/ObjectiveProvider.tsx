import { ObjectiveType } from '../Types/Objectives/ObjectivesType';
import { ChildrenType } from '../Types/ChildrenType';
import { ReducerActionType } from '../Types/Objectives/ReducerObjectivesType';
import { useReducer, useState } from 'react';
import { ObjectivesData } from './../data/ObjectivesData';
import { initialObjectives } from '../utils/InitialStateObjectives';
import { ObjectiveContext } from './ObjectiveContext';
import { UpdateValuesData } from '../utils/UpdateValuesData';

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
			updateValuesChartRoot();
			return deletedState;
		default:
			return state;
	}
};

const updateValuesChartRoot = () => {
	const listVariablesRoot = ['one', 'two', 'three', 'four', 'five']; //:root css
	if (ObjectivesData.length !== 0) {
		console.log('entrou aqui');
		for (let index = 0; index < ObjectivesData.length; index += 1) {
			document.documentElement.style.setProperty(
				`--progress-objective-realized-${listVariablesRoot[index]}`,
				ObjectivesData[index].realized.toString(),
			);
		}
	} else {
		document.documentElement.style.setProperty(`--progress-objective-realized-one`, '0');
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
