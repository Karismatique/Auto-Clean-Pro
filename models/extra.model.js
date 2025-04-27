// models/extra.model.js
module.exports = (sequelize, DataTypes) => {
    const Extra = sequelize.define('Extra', {
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      tableName: 'extras',
      underscored: true,
      timestamps: true
    });
  
    Extra.associate = (models) => {
      Extra.belongsToMany(models.Appointment, {
        through: 'appointment_extras',
        foreignKey: 'extra_id',
        as: 'appointments'
      });
    };
  
    return Extra;
  };