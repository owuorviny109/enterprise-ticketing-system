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

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Create ticket (public endpoint)
app.post('/api/tickets', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, description, type, department, priority = 'medium' } = req.body;

    if (!firstName || !lastName || !email || !subject || !description || !type || !department) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Check if user exists, if not create one
    let userId = null;
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      // Create new user for ticket submission
      const [userResult] = await db.execute(`
        INSERT INTO users (first_name, last_name, email, password, role) 
        VALUES (?, ?, ?, ?, ?)
      `, [firstName, lastName, email, await bcrypt.hash('temp123', 10), 'user']);
      userId = userResult.insertId;
    }

    // Create ticket
    const [result] = await db.execute(`
      INSERT INTO tickets (user_id, subject, description, type, department, priority, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [userId, subject, description, type, department, priority, 'new']);

    res.status(201).json({
      message: 'Ticket created successfully',
      ticketId: result.insertId,
      ticketKey: `#${result.insertId.toString().padStart(6, '0')}`
    });

  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get tickets (protected endpoint)
app.get('/api/tickets', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, priority, department, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    let queryParams = [];

    if (status) {
      whereClause += ' AND t.status = ?';
      queryParams.push(status);
    }

    if (priority) {
      whereClause += ' AND t.priority = ?';
      queryParams.push(priority);
    }

    if (department) {
      whereClause += ' AND t.department = ?';
      queryParams.push(department);
    }

    if (search) {
      whereClause += ' AND (t.subject LIKE ? OR t.description LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    // Get tickets with user info
    const [tickets] = await db.execute(`
      SELECT 
        t.id,
        CONCAT('#', LPAD(t.id, 6, '0')) as \`key\`,
        t.subject,
        t.description,
        t.type,
        t.department,
        t.priority,
        t.status,
        t.created_at as createdAt,
        t.updated_at as updatedAt,
        CONCAT(u.first_name, ' ', u.last_name) as customerName,
        u.email as customerEmail,
        u.id as customerId
      FROM tickets t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, parseInt(limit), parseInt(offset)]);

    // Get total count
    const [countResult] = await db.execute(`
      SELECT COUNT(*) as total
      FROM tickets t
      WHERE ${whereClause}
    `, queryParams);

    res.json({
      tickets,
      total: countResult[0].total,
      page: parseInt(page),
      limit: parseInt(limit)
    });

  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ticket statistics
app.get('/api/tickets/stats', authenticateToken, async (req, res) => {
  try {
    const [stats] = await db.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status IN ('open', 'in_progress') THEN 1 ELSE 0 END) as open,
        SUM(CASE WHEN status IN ('resolved', 'closed') THEN 1 ELSE 0 END) as closed
      FROM tickets
    `);

    res.json(stats[0]);

  } catch (error) {
    console.error('Get ticket stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single ticket
app.get('/api/tickets/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [tickets] = await db.execute(`
      SELECT 
        t.*,
        CONCAT('#', LPAD(t.id, 6, '0')) as \`key\`,
        CONCAT(u.first_name, ' ', u.last_name) as customerName,
        u.email as customerEmail,
        CONCAT(a.first_name, ' ', a.last_name) as assignedToName
      FROM tickets t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN users a ON t.assigned_to = a.id
      WHERE t.id = ?
    `, [id]);

    if (tickets.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(tickets[0]);

  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update ticket
app.put('/api/tickets/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, assigned_to } = req.body;

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    if (priority) {
      updates.push('priority = ?');
      params.push(priority);
    }

    if (assigned_to !== undefined) {
      updates.push('assigned_to = ?');
      params.push(assigned_to);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    params.push(id);

    await db.execute(`
      UPDATE tickets 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, params);

    res.json({ message: 'Ticket updated successfully' });

  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get users (for admin)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const [users] = await db.execute(`
      SELECT id, first_name, last_name, email, role, phone, city, country, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json(users);

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user (admin only)
app.post('/api/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { firstName, lastName, email, password, role = 'user', phone, city, country, address } = req.body;

    if (!firstName || !lastName || !email || !password) {
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
      INSERT INTO users (first_name, last_name, email, password, role, phone, city, country, address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [firstName, lastName, email, hashedPassword, role, phone || null, city || null, country || null, address || null]);

    res.status(201).json({
      message: 'User created successfully',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Create user error:', error);
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