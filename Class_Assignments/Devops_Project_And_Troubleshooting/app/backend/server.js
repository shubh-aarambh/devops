const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'shubh_user',
  password: process.env.DB_PASSWORD || 'shubh_secure_password_2026',
  database: process.env.DB_NAME || 'devops_project_db',
  connectionTimeoutMillis: 5000,
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
    res.status(200).json({
      status: 'UP',
      service: 'DevOps 3-Tier Backend API',
      database: 'CONNECTED',
      db_info: dbRes.rows[0],
      hostname: os.hostname(),
      uptime: Math.floor(process.uptime()),
      student: {
        name: process.env.STUDENT_NAME || 'Shubh Shukla',
        enrollment_no: process.env.STUDENT_ID || '24bcs10093'
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'DOWN',
      database: 'DISCONNECTED',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, status, author } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, author) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        title,
        description || '',
        status || 'In Progress',
        author || 'Shubh Shukla (24bcs10093)'
      ]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET metrics/stats
app.get('/api/stats', async (req, res) => {
  try {
    const countRes = await pool.query('SELECT COUNT(*) as total FROM tasks');
    res.status(200).json({
      total_tasks: parseInt(countRes.rows[0].total, 10),
      system_load: os.loadavg(),
      free_memory: os.freemem(),
      total_memory: os.totalmem(),
      node_version: process.version
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Session 21 Backend] API listening on port ${PORT}`);
  console.log(`[Student Info] Shubh Shukla (24bcs10093)`);
});
