import { createContext } from 'react';
import { TransationValueType } from '../Types/Transations/ReducerTransationType';
import { initialTransation } from '../utils/InitialStateTransation';

export const TransationContext = createContext<TransationValueType>({
	state: { cards: [], formValues: initialTransation },
	dispatch: () => [],
	handlerSetFormValues: () => [],
}); // default value
