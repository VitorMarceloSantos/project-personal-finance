import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';

export type NewCategorieProps = {
	stateFormDisplay: {
		formDisplay: boolean;
		setFormDisplay: Dispatch<SetStateAction<boolean>>;
	};
	stateCategoriesAction: {
		verifyActionCategories: ActionsType;
		setVerifyActionCategories: Dispatch<SetStateAction<ActionsType>>;
	};
};
