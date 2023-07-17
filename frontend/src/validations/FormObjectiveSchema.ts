import Joi from 'joi';

const messageError = {
	'string.min': 'Minímo de 3 caracteres',
	'string.max': 'Máximo de 50 caracteres',
	'string.empty': ' Campo obrigatório',
};

// https://onestepcode.com/joi-js-custom-error-messages/
const value = Joi.number().greater(0).required().messages({
	'any.required': 'Campo obrigatório',
	'number.base': 'O valor deve ser um número',
	'number.greater': 'O valor deve ser maior que 0',
	'number.empty': 'Campo obrigatório',
});
const name = Joi.string().min(3).max(50).required().messages(messageError);
const description = Joi.string().min(3).max(50).required().messages(messageError);

export const createFormSchemaObjective = Joi.object({
	value,
	name,
	description,
}).required();
