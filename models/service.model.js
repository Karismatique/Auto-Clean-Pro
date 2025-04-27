// models/service.model.js
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'services',
    underscored: true,
    timestamps: true
  });

  Service.associate = (models) => {
    Service.hasMany(models.Appointment, { foreignKey: 'service_id', as: 'appointments' });
  };

  return Service;
};