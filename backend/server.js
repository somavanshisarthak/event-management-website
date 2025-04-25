const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { setupDatabase } = require('./scripts/setup_database');
const registrationsRouter = require('./routes/registrations');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/events', require('./routes/events.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/notifications', require('./routes/notifications.js'));
app.use('/api/registrations', registrationsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Setup database and start server
async function startServer() {
  try {
    // Setup database
    await setupDatabase();
    console.log('Database setup completed');

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Kick off your reminder-checker
    require('./scripts/notificationCron');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 