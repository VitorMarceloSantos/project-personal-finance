import { createContext } from 'react';
import { CategoriesValueType } from '../Types/Categories/ReducerCategoriesType';
import { initialCategories } from '../utils/InitialStateCategories';

export const CategoriesContext = createContext<CategoriesValueType>({
	state: { cards: [], formValues: initialCategories },
	dispatch: () => [],
	handlerSetFormValues: () => [],
}); // default value
