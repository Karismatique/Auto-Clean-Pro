// models/user.model.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      favorite_agency_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'users',
      underscored: true,
      timestamps: true
    });
  
    User.associate = (models) => {
      User.hasMany(models.Vehicle, { foreignKey: 'user_id', as: 'vehicles' });
      User.hasMany(models.Appointment, { foreignKey: 'user_id', as: 'appointments' });
      User.hasMany(models.Review, { foreignKey: 'user_id', as: 'reviews' });
      User.hasOne(models.LoyaltyProgram, { foreignKey: 'user_id', as: 'loyalty_program' });
      User.belongsTo(models.Agency, { foreignKey: 'favorite_agency_id', as: 'favorite_agency' });
    };
  
    return User;
  };