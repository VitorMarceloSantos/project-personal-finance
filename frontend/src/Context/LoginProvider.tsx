import { useReducer } from 'react';
import { ChildrenType } from '../Types/ChildrenType';
import { ReducerActionType } from '../Types/Login/ReducerLoginType';
import { LoginType } from '../Types/Login/LoginType';
import { InitialStateLogin } from '../utils/InitialStateLogin';
import { LoginContext } from './LoginContext';

const reducer = (state: LoginType, action: ReducerActionType): LoginType => {
	const { type, payload } = action;
	switch (type) {
		case 'update':
			const updateState = { ...payload };
			return updateState;
		default:
			return state;
	}
};

export const LoginProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(reducer, InitialStateLogin);

	return <LoginContext.Provider value={{ state, dispatch }}>{children}</LoginContext.Provider>;
};
