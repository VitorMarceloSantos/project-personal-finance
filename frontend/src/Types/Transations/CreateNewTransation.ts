import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';

export type NewTransationProps = {
	stateFormDisplay: {
		formDisplay: boolean;
		setFormDisplay: Dispatch<SetStateAction<boolean>>;
	};
	stateTransationAction: {
		verifyActionTransation: ActionsType;
		setverifyActionTransation: Dispatch<SetStateAction<ActionsType>>;
	};
};
