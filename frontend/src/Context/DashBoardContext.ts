import { createContext } from 'react';
import { DashBoardValueType } from '../Types/DashBoard/ReducerDashBoardType';

export const DashBoardContext = createContext<DashBoardValueType>({
	state: {transations: [], categories: [], objectives: []},
	dispatch: () => [],
}); // default value
