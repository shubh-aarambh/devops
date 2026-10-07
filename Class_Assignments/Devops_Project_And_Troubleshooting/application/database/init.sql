-- Database initialization script for Session 21 Final DevOps Project
-- Author: Shubh Shukla (24bcs10093)

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status) VALUES
('Configure CI/CD Pipeline', 'Implement GitHub Actions with security gates', 'completed'),
('Deploy Kubernetes Cluster', 'Setup Minikube with HPA and ingress controller', 'completed'),
('Provision AWS Infrastructure', 'Terraform S3, VPC, EC2 and security groups', 'completed'),
('Containerize 3-Tier Application', 'Docker Compose with PostgreSQL, Node.js API and Nginx', 'completed'),
('Configure Monitoring Stack', 'Prometheus scraping and Grafana dashboard alerts', 'completed');
