import { createContext } from 'react';
import { CategoriesValueType } from '../Types/Categories/ReducerCategoriesType';
import { initialCategoriesZero } from '../utils/InitialStateCategories';

export const CategoriesContext = createContext<CategoriesValueType>({
	state: { cards: [], formValues: initialCategoriesZero },
	dispatch: () => [],
	handlerSetFormValues: () => [],
}); // default value
