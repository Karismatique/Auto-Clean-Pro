// server.js
// Main Express.js entry point for Auto Clean Pro API
const express = require('express');
const { sequelize } = require('./config/db');
const agencyRoutes = require('./routes/agency.routes');
const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const serviceRoutes = require('./routes/service.routes');
const extraRoutes = require('./routes/extra.routes');
const employeeRoutes = require('./routes/employee.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const appointmentExtrasRoutes = require('./routes/appointment_extras.routes');
const agencyAdminRoutes = require('./routes/agency_admin.routes');
const globalAdminRoutes = require('./routes/global_admin.routes');
const reviewRoutes = require('./routes/review.routes');
const loyaltyProgramRoutes = require('./routes/loyalty_program.routes');
const articleRoutes = require('./routes/article.routes');
const stockRoutes = require('./routes/stock.routes');
const notificationRoutes = require('./routes/notification.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Log route imports
console.log('Imported routes:', {
  agencyRoutes, userRoutes, vehicleRoutes, serviceRoutes, extraRoutes,
  employeeRoutes, appointmentRoutes, appointmentExtrasRoutes,
  agencyAdminRoutes, globalAdminRoutes, reviewRoutes,
  loyaltyProgramRoutes, articleRoutes, stockRoutes, notificationRoutes
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/agencies', agencyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/extras', extraRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/appointment-extras', appointmentExtrasRoutes);
app.use('/api/agency-admins', agencyAdminRoutes);
app.use('/api/global-admins', globalAdminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/loyalty-programs', loyaltyProgramRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/notifications', notificationRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  console.log('✅ Database synced');
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Database sync failed:', error);
});