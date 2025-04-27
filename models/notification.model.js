// models/notification.model.js
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
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
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('reminder', 'confirmation', 'thank_you'),
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'notifications',
      underscored: true,
      timestamps: true
    });
  
    Notification.associate = (models) => {
      Notification.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Notification.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
    };
  
    return Notification;
  };