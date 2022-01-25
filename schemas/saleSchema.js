const Joi = require('joi');

// FONTE: https://medium.com/@itskumarkrishna/custom-error-message-using-joi-b9a713b23b8f

module.exports = Joi.object({
  productId: Joi.number().required().messages({
    'number.base': '"product_id" must be a number',
    'any.required': '"product_id" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'any.required': '"quantity" is required',
  }),
});