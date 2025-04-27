// seeders/20250427150000-seed-all-tables.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // 1. Agencies
      await queryInterface.bulkInsert('agencies', [
        {
          name: 'Auto Clean Rouen',
          address: '123 Rue de la Liberté',
          city: 'Rouen',
          opening_hours: JSON.stringify({
            monday: '08:00-18:00',
            tuesday: '08:00-18:00',
            wednesday: '08:00-18:00',
            thursday: '08:00-18:00',
            friday: '08:00-18:00',
            saturday: '09:00-14:00',
            sunday: 'closed'
          }),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Auto Clean Lyon',
          address: '456 Avenue des Lumières',
          city: 'Lyon',
          opening_hours: JSON.stringify({
            monday: '09:00-19:00',
            tuesday: '09:00-19:00',
            wednesday: '09:00-19:00',
            thursday: '09:00-19:00',
            friday: '09:00-19:00',
            saturday: '10:00-15:00',
            sunday: 'closed'
          }),
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 2. Users
      await queryInterface.bulkInsert('users', [
        {
          full_name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          password: 'hashed_password_123', // Replace with bcrypt hash in production
          phone: '0601234567',
          address: '12 Rue des Fleurs, Rouen',
          favorite_agency_id: 1,
          profile_picture: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          full_name: 'Marie Martin',
          email: 'marie.martin@example.com',
          password: 'hashed_password_456',
          phone: '0612345678',
          address: '34 Avenue des Roses, Lyon',
          favorite_agency_id: 2,
          profile_picture: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 3. Vehicles
      await queryInterface.bulkInsert('vehicles', [
        {
          user_id: 1,
          brand: 'Peugeot',
          model: '208',
          license_plate: 'AB-123-CD',
          vehicle_type: 'sedan',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 2,
          brand: 'Renault',
          model: 'Captur',
          license_plate: 'XY-789-ZW',
          vehicle_type: 'suv',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 4. Services
      await queryInterface.bulkInsert('services', [
        {
          name: 'Interior Cleaning',
          description: 'Complete interior cleaning including seats and dashboard.',
          price: 50.00,
          duration: 60,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Exterior Cleaning',
          description: 'Full exterior wash and polish.',
          price: 40.00,
          duration: 45,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Complete Cleaning',
          description: 'Interior and exterior cleaning package.',
          price: 80.00,
          duration: 90,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 5. Extras
      await queryInterface.bulkInsert('extras', [
        {
          name: 'Wax Polish',
          price: 20.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Disinfection',
          price: 15.00,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 6. Employees
      await queryInterface.bulkInsert('employees', [
        {
          agency_id: 1,
          full_name: 'Luc Picard',
          email: 'luc.picard@example.com',
          password: 'hashed_password_789',
          schedule: JSON.stringify({
            monday: '08:00-16:00',
            tuesday: '08:00-16:00',
            wednesday: '08:00-16:00',
            thursday: '08:00-16:00',
            friday: '08:00-16:00'
          }),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          agency_id: 2,
          full_name: 'Sophie Laurent',
          email: 'sophie.laurent@example.com',
          password: 'hashed_password_012',
          schedule: JSON.stringify({
            monday: '09:00-17:00',
            tuesday: '09:00-17:00',
            wednesday: '09:00-17:00',
            thursday: '09:00-17:00',
            friday: '09:00-17:00'
          }),
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 7. Appointments
      await queryInterface.bulkInsert('appointments', [
        {
          user_id: 1,
          vehicle_id: 1,
          agency_id: 1,
          service_id: 3,
          appointment_date: new Date('2025-05-01T10:00:00'),
          status: 'confirmed',
          total_price: 80.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 2,
          vehicle_id: 2,
          agency_id: 2,
          service_id: 1,
          appointment_date: new Date('2025-05-02T14:00:00'),
          status: 'pending',
          total_price: 50.00,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 8. Appointment Extras
      await queryInterface.bulkInsert('appointment_extras', [
        {
          appointment_id: 1,
          extra_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          appointment_id: 1,
          extra_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 9. Agency Admins
      await queryInterface.bulkInsert('agency_admins', [
        {
          agency_id: 1,
          full_name: 'Claire Dubois',
          email: 'claire.dubois@example.com',
          password: 'hashed_password_345',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          agency_id: 2,
          full_name: 'Antoine Lefevre',
          email: 'antoine.lefevre@example.com',
          password: 'hashed_password_678',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 10. Global Admins
      await queryInterface.bulkInsert('global_admins', [
        {
          full_name: 'Admin National',
          email: 'admin.national@example.com',
          password: 'hashed_password_901',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 11. Reviews
      await queryInterface.bulkInsert('reviews', [
        {
          user_id: 1,
          appointment_id: 1,
          rating: 5,
          comment: 'Excellent service, my car looks brand new!',
          photos: JSON.stringify(['photo1.jpg', 'photo2.jpg']),
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 12. Loyalty Programs
      await queryInterface.bulkInsert('loyalty_programs', [
        {
          user_id: 1,
          points: 100,
          rewards: JSON.stringify({ discount: '10% off next service' }),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 2,
          points: 50,
          rewards: JSON.stringify({ discount: '5% off next service' }),
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 13. Articles
      await queryInterface.bulkInsert('articles', [
        {
          title: 'Top 5 Car Cleaning Tips',
          content: 'Learn how to keep your car spotless with these expert tips...',
          category: 'Car Care',
          published: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Why Regular Car Washing Matters',
          content: 'Discover the benefits of maintaining a clean vehicle...',
          category: 'Maintenance',
          published: false,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 14. Stocks
      await queryInterface.bulkInsert('stocks', [
        {
          agency_id: 1,
          product_name: 'Cleaning Solution',
          quantity: 50,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          agency_id: 2,
          product_name: 'Microfiber Towels',
          quantity: 100,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // 15. Notifications
      await queryInterface.bulkInsert('notifications', [
        {
          user_id: 1,
          appointment_id: 1,
          type: 'confirmation',
          message: 'Your appointment on May 1, 2025, at 10:00 is confirmed.',
          sent_at: new Date(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 2,
          appointment_id: 2,
          type: 'reminder',
          message: 'Reminder: Your appointment is on May 2, 2025, at 14:00.',
          sent_at: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('notifications', null, { transaction });
      await queryInterface.bulkDelete('stocks', null, { transaction });
      await queryInterface.bulkDelete('articles', null, { transaction });
      await queryInterface.bulkDelete('loyalty_programs', null, { transaction });
      await queryInterface.bulkDelete('reviews', null, { transaction });
      await queryInterface.bulkDelete('global_admins', null, { transaction });
      await queryInterface.bulkDelete('agency_admins', null, { transaction });
      await queryInterface.bulkDelete('appointment_extras', null, { transaction });
      await queryInterface.bulkDelete('appointments', null, { transaction });
      await queryInterface.bulkDelete('employees', null, { transaction });
      await queryInterface.bulkDelete('extras', null, { transaction });
      await queryInterface.bulkDelete('services', null, { transaction });
      await queryInterface.bulkDelete('vehicles', null, { transaction });
      await queryInterface.bulkDelete('users', null, { transaction });
      await queryInterface.bulkDelete('agencies', null, { transaction });
    });
  }
};