"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../../../utils/dbConfig"));
class Cab extends sequelize_1.Model {
}
Cab.init({
    cab_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    driver_id: {
        type: new sequelize_1.DataTypes.INTEGER(),
        allowNull: false
    },
    cab_no: {
        type: new sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    cab_lat: {
        type: new sequelize_1.DataTypes.FLOAT(10, 6),
        allowNull: false
    },
    cab_lng: {
        type: new sequelize_1.DataTypes.FLOAT(10, 6),
        allowNull: false
    },
    on_trip: {
        type: new sequelize_1.DataTypes.TINYINT(),
        allowNull: true
    }
}, {
    sequelize: dbConfig_1.default,
    tableName: 'cabs',
    timestamps: false
});
exports.default = Cab;
