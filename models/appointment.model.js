// models/appointment.model.js
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
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
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'canceled'),
        allowNull: false,
        defaultValue: 'pending'
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      tableName: 'appointments',
      underscored: true,
      timestamps: true
    });
  
    Appointment.associate = (models) => {
      Appointment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Appointment.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
      Appointment.belongsTo(models.Agency, { foreignKey: 'agency_id', as: 'agency' });
      Appointment.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' });
      Appointment.belongsToMany(models.Extra, {
        through: 'appointment_extras',
        foreignKey: 'appointment_id',
        as: 'extras'
      });
      Appointment.hasOne(models.Review, { foreignKey: 'appointment_id', as: 'review' });
    };
  
    return Appointment;
  };