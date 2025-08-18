-- Database setup script for Enterprise Ticketing System
-- Run this in your MySQL client or phpMyAdmin

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS support_ticket_crm;
USE support_ticket_crm;

-- Create users table
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
);

-- Create tickets table
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
);

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (first_name, last_name, email, password, role) 
VALUES ('Admin', 'User', 'admin@presidentsaward.ke', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert default regular user (password: user123)
INSERT IGNORE INTO users (first_name, last_name, email, password, role) 
VALUES ('Regular', 'User', 'user@presidentsaward.ke', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Insert some sample tickets for testing
INSERT IGNORE INTO tickets (user_id, subject, description, type, department, priority, status) VALUES
(2, 'Certificate Request', 'I need my award certificate', 'Certificate Request', 'Admin', 'medium', 'new'),
(2, 'Technical Issue', 'Website not loading properly', 'Technical Support', 'ICT', 'high', 'open'),
(2, 'Award Progression Query', 'When will I receive my bronze award?', 'Award Progression', 'Program Management', 'low', 'resolved');

SELECT 'Database setup completed successfully!' as message;