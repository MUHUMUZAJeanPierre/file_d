import Joi from 'joi';
import { register } from 'module';

const fileValidationSchema = Joi.object({
    fileName: Joi.string()
      .required()
      .messages({
        'string.base': `"fileName" should be a type of 'text'`,
        'string.empty': `"fileName" cannot be an empty field`,
        'any.required': `"fileName" is required`,
      }),
  
    filePath: Joi.string()
      .required()
      .messages({
        'string.base': `"filePath" should be a type of 'text'`,
        'string.empty': `"filePath" cannot be an empty field`,
        'any.required': `"filePath" is a required field`,
      }),
  
    createdAt: Joi.date().default(Date.now).messages({
      'date.base': `"createdAt" should be a valid date`,
    }),
  });
  

const options = {
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: true 
};

export const validateFile = (fileData) => {
    const result = fileValidationSchema.validate(fileData, options);
    if (result.error) {
        throw new Error(result.error.details.map((err) => err.message).join(", "));
    }
    return result.value; 
};


