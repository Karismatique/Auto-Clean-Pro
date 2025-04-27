// models/loyalty_program.model.js
module.exports = (sequelize, DataTypes) => {
    const LoyaltyProgram = sequelize.define('LoyaltyProgram', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      rewards: {
        type: DataTypes.JSON,
        allowNull: true
      }
    }, {
      tableName: 'loyalty_programs',
      underscored: true,
      timestamps: true
    });
  
    LoyaltyProgram.associate = (models) => {
      LoyaltyProgram.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
  
    return LoyaltyProgram;
  };