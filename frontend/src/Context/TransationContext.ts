import { createContext } from 'react';
import { TransationValueType } from '../Types/ReducerTransationType';
import { initialTransation } from '../util/InitialStateTransation';

export const TransationContext = createContext<TransationValueType>({
	state: { cards: [], formValues: initialTransation },
	dispatch: () => [],
	handlerSetFormValues: () => [],
}); // default value
