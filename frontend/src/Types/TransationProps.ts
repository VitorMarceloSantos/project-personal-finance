import { Dispatch, SetStateAction } from 'react';
import { TransationType } from './TransationsType';
import { TransationActionType } from './TransationActionType';

export type TransationProps = {
	transation: TransationType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setverifyActionTransation: Dispatch<SetStateAction<TransationActionType>>;
};

export type TransationsFilteredProps = {
	stateTransations: {
		transationsFiltered: TransationType[];
		setTransationsFiltered: Dispatch<SetStateAction<TransationType[]>>;
	};
};

export type TransationsFilteredStateProps = {
	transationsFiltered: TransationType[];
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setverifyActionTransation: Dispatch<SetStateAction<TransationActionType>>;
};
