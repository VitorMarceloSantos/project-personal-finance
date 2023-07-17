import { Dispatch, SetStateAction } from 'react';
import { TransationType } from './TransationsType';
import { ActionsType } from '../ActionsType';

export type TransationProps = {
	transation: TransationType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setverifyActionTransation: Dispatch<SetStateAction<ActionsType>>;
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
	setverifyActionTransation: Dispatch<SetStateAction<ActionsType>>;
};
