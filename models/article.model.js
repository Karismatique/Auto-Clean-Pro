// models/article.model.js
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      tableName: 'articles',
      underscored: true,
      timestamps: true
    });
  
    Article.associate = (models) => {
      // No direct associations (articles are standalone)
    };
  
    return Article;
  };