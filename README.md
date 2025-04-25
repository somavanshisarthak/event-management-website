# EventHub - College Event Management System

A full-stack web application for managing college events, registrations, and notifications.

## Features

- User authentication (Students, Organizers, Admin)
- Event creation and management
- Event registration system
- Email notifications
- In-app notifications
- Event reminders
- Responsive design

## Tech Stack

### Frontend
- React.js
- Material-UI
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Nodemailer

## Project Structure

```
EventHub/
├── frontend/           # React frontend
├── backend/           # Node.js backend
│   ├── config/       # Configuration files
│   ├── middleware/   # Authentication middleware
│   ├── migrations/   # Database migrations
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── scripts/      # Utility scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   - Database credentials
   - JWT secret
   - Email service credentials

5. Run database migrations:
   ```bash
   npm run migrate
   ```

6. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=college_events
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 