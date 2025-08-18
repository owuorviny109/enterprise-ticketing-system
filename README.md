# Enterprise Ticketing System

A comprehensive customer relationship management (CRM) and support ticketing platform designed to streamline ticket submission, tracking, and resolution processes for "The President's Award - Kenya" organization.

## Overview

The Enterprise Ticketing System is a modern Angular-based support platform that prioritizes ease of access for ticket submission while providing comprehensive management tools for staff and administrators. The system features a public-facing home page where anyone can submit tickets without authentication, alongside secure internal dashboards for ticket management, user administration, and analytics.

## Key Features

### Public Ticket Submission
- **No Login Required**: Users can submit support tickets directly from the homepage without creating an account
- **Rich Text Editor**: Full-featured editor for detailed ticket descriptions
- **File Attachments**: Drag-and-drop file upload functionality
- **Real-time Validation**: Instant form validation and feedback
- **Ticket Tracking**: Unique ticket keys generated for easy tracking

### Admin Dashboard
- **Comprehensive Analytics**: Real-time metrics showing ticket statistics (new, open, closed, unassigned)
- **Visual Charts**: Pie charts for ticket distribution by department and type
- **Performance Metrics**: First response time and last response time tracking
- **Ticket History**: 12-month historical data visualization
- **User Statistics**: Customer and contact count tracking

### User Management
- **Role-Based Access**: Admin, Staff, and Customer roles with specific permissions
- **User Creation**: Complete user management with profile photos
- **Organization Management**: Group customers by organizations/departments
- **Permission Control**: Granular access control for different system features

### Ticket Management
- **Advanced Filtering**: Filter tickets by type, category, department, priority, status, and assignee
- **Search Functionality**: Quick search across all ticket fields
- **Status Tracking**: Complete ticket lifecycle management
- **Assignment System**: Assign tickets to specific staff members
- **Export/Import**: Data export and import capabilities

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Blue/Purple Branding**: Clean, modern UI with consistent "The President's Award - Kenya" branding
- **Intuitive Navigation**: Clear menu structure and breadcrumb navigation
- **Process Explanation**: "How It Works" section explaining the 3-step ticket process

## How It Works

### 1. Submit A Ticket
Users can submit tickets from the home page or dashboard after login. If you don't have login access, you can create an account from the provided link.

### 2. Track Progress with Email
You will get email progress when change ticket status or you can comment and discuss with agent for a particular ticket discussion.

### 3. Done and Close the Ticket
After marking done a ticket agent will close the ticket and you would get notified when its closed.

## Technology Stack

- **Frontend**: Angular 17+ with modern features
- **Architecture**: Modular design with lazy-loaded feature modules
- **State Management**: Angular signals for reactive state management
- **Styling**: SCSS with responsive design utilities
- **Backend**: RESTful API with MySQL database
- **Authentication**: JWT-based authentication with role-based access control

## Project Structure

```
src/
├── app/
│   ├── core/                          # Singleton providers, interceptors, guards
│   ├── shared/                        # UI components, directives, pipes, modules
│   ├── layout/                        # Layouts (public vs. dashboard)
│   ├── config/                        # Static configurations/constants
│   ├── models/                        # Global/shared interfaces and DTOs
│   ├── state/                         # Centralized app state
│   ├── features/                      # All app features, lazy-loaded
│   │   ├── public/                    # Before authentication
│   │   ├── auth/                      # Auth flows
│   │   ├── dashboard/                 # Post-login parent shell
│   │   ├── tickets/                   # Ticket management
│   │   ├── customers/                 # CRM users
│   │   ├── organizations/             # Organization management
│   │   ├── manage-users/              # User administration
│   │   └── settings/                  # System settings
│   └── app-routing.module.ts
├── assets/
├── environments/
└── styles/                           # Global SCSS
```

 
## Development Phases

### Phase 1: Public Homepage and Ticket Submission (Priority)
- Public layout and homepage foundation
- Hero section with branding
- "How It Works" process section
- Public ticket submission form
- Homepage footer

### Phase 2: Core Models and Configuration
- Data models for User, Ticket, Organization
- Configuration constants and enums
- API endpoint definitions

### Phase 3: Authentication and Admin Dashboard
- JWT-based authentication system
- Admin dashboard layout with sidebar navigation
- Comprehensive analytics and metrics

### Phase 4: User and Role Management
- User roles management interface
- User creation and management
- Customer management system

### Phase 5: Organization and Ticket Management
- Organization management interface
- Admin ticket management with filtering
- Ticket detail view and editing

### Phase 6: Shared Components and Styling
- Reusable UI components
- Consistent styling and theming
- Mobile-responsive design

### Phase 7: Testing and Optimization
- Unit and integration testing
- Performance optimization
- Production deployment preparation

=======
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

 
