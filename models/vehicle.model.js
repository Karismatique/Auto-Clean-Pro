// models/vehicle.model.js
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      vehicle_type: {
        type: DataTypes.ENUM('sedan', 'suv', '4x4', 'other'),
        allowNull: false
      }
    }, {
      tableName: 'vehicles',
      underscored: true,
      timestamps: true
    });
  
    Vehicle.associate = (models) => {
      Vehicle.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Vehicle.hasMany(models.Appointment, { foreignKey: 'vehicle_id', as: 'appointments' });
    };
  
    return Vehicle;
  };