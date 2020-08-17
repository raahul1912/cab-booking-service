import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class User extends Model {
  public user_id!: number;
  public user_name!: string;
  public phone!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_name: {
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
      type: new DataTypes.STRING(150),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false
  }
);

export default User;
