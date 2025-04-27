// models/review.model.js
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
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
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    }, {
      tableName: 'reviews',
      underscored: true,
      timestamps: true
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Review.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
    };
  
    return Review;
  };