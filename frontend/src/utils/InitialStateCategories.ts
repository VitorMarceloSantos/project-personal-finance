import { CategorieType } from '../Types/Categories/CategorieType';
import {
	ObjectiveIcon,
	EducationIcon,
	FoodIcon,
	FunIcon,
	HealthIcon,
	HomeExpenseIcon,
	OthersIcon,
	TransportIcon,
} from '../components/Categories/Icons/IconsCategories';

export const initialCategories: CategorieType[] = [
	{ id: 0, icon: ObjectiveIcon, name: 'Metas' },
	{ id: 1, icon: FunIcon, name: 'Lazer' },
	{ id: 2, icon: HealthIcon, name: 'Saude' },
	{ id: 3, icon: EducationIcon, name: 'Eduacacao' },
	{ id: 4, icon: FoodIcon, name: 'Alimentacao' },
	{ id: 5, icon: HomeExpenseIcon, name: 'Casa' },
	{ id: 5, icon: TransportIcon, name: 'Transporte' },
	{ id: 6, icon: OthersIcon, name: 'Outras' },
];
