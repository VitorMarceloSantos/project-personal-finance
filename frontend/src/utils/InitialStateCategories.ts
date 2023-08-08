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
import { ColorsIcons } from './ColorsIcons';

export const initialCategories: CategorieType[] = [
	{ id: 0, icon: { name: 'ObjectiveIcon', component: ObjectiveIcon }, name: 'Metas', color: ColorsIcons[0] },
	{ id: 1, icon: { name: 'FunIcon', component: FunIcon }, name: 'Lazer', color: ColorsIcons[1] },
	{ id: 2, icon: { name: 'HealthIcon', component: HealthIcon }, name: 'Saude', color: ColorsIcons[2] },
	{ id: 3, icon: { name: 'EducationIcon', component: EducationIcon }, name: 'Eduacacao', color: ColorsIcons[3] },
	{ id: 4, icon: { name: 'FoodIcon', component: FoodIcon }, name: 'Alimentacao', color: ColorsIcons[4] },
	{ id: 5, icon: { name: 'HomeExpenseIcon', component: HomeExpenseIcon }, name: 'Casa', color: ColorsIcons[5] },
	{ id: 6, icon: { name: 'TransportIcon', component: TransportIcon }, name: 'Transporte', color: ColorsIcons[6] },
];

export const initialCategoriesZero: CategorieType = {
	id: 0,
	icon: { name: '', component: undefined },
	name: '',
	color: ColorsIcons[0],
};
