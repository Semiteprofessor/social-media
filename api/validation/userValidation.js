const Joi = require("joi");

const validateUser = (data) => {
  const userSchema = Joi.object({
    surname: Joi.string().required(),
    othernames: Joi.string().required(),
    email: Joi.string().required(),
    occupation: Joi.string().required(),
    about_me: Joi.string().required(),
  });

  return userSchema.validate(data);
};

module.exports = validateUser;
