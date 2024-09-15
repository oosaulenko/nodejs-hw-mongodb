import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').default('personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().max(16),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
});