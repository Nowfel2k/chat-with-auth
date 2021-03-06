import Joi, { ObjectSchema, StringSchema, ValidationResult } from 'joi';
import User from '../models/User';

// todo: check issue with the repeat password error message

export const registerValidation = (data: User): ValidationResult => {
  const schema: ObjectSchema = Joi.object({
    firstName: Joi.string().alphanum().required().label('First Name'),
    lastName: Joi.string().alphanum().required().label('Last Name'),
    email: Joi.string().required().email().label('Email address'),
    password: Joi.string().required().strict().min(6).label('Password'),
    repeatPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .strict()
      .label('Repeat Password'),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  });
};

export const loginValidation = (data: User): ValidationResult => {
  const schema: ObjectSchema = Joi.object({
    email: Joi.string().required().email().label('Email address'),
    password: Joi.string().required().label('Password'),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  });
};

export const addFriendValidation = (
  requesterFriendTag: string,
  recipientFriendTag: string | null
): ValidationResult => {
  const schema: StringSchema = Joi.string()
    .required()
    .length(10)
    .invalid(requesterFriendTag ? requesterFriendTag : null)
    .label('Friend Tag');
  return schema.validate(recipientFriendTag, {
    errors: {
      wrap: {
        label: false,
      },
    },
  });
};
