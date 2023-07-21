import Joi from 'joi';

const messageError = {
	'string.min': 'Minímo de 3 caracteres',
	'string.max': 'Máximo de 15 caracteres',
	'string.empty': ' Campo obrigatório',
};

const name = Joi.string().min(3).max(15).required().messages(messageError);

export const createFormSchemaCategorie = Joi.object({
	name,
}).required();
