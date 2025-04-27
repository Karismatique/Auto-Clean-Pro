// models/index.js
const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require('../config/db');

const db = {};

try {
  const modelFiles = fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== 'index.js' &&
        file.endsWith('.model.js')
      );
    });

  modelFiles.forEach((file) => {
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`✅ Loaded model: ${file}`);
    } catch (error) {
      console.error(`❌ Failed to load model ${file}:`, error);
    }
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db;

} catch (error) {
  console.error('❌ Error initializing models:', error);
  throw error;
}