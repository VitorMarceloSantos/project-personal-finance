import { CategorieType } from '../Types/Categories/CategorieType';
import {
	ObjectiveIcon,
	EducationIcon,
	FoodIcon,
	FunIcon,
	HealthIcon,
	HomeExpenseIcon,
	TransportIcon,
} from '../components/Categories/Icons/IconsCategories';

export const initialCategories: CategorieType[] = [
	{ id: 0, icon: { name: 'ObjectiveIcon', component: ObjectiveIcon }, name: 'Metas' },
	{ id: 1, icon: { name: 'FunIcon', component: FunIcon }, name: 'Lazer' },
	{ id: 2, icon: { name: 'HealthIcon', component: HealthIcon }, name: 'Saude' },
	{ id: 3, icon: { name: 'EducationIcon', component: EducationIcon }, name: 'Eduacacao' },
	{ id: 4, icon: { name: 'FoodIcon', component: FoodIcon }, name: 'Alimentacao' },
	{ id: 5, icon: { name: 'HomeExpenseIcon', component: HomeExpenseIcon }, name: 'Casa' },
	{ id: 6, icon: { name: 'TransportIcon', component: TransportIcon }, name: 'Transporte' },
];

export const initialCategoriesZero: CategorieType = {
	id: 0,
	icon: { name: '', component: undefined },
	name: '',
};
