import { TransationType } from '../Types/Transations/TransationsType';

// value foi definida como undefined para que o conteúdo do placeholder possa aparecer, caso contrário o conteúdo do campo seria 0
export const initialTransation: TransationType = {
	id: 0,
	value: undefined,
	category: 'Categoria',
	description: '',
	destination: 'Destinação',
	type: '',
};
