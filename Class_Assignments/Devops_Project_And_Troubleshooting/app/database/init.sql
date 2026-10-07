-- Session 21 Database Initialization Script
-- Author: Shubh Shukla (24bcs10093)

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    author VARCHAR(100) DEFAULT 'Shubh Shukla',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, author) VALUES
('Initialize Git Repository', 'Setup DevOps multi-branch repository structure', 'Completed', 'Shubh Shukla (24bcs10093)'),
('Dockerize Frontend & Backend', 'Author multi-stage Dockerfiles with security best practices', 'Completed', 'Shubh Shukla (24bcs10093)'),
('Multi-Container Orchestration', 'Configure Docker Compose with network isolation and persistent storage', 'Completed', 'Shubh Shukla (24bcs10093)'),
('API Integration & Healthcheck', 'Verify Postgres connectivity and REST endpoint latency', 'Completed', 'Shubh Shukla (24bcs10093)');
