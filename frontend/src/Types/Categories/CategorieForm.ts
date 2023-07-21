import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';

export type CategorieFormProps = {
	verifyActionCategories: ActionsType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
};
