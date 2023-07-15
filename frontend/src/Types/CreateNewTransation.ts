import { Dispatch, SetStateAction } from 'react';
import { TransationActionType } from './TransationActionType';

export type NewTransationProps = {
	stateFormDisplay: {
		formDisplay: boolean;
		setFormDisplay: Dispatch<SetStateAction<boolean>>;
	};
	stateTransationAction: {
		verifyActionTransation: TransationActionType;
		setverifyActionTransation: Dispatch<SetStateAction<TransationActionType>>;
	};
};
