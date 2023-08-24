import { celebrate } from "celebrate";
import Joi from "joi";

export const validateRequestAddEmployee = celebrate({
  body: Joi.object({
    employeeName: Joi.string().max(25).required(),
    age: Joi.number().max(100).min(14).required(),
    email: Joi.string().email(),
    salaryAmount: Joi.number().min(10000),
    degreeDetails: Joi.array().items(Joi.string().max(50).required()),
  }),
});

export const validateRequestUpdateEmployee = celebrate({
  body: Joi.object({
    employeeName: Joi.string().max(25).not().empty(),
    age: Joi.number().max(100).min(14),
    email: Joi.string().email().not().empty(),
    salaryAmount: Joi.number().min(10000),
    degreeDetails: Joi.array().items(Joi.string().max(50).required()),
  }),
});
