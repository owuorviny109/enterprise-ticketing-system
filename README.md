# Enterprise Ticketing System

A comprehensive ticketing system built with Angular 17+ and Node.js for "The President's Award - Kenya".

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enterprise-ticketing-system
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend && npm install && cd ..
   ```

3. **Database setup**
   - Create a MySQL database named `support_ticket_crm`
   - Update database credentials in `backend/.env`
   - Run the setup script: `mysql -u root -p < setup-database.sql`

4. **Start the application**
   ```bash
   # Start backend (Terminal 1)
   cd backend && npm start
   
   # Start frontend (Terminal 2)
   ng serve --open
   ```

5. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000

## 🔐 Default Login Credentials

- **Admin:** `admin@presidentsaward.ke` / `admin123`
- **User:** `user@presidentsaward.ke` / `user123`

## ✨ Features

### Public Interface
- ✅ Responsive homepage with hero section
- ✅ "How It Works" process flow
- ✅ Public ticket submission form
- ✅ Success notifications

### Admin Dashboard
- ✅ Real-time ticket analytics
- ✅ Interactive pie charts (department, type, creators)
- ✅ Ticket metrics and statistics
- ✅ User management system

### Backend API
- ✅ RESTful API with JWT authentication
- ✅ MySQL database integration
- ✅ Ticket CRUD operations
- ✅ User management endpoints

## 🏗️ Tech Stack

- **Frontend:** Angular 17+, TypeScript, SCSS, Signals
- **Backend:** Node.js, Express.js, MySQL
- **Authentication:** JWT tokens with bcrypt
- **Database:** MySQL with connection pooling

## 📁 Project Structure

```
├── src/app/
│   ├── core/                 # Core services, guards, interceptors
│   ├── shared/              # Shared components and services
│   ├── features/            # Feature modules
│   │   ├── public/          # Public pages (home, contact)
│   │   ├── auth/            # Authentication
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── tickets/         # Ticket management
│   │   └── manage-users/    # User management
│   ├── layout/              # Layout components
│   └── models/              # TypeScript interfaces
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment configuration
└── assets/                # Static assets
```

## 🔧 Configuration

### Environment Variables (backend/.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=support_ticket_crm
DB_PORT=3306
JWT_SECRET=your_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:4200
```

## 🚀 Deployment

### Backend Deployment
1. Set up MySQL database
2. Configure environment variables
3. Install dependencies: `npm install`
4. Start server: `npm start`

### Frontend Deployment
1. Build for production: `ng build --prod`
2. Deploy `dist/` folder to web server
3. Configure API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for The President's Award - Kenya**
```
src/
├── app/
│   ├── core/          # Singleton services & guards
│   ├── features/      # Feature modules
│   │   └── public/    # Public-facing components
│   ├── layout/        # Layout components
│   └── shared/        # Shared modules & components
└── assets/           # Static assets
```

 