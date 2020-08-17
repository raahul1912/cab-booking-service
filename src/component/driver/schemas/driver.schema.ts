import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Driver extends Model {
  public driver_id!: number;
  public driver_name!: string;
  public phone!: string;
  public email!: string;
  public password!: string;
}

Driver.init(
  {
    driver_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    driver_name: {
      type: new DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: new DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'drivers',
    timestamps: false
  }
);

export default Driver;
