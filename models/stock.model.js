// models/stock.model.js
module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
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
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'stocks',
      underscored: true,
      timestamps: true
    });
  
    Stock.associate = (models) => {
      Stock.belongsTo(models.Agency, { foreignKey: 'agency_id', as: 'agency' });
    };
  
    return Stock;
  };