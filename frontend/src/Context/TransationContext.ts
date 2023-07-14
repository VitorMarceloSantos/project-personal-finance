import { createContext } from 'react';
import { TransationValueType } from '../Types/ReducerTransationType';

export const TransationContext = createContext<TransationValueType>({ state: [], dispatch: () => [] }); // default value
