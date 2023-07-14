import Joi from 'joi';

const messageError = {
	'string.min': 'Minímo de 3 caracteres',
	'string.max': 'Máximo de 20 caracteres',
	'string.empty': ' Campo obrigatório',
};

// https://onestepcode.com/joi-js-custom-error-messages/
const value = Joi.number().greater(0).required().messages({
	'any.required': 'Campo obrigatório',
	'number.base': 'O valor deve ser um número',
	'number.greater': 'O valor deve ser maior que 0',
	'number.empty': 'Campo obrigatório',
});
const category = Joi.string().min(3).max(20).required().messages(messageError);
const description = Joi.string().min(3).max(20).required().messages(messageError);
const destination = Joi.string().min(3).max(20).required().messages(messageError);
const type = Joi.string().min(3).max(20).required().messages(messageError);

export const createFormSchema = Joi.object({
	value,
	category,
	description,
	destination,
	type,
}).required();
