import Joi from 'joi';

const messageError = {
	'string.min': 'Minímo de 3 caracteres',
	'string.max': 'Máximo de 10 caracteres',
	'string.empty': ' Campo obrigatório',
};

const messageErrorPassword = {
	...messageError,
	'string.pattern': 'A senha deve conter letras minúscula, maiúscula e número.',
};

const name = Joi.string().min(3).max(10).required().messages(messageError);
const password = Joi.string()
	.min(4)
	.pattern(new RegExp('^[a-zA-Z0-9]{3,10}$'))
	.required()
	.messages(messageErrorPassword);

export const createFormSchemaLogin = Joi.object({
	name,
	password,
}).required();
