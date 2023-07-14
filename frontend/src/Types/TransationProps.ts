import { Dispatch, SetStateAction } from 'react';
import { TransationType } from './TransationsType';

export type TransationProps = {
	transation: TransationType;
};

export type TransationsFilteredProps = {
	stateTransations: {
		transationsFiltered: TransationType[];
		setTransationsFiltered: Dispatch<SetStateAction<TransationType[]>>;
	};
};
