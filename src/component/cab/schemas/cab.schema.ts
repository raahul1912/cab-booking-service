import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Cab extends Model {
  public cab_id!: number;
  public driver_id!: number;
  public cab_no!: string;
  public cab_lat!: string;
  public cab_lng!: string;
  public on_trip!: number;
}

Cab.init(
  {
    cab_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    driver_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    cab_no: {
      type: new DataTypes.STRING(20),
      allowNull: false
    },
    cab_lat: {
      type: new DataTypes.FLOAT(10, 6),
      allowNull: false
    },
    cab_lng: {
      type: new DataTypes.FLOAT(10, 6),
      allowNull: false
    },
    on_trip: {
      type: new DataTypes.TINYINT(),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'cabs',
    timestamps: false
  }
);

export default Cab;
