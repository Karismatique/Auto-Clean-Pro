// migrations/20250427140000-create-all-tables.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // 1. Agencies
      await queryInterface.createTable('agencies', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: { type: Sequelize.STRING, allowNull: false },
        address: { type: Sequelize.STRING, allowNull: false },
        city: { type: Sequelize.STRING, allowNull: false },
        opening_hours: { type: Sequelize.JSON, allowNull: true },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'agencies', underscored: true, transaction });

      // 2. Users
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        full_name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        phone: { type: Sequelize.STRING, allowNull: true },
        address: { type: Sequelize.STRING, allowNull: true },
        favorite_agency_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'agencies', key: 'id' },
          onDelete: 'SET NULL'
        },
        profile_picture: { type: Sequelize.STRING, allowNull: true },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'users', underscored: true, transaction });

      // 3. Vehicles
      await queryInterface.createTable('vehicles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE'
        },
        brand: { type: Sequelize.STRING, allowNull: false },
        model: { type: Sequelize.STRING, allowNull: false },
        license_plate: { type: Sequelize.STRING, allowNull: false, unique: true },
        vehicle_type: {
          type: Sequelize.ENUM('sedan', 'suv', '4x4', 'other'),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'vehicles', underscored: true, transaction });

      // 4. Services
      await queryInterface.createTable('services', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true },
        price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        duration: { type: Sequelize.INTEGER, allowNull: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'services', underscored: true, transaction });

      // 5. Extras
      await queryInterface.createTable('extras', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: { type: Sequelize.STRING, allowNull: false },
        price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'extras', underscored: true, transaction });

      // 6. Employees
      await queryInterface.createTable('employees', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        agency_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'agencies', key: 'id' },
          onDelete: 'CASCADE'
        },
        full_name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        schedule: { type: Sequelize.JSON, allowNull: true },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'employees', underscored: true, transaction });

      // 7. Appointments
      await queryInterface.createTable('appointments', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE'
        },
        vehicle_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'vehicles', key: 'id' },
          onDelete: 'CASCADE'
        },
        agency_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'agencies', key: 'id' },
          onDelete: 'CASCADE'
        },
        service_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'services', key: 'id' },
          onDelete: 'CASCADE'
        },
        appointment_date: { type: Sequelize.DATE, allowNull: false },
        status: {
          type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'canceled'),
          allowNull: false,
          defaultValue: 'pending'
        },
        total_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'appointments', underscored: true, transaction });

      // 8. Appointment Extras (Junction Table)
      await queryInterface.createTable('appointment_extras', {
        appointment_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'appointments', key: 'id' },
          onDelete: 'CASCADE'
        },
        extra_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'extras', key: 'id' },
          onDelete: 'CASCADE'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'appointment_extras', underscored: true, transaction });

      // 9. Agency Admins
      await queryInterface.createTable('agency_admins', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        agency_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'agencies', key: 'id' },
          onDelete: 'CASCADE'
        },
        full_name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'agency_admins', underscored: true, transaction });

      // 10. Global Admins
      await queryInterface.createTable('global_admins', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        full_name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'global_admins', underscored: true, transaction });

      // 11. Reviews
      await queryInterface.createTable('reviews', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE'
        },
        appointment_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'appointments', key: 'id' },
          onDelete: 'CASCADE'
        },
        rating: { type: Sequelize.INTEGER, allowNull: false },
        comment: { type: Sequelize.TEXT, allowNull: true },
        photos: { type: Sequelize.TEXT, allowNull: true }, // Store JSON-serialized array
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'reviews', underscored: true, transaction });

      // 12. Loyalty Programs
      await queryInterface.createTable('loyalty_programs', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE'
        },
        points: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        rewards: { type: Sequelize.JSON, allowNull: true },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'loyalty_programs', underscored: true, transaction });

      // 13. Articles
      await queryInterface.createTable('articles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        title: { type: Sequelize.STRING, allowNull: false },
        content: { type: Sequelize.TEXT, allowNull: false },
        category: { type: Sequelize.STRING, allowNull: true },
        published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'articles', underscored: true, transaction });

      // 14. Stocks
      await queryInterface.createTable('stocks', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        agency_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'agencies', key: 'id' },
          onDelete: 'CASCADE'
        },
        product_name: { type: Sequelize.STRING, allowNull: false },
        quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'stocks', underscored: true, transaction });

      // 15. Notifications
      await queryInterface.createTable('notifications', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE'
        },
        appointment_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'appointments', key: 'id' },
          onDelete: 'CASCADE'
        },
        type: {
          type: Sequelize.ENUM('reminder', 'confirmation', 'thank_you'),
          allowNull: false
        },
        message: { type: Sequelize.TEXT, allowNull: false },
        sent_at: { type: Sequelize.DATE, allowNull: true },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { tableName: 'notifications', underscored: true, transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('notifications', { transaction });
      await queryInterface.dropTable('stocks', { transaction });
      await queryInterface.dropTable('articles', { transaction });
      await queryInterface.dropTable('loyalty_programs', { transaction });
      await queryInterface.dropTable('reviews', { transaction });
      await queryInterface.dropTable('global_admins', { transaction });
      await queryInterface.dropTable('agency_admins', { transaction });
      await queryInterface.dropTable('appointment_extras', { transaction });
      await queryInterface.dropTable('appointments', { transaction });
      await queryInterface.dropTable('employees', { transaction });
      await queryInterface.dropTable('extras', { transaction });
      await queryInterface.dropTable('services', { transaction });
      await queryInterface.dropTable('vehicles', { transaction });
      await queryInterface.dropTable('users', { transaction });
      await queryInterface.dropTable('agencies', { transaction });
    });
  }
};