export function UpdateValuesData<T>(data: T[], state: T[]): void {
	data.splice(0, data.length); // zerando o array(não correr o risco de lixo na memória)
	data.push(...state);
}
