// Sempre que houver alguma action, o valor da variável TransationsData e o localStorage serão atualizados
export function UpdateValuesData<T>(data: T[], state: T[], local:string): void {
	data.splice(0, data.length); // zerando o array
	data.push(...state);
	localStorage.setItem(local, JSON.stringify(state));
}
