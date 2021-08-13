const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    gender: Joi.string().required(),
    password: Joi.string().required().min(6),
    password2: Joi.string().required().min(6),
  });

  return schema.validate(data);
};

module.exports = userValidation;
