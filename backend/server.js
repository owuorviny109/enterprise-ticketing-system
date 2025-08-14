const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'support_ticket_crm',
  port: process.env.DB_PORT || 3306
};

let db;

// Initialize database connection
async function initDatabase() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL database');

    // Create tables if they don't exist
    await createTables();

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

// Create necessary tables
async function createTables() {
  try {
    // Organizations table (create first)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS organizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'staff', 'user') DEFAULT 'user',
        phone VARCHAR(20),
        city VARCHAR(50),
        country VARCHAR(50),
        address TEXT,
        photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Tickets table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        subject VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        type ENUM('General Inquiry', 'Award Progression', 'Certificate Request', 'Registration Issue', 'Complaint or Grievance', 'Technical Support') NOT NULL,
        department ENUM('Admin', 'ICT', 'Finance', 'Program Management', 'Customer Service') NOT NULL,
        priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
        status ENUM('new', 'open', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
        assigned_to INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Insert default admin user if not exists
    const [adminExists] = await db.execute('SELECT id FROM users WHERE email = ?', ['admin@presidentsaward.ke']);

    if (adminExists.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.execute(`
        INSERT INTO users (first_name, last_name, email, password, role) 
        VALUES (?, ?, ?, ?, ?)
      `, ['Admin', 'User', 'admin@presidentsaward.ke', hashedPassword, 'admin']);

      console.log('✅ Default admin user created');
    }

    // Insert default regular user if not exists
    const [userExists] = await db.execute('SELECT id FROM users WHERE email = ?', ['user@presidentsaward.ke']);

    if (userExists.length === 0) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      await db.execute(`
        INSERT INTO users (first_name, last_name, email, password, role) 
        VALUES (?, ?, ?, ?, ?)
      `, ['Regular', 'User', 'user@presidentsaward.ke', hashedPassword, 'user']);

      console.log('✅ Default regular user created');
    }

    console.log('✅ Database tables created/verified');

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
  }
}

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Support Ticket CRM API', status: 'running' });
});

// API root route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!', endpoints: ['/api/login', '/api/register'] });
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, city, country, organization } = req.body;
    console.log('🔍 Registration attempt:', { firstName, lastName, email, phone, city, country });

    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check if user already exists
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.execute(`
      INSERT INTO users (first_name, last_name, email, password, phone, city, country, address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [firstName, lastName, email, hashedPassword, phone || null, city || null, country || null, organization || null]);

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
async function startServer() {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();