# 🚀 Enterprise Ticketing System - Complete Setup Guide

## 📋 Prerequisites

### 1. Install MySQL Database
```bash
# Download from: https://dev.mysql.com/downloads/mysql/
# OR use package manager:

# Windows (Chocolatey)
choco install mysql

# macOS (Homebrew)
brew install mysql

# Ubuntu/Debian
sudo apt install mysql-server
```

### 2. Install Node.js (if not installed)
```bash
# Download from: https://nodejs.org/
# Recommended: Node.js 18+ and npm 9+
```

### 3. Install Angular CLI (if not installed)
```bash
npm install -g @angular/cli
```

## 🗄️ Database Setup

### 1. Start MySQL Service
```bash
# Windows
net start mysql

# macOS/Linux
sudo systemctl start mysql
# OR
brew services start mysql
```

### 2. Create Database
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE support_ticket_crm;

-- Create user (optional, or use root)
CREATE USER 'ticket_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON support_ticket_crm.* TO 'ticket_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 3. Configure Database Connection
Update `backend/.env` with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=support_ticket_crm
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
FRONTEND_URL=http://localhost:4200
```

## 🔧 Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Backend Server
```bash
# Development mode (auto-restart)
npm run dev

# OR Production mode
npm start
```

### 3. Test Backend API
```bash
# Run API tests
npm run test-api
```

**Expected Output:**
```
🧪 Testing Support Ticket CRM API...

1. Testing API status...
✅ API Status: Support Ticket CRM API is running!

2. Testing user registration...
✅ User registered: User registered successfully

3. Testing user login...
✅ Login successful for: test@example.com

4. Testing ticket creation...
✅ Ticket created: { id: '1', subject: 'Test Support Request', status: 'new' }

5. Testing ticket retrieval...
✅ Retrieved tickets: { total: 1, count: 1 }

6. Testing ticket statistics...
✅ Ticket stats: { total: 1, pending: 1, open: 0, ... }

🎉 All API tests passed! Your backend is working perfectly.
```

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
# From project root
npm install
```

### 2. Start Frontend Application
```bash
ng serve
```

### 3. Access Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000/api

## 🎯 Default Users

The system creates default users automatically:

### Admin User
- **Email**: `admin@presidentsaward.ke`
- **Password**: `admin123`
- **Role**: Administrator

### Regular User
- **Email**: `user@presidentsaward.ke`
- **Password**: `user123`
- **Role**: User

## 🔥 Features Available

### ✅ Working Features
- **User Registration & Login** with JWT authentication
- **Ticket Creation** from public form
- **Ticket Management** (CRUD operations)
- **Dashboard Analytics** with real-time stats
- **User Management** with role-based access
- **Professional UI/UX** with responsive design

### 🎫 Ticket System
- **Create Tickets**: Public form submission
- **Manage Tickets**: Admin dashboard
- **Status Tracking**: New → Open → In Progress → Resolved → Closed
- **Priority Levels**: Low, Medium, High, Urgent
- **Departments**: Admin, ICT, Finance, Program Management, Customer Service
- **Ticket Types**: General Inquiry, Award Progression, Certificate Request, etc.

### 🔐 Authentication
- **JWT-based** secure authentication
- **Role-based access** control (Admin, Staff, User)
- **Password hashing** with bcrypt
- **Token expiration** handling

### 📊 Database Schema
```sql
-- Users table
users (id, first_name, last_name, email, password, role, phone, city, country, address, photo, created_at, updated_at)

-- Tickets table  
tickets (id, user_id, subject, description, type, department, priority, status, assigned_to, created_at, updated_at)

-- Organizations table
organizations (id, name, description, created_at, updated_at)
```

## 🚀 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Tickets
- `GET /api/tickets` - List tickets (with filtering)
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/:id` - Get single ticket
- `PATCH /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket
- `GET /api/tickets/stats` - Get ticket statistics

## 🛠️ Troubleshooting

### Backend Issues
1. **Database Connection Failed**
   - Check MySQL is running
   - Verify credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in `.env`
   - Kill existing process: `lsof -ti:3000 | xargs kill`

3. **JWT Errors**
   - Update JWT_SECRET in `.env`
   - Clear browser localStorage

### Frontend Issues
1. **API Connection Failed**
   - Ensure backend is running on port 3000
   - Check CORS configuration
   - Verify API endpoints

2. **Build Errors**
   - Run `npm install`
   - Clear node_modules: `rm -rf node_modules && npm install`

## 📈 Next Steps

1. **Customize Branding**: Update logos, colors, and text
2. **Add Email Notifications**: Implement email service
3. **File Attachments**: Add file upload functionality
4. **Advanced Analytics**: Expand dashboard metrics
5. **Mobile App**: Create mobile version
6. **API Documentation**: Add Swagger/OpenAPI docs

## 🎉 Success!

Your enterprise ticketing system is now fully functional with:
- ✅ Professional frontend interface
- ✅ Secure backend API
- ✅ MySQL database integration
- ✅ Real-time ticket management
- ✅ User authentication & authorization
- ✅ Responsive design
- ✅ Production-ready architecture

**Happy ticketing!** 🎫✨