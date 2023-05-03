const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamp: true }
);

contactSchema.post("save", handleMongooseError);

const dataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  return schema.validate(data);
};
const favoriteValidator = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  return schema.validate(data);
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, dataValidator, favoriteValidator };