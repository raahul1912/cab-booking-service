import isIn from 'validator/lib/isIn';
import isInt from 'validator/lib/isInt';
import isJSON from 'validator/lib/isJSON';
import isLength from 'validator/lib/isLength';
import isNumeric from 'validator/lib/isNumeric';
import isURL from 'validator/lib/isURL';
import matches from 'validator/lib/matches';
// Custom Validators
import {
  customRegex,
  isAlphaNumeric,
  isArray,
  isBoolean,
  isDecimalNumber,
  isEmail,
  isEmpty,
  isNumber,
  isObject,
  isString,
  isValidString
} from './customValidations';

export {
  isJSON,
  isLength,
  isInt,
  matches,
  isNumeric,
  isIn,
  isURL,
  // Custom Validations
  isEmpty,
  isValidString,
  customRegex,
  isEmail,
  isArray,
  isDecimalNumber,
  isNumber,
  isBoolean,
  isAlphaNumeric,
  isString,
  isObject
};
