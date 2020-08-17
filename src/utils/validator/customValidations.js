"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.isAlphaNumeric = exports.isBoolean = exports.isNumber = exports.isDecimalNumber = exports.isString = exports.isValidDate = exports.isArray = exports.isEmail = exports.customRegex = exports.isValidString = exports.isEmpty = void 0;
const isJSON_1 = __importDefault(require("validator/lib/isJSON"));
/**
 * @description Check if constiable is undefined or not
 * @param {*} str
 */
exports.isEmpty = (value) => {
    if (value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * @description Check if String and doesn't contain space and special chracters
 * @param {String} str
 */
exports.isValidString = (str) => {
    const regExp = /^[a-zA-Z]+$/;
    if (typeof str !== 'string') {
        return false;
    }
    else if (!str.match(regExp)) {
        return false;
    }
    else {
        return true;
    }
};
/**
 * @description Custom RegEx
 * @param {String} str
 * @param {String} regEx
 */
exports.customRegex = (str, regEx) => {
    if (typeof str !== 'string') {
        return false;
    }
    else if (!regEx.test(str)) {
        return false;
    }
    else {
        return true;
    }
};
/**
 * @desc Checks for valid email
 * @param {String} value // Accepts string
 */
exports.isEmail = (value) => {
    const email = value;
    const myRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = myRegEx.test(email);
    if (isValid) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * @desc Checks for valid array
 * @param {*} value
 */
exports.isArray = (value) => {
    if (typeof value === 'string') {
        const replaced = value.replace(/'/g, '"');
        if (!isJSON_1.default(replaced)) {
            return false;
        }
        else {
            const parsed = JSON.parse(replaced);
            if (parsed.constructor === Array) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        if (value.constructor === Array) {
            return true;
        }
        else {
            return false;
        }
    }
};
/**
 * @description Is Valid Date
 * @param {*} d
 */
exports.isValidDate = (d) => {
    return d instanceof Date;
};
/**
 * @description Check if valid string
 * @param {String} value
 */
exports.isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};
/**
 * @desc Checks if given value is Decimal Number
 * @param {*} value // Accepts string
 */
exports.isDecimalNumber = (value) => {
    const number = value;
    const myRegEx = /^\d+(\.\d+)?$/;
    const isValid = myRegEx.test(number);
    if (isValid) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
exports.isNumber = (value) => {
    const number = value;
    const myRegEx = /^(\s*[0-9]+\s*)+$/;
    const isValid = myRegEx.test(number);
    if (isValid) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * @desc Checks if given value is Boolean
 * @param {*} value // Accepts string
 */
exports.isBoolean = (value) => {
    if (typeof value === 'boolean') {
        return true;
    }
    else {
        return false;
    }
};
/**
 * @desc Checks if given value is Aplha Numeric
 * @param {*} value // Accepts string
 */
exports.isAlphaNumeric = (value) => {
    const string = value;
    const myRegEx = /^[a-z0-9 ]+$/i;
    const isValid = myRegEx.test(string);
    if (isValid) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * @description Check if value is object
 * @param {*} value
 */
exports.isObject = (value) => {
    return typeof value === 'object' || value instanceof Object;
};
