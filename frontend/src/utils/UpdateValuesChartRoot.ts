import { ObjectivesData } from '../data/ObjectivesData';

export const UpdateValuesChartRoot = () => {
	const listVariablesRoot = ['one', 'two', 'three', 'four', 'five']; //:root css
	if (ObjectivesData.length !== 0) {
		for (let index = 0; index < ObjectivesData.length; index += 1) {
			document.documentElement.style.setProperty(
				`--progress-objective-realized-${listVariablesRoot[index]}`,
				ObjectivesData[index].realized.toString(),
			);
		}
	} else {
		document.documentElement.style.setProperty(`--progress-objective-realized-one`, '0');
	}
};
