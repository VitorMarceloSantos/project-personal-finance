import { CategorieType } from '../Categories/CategorieType';
import { ObjectiveType } from '../Objectives/ObjectivesType';
import { TransationType } from '../Transations/TransationsType';

export type DashBoardType = {
	transations: TransationType[];
	objectives: ObjectiveType[];
	categories: CategorieType[];
};
