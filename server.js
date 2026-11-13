const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

// 1. Enable CORS for all origins (allows localhost:8000, localhost:3000, 127.0.0.1, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Parse incoming JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Serve static frontend files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Ensure data.json exists and is valid JSON array
function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  } else {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8').trim();
      if (!content) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
      } else {
        JSON.parse(content);
      }
    } catch (e) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  }
}

initDataFile();

// Helper to read data.json safely
function readContacts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error reading data.json:', err);
    return [];
  }
}

// Helper to write data.json safely
function writeContacts(contacts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
}

// --- ROUTES ---

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Luxe Lane Haute Couture API',
    timestamp: new Date().toISOString()
  });
});

// GET /api/contact - View all submitted contacts
app.get('/api/contact', (req, res) => {
  const contacts = readContacts();
  res.json({
    success: true,
    total: contacts.length,
    contacts: contacts
  });
});

// POST /api/contact - Save contact form submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name field is required.'
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email field is required.'
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message field is required.'
      });
    }

    // Create new contact submission object
    const newSubmission = {
      id: 'MSG-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : 'N/A',
      subject: subject ? subject.trim() : 'General Couture Inquiry',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
    };

    // Save to data.json
    const contacts = readContacts();
    contacts.push(newSubmission);
    writeContacts(contacts);

    console.log(`[SUCCESS] New contact message received from: ${newSubmission.name} (${newSubmission.email})`);

    return res.status(201).json({
      success: true,
      message: 'Shukriya! Aapka message kamyabi se receive aur save ho gaya hai. Hamari concierge team aapse jald rabta karegi.',
      data: newSubmission
    });

  } catch (error) {
    console.error('Error processing contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error: Message save nahi ho saka. Barah-e-karam dobara koshish karein.'
    });
  }
});

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`✨ LUXE LANE NODE.JS + EXPRESS BACKEND STARTED`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📬 Contact API:       http://localhost:${PORT}/api/contact`);
  console.log(`💾 Database file:     ${DATA_FILE}`);
  console.log(`===============================================`);
});

module.exports = app;
