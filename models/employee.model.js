// models/employee.model.js
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
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
      },
      schedule: {
        type: DataTypes.JSON,
        allowNull: true
      }
    }, {
      tableName: 'employees',
      underscored: true,
      timestamps: true
    });
  
    Employee.associate = (models) => {
      Employee.belongsTo(models.Agency, { foreignKey: 'agency_id', as: 'agency' });
    };
  
    return Employee;
  };