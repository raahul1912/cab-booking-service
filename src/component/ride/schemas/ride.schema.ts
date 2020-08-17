import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Ride extends Model {
  public ride_id!: number;
  public driver_id!: number;
  public user_id!: number;
  public src_lat!: number;
  public src_lng!: number;
  public dest_lat!: number;
  public dest_lng!: number;
  public fare!: number;
  public status!: number;
}

Ride.init(
  {
    ride_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    driver_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    src_lat: {
      type: new DataTypes.FLOAT(10, 6),
      allowNull: false
    },
    src_lng: {
      type: new DataTypes.FLOAT(10, 6),
      allowNull: false
    },
    dest_lat: {
      type: new DataTypes.FLOAT(10, 6),
      allowNull: false
    },
    dest_lng: {
      type: new DataTypes.FLOAT(10, 6),
      allowNull: false
    },
    fare: {
      type: new DataTypes.DOUBLE(),
      allowNull: false
    },
    status: {
      type: new DataTypes.TINYINT(),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'rides',
    timestamps: false
  }
);

export default Ride;
