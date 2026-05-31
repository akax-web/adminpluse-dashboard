-- AdminPulse MySQL Schema
-- Run this manually or let Spring Boot initialize on first start

CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    profile_image VARCHAR(255),
    department VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_role VARCHAR(50) DEFAULT 'User',
    status VARCHAR(20) DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample admin (login: admin@adminpulse.com / admin123)
INSERT IGNORE INTO admins (name, email, password, department, profile_image)
VALUES ('Akash', 'admin@adminpulse.com', 'admin123', 'IT Administration', '');

-- Sample users
INSERT IGNORE INTO users (name, email, user_role, status) VALUES
('Rahul Sharma', 'rahul@example.com', 'Admin', 'Active'),
('Priya Patel', 'priya@example.com', 'Editor', 'Active'),
('Amit Kumar', 'amit@example.com', 'User', 'Inactive'),
('Sneha Reddy', 'sneha@example.com', 'User', 'Active'),
('Vikram Singh', 'vikram@example.com', 'Moderator', 'Active');

-- Sample activities
INSERT IGNORE INTO activities (description, type) VALUES
('Admin logged into dashboard', 'auth'),
('New user Rahul Sharma was added', 'user'),
('User Priya Patel profile updated', 'user'),
('Monthly revenue report generated', 'report'),
('User Amit Kumar status changed to Inactive', 'user');
