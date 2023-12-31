import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';

export type TransationFormProps = {
	verifyActionTransation: ActionsType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
};
