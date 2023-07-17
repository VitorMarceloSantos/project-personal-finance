import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';

export type ObjectiveFormProps = {
	verifyActionObjective: ActionsType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
};
