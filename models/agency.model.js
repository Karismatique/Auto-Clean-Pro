// models/agency.model.js
module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define('Agency', {
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
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    opening_hours: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'agencies',
    underscored: true,
    timestamps: true
  });

  Agency.associate = (models) => {
    Agency.hasMany(models.Appointment, { foreignKey: 'agency_id', as: 'appointments' });
    Agency.hasMany(models.Employee, { foreignKey: 'agency_id', as: 'employees' });
    Agency.hasMany(models.Stock, { foreignKey: 'agency_id', as: 'stocks' });
    Agency.hasMany(models.User, { foreignKey: 'favorite_agency_id', as: 'favorited_by_users' });
  };

  return Agency;
};