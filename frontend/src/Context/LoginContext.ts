import { createContext } from 'react';
import { LoginValueType } from '../Types/Login/ReducerLoginType';

export const LoginContext = createContext<LoginValueType>({
	state: {isConnected: false},
	dispatch: () => [],
}); // default value
