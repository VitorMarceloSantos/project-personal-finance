import { createContext } from 'react';
import { ObjectivesValueType } from '../Types/Objectives/ReducerObjectivesType';
import { initialObjectives } from '../util/InitialStateObjectives';

export const ObjectiveContext = createContext<ObjectivesValueType>({
	state: { cards: [], formValues: initialObjectives },
	dispatch: () => [],
	handlerSetFormValues: () => [],
}); // default value
