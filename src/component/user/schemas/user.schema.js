"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../../../utils/dbConfig"));
class User extends sequelize_1.Model {
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: new sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: new sequelize_1.DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize: dbConfig_1.default,
    tableName: 'users',
    timestamps: false
});
exports.default = User;
