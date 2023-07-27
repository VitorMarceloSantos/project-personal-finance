export const VerifyTrueOrFalseLocalStorage = () => {
	if (
		!!localStorage.getItem('localTransations') ||
		!!localStorage.getItem('localObjectives') ||
		!!localStorage.getItem('localCategories')
	) {
		return true;
	}
	return false;
};
