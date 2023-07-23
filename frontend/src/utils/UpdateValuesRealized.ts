import { ObjectiveType } from '../Types/Objectives/ObjectivesType';
import { TransationType } from '../Types/Transations/TransationsType';
import { ObjectivesData } from '../data/ObjectivesData';
import { UpdateValuesChartRoot } from './UpdateValuesChartRoot';
import { UpdateValuesData } from './UpdateValuesData';

// Atualizando realized quando uma transação é deletada
export const updateValuesRealized = (payload: TransationType) => {
	const indexObjective = ObjectivesData.findIndex(({ name }) => name === payload.destination);
	const objectivesDataUpdate = [...ObjectivesData];
	const objectiveSelect: ObjectiveType | undefined = ObjectivesData[indexObjective];
	let minusValue = 0;
	if (!!payload.value) {
		minusValue = objectiveSelect.realized - payload.value;
	}
	objectivesDataUpdate[indexObjective].realized = minusValue;
	UpdateValuesData<ObjectiveType>(ObjectivesData, objectivesDataUpdate, 'localObjectives');
	UpdateValuesChartRoot();
};
