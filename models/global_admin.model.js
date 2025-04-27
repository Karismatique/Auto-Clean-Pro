// models/global_admin.model.js
module.exports = (sequelize, DataTypes) => {
    const GlobalAdmin = sequelize.define('GlobalAdmin', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: 'global_admins',
      underscored: true,
      timestamps: true
    });
  
    GlobalAdmin.associate = (models) => {
      // No direct associations, as global admins oversee all data
    };
  
    return GlobalAdmin;
  };