import { Dispatch, SetStateAction } from 'react';
import { ActionsType } from '../ActionsType';
import { CategorieType } from './CategorieType';

export type CategoriesProps = {
	categorie: CategorieType;
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setVerifyActionCategories: Dispatch<SetStateAction<ActionsType>>;
	index: number;
};

export type CategoriesFilteredProps = {
	stateCategories: {
		categoriesFiltered: CategorieType[];
		setCategoriesFiltered: Dispatch<SetStateAction<CategorieType[]>>;
	};
};

export type CategoriesFilteredStateProps = {
	categoriesFiltered: CategorieType[];
	setFormDisplay: Dispatch<SetStateAction<boolean>>;
	setVerifyActionCategories: Dispatch<SetStateAction<ActionsType>>;
};
