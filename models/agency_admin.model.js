// models/agency_admin.model.js
module.exports = (sequelize, DataTypes) => {
    const AgencyAdmin = sequelize.define('AgencyAdmin', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'agency_admins',
      underscored: true,
      timestamps: true
    });
  
    AgencyAdmin.associate = (models) => {
      AgencyAdmin.belongsTo(models.Agency, { foreignKey: 'agency_id', as: 'agency' });
    };
  
    return AgencyAdmin;
  };