const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs').promises;

// Import routes
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Apply rate limiting to API routes
app.use('/api', limiter);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use imported routes
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

// API status route
app.get('/api/status', async (req, res) => {
    try {
        // Read contacts and feedback data
        const contactsData = await fs.readFile(path.join(__dirname, 'data', 'contacts.json'), 'utf8');
        const feedbackData = await fs.readFile(path.join(__dirname, 'data', 'feedback.json'), 'utf8');
        
        const contacts = JSON.parse(contactsData);
        const feedback = JSON.parse(feedbackData);
        
        // Create timestamp in GMT+7. We compute the UTC time and then apply the
        // +07:00 offset to produce an ISO-like string (YYYY-MM-DDTHH:mm:ss.sss+07:00).
        const makeOffsetIso = (date, offsetHours) => {
            // Get the UTC components for the moment
            const yyyy = date.getUTCFullYear();
            const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
            const dd = String(date.getUTCDate()).padStart(2, '0');
            const hh = String(date.getUTCHours()).padStart(2, '0');
            const min = String(date.getUTCMinutes()).padStart(2, '0');
            const sec = String(date.getUTCSeconds()).padStart(2, '0');
            const ms = String(date.getUTCMilliseconds()).padStart(3, '0');

            // Apply offset hours to the hour component and normalize date by
            // creating a new Date from the UTC timestamp plus offset.
            const offsetMs = offsetHours * 60 * 60 * 1000;
            const local = new Date(date.getTime() + offsetMs);

            const Lyyyy = local.getUTCFullYear();
            const Lmm = String(local.getUTCMonth() + 1).padStart(2, '0');
            const Ldd = String(local.getUTCDate()).padStart(2, '0');
            const Lhh = String(local.getUTCHours()).padStart(2, '0');
            const Lmin = String(local.getUTCMinutes()).padStart(2, '0');
            const Lsec = String(local.getUTCSeconds()).padStart(2, '0');
            const Lms = String(local.getUTCMilliseconds()).padStart(3, '0');

            const sign = offsetHours >= 0 ? '+' : '-';
            const absOffset = Math.abs(offsetHours);
            const offHH = String(Math.floor(absOffset)).padStart(2, '0');
            const offMM = String(Math.floor((absOffset - Math.floor(absOffset)) * 60)).padStart(2, '0');

            return `${Lyyyy}-${Lmm}-${Ldd}T${Lhh}:${Lmin}:${Lsec}.${Lms}${sign}${offHH}:${offMM}`;
        };

        const timestamp = makeOffsetIso(new Date(), 7);
        
        res.json({
            success: true,
            status: 'API is running',
            timestamp: timestamp,
            stats: {
                contactsCount: Array.isArray(contacts) ? contacts.length : 0,
                feedbackCount: Array.isArray(feedback) ? feedback.length : 0
            }
        });
    } catch (error) {
        console.error('Error reading data files:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving API status'
        });
    }
});

// API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Contact Form API Documentation',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': {
                description: 'Submit contact form',
                requiredFields: ['name', 'email', 'subject', 'message'],
                optionalFields: ['phone', 'company']
            },
            'GET /api/contact': {
                description: 'Get all contact submissions (admin)',
                parameters: {
                    page: 'Page number (default: 1)',
                    limit: 'Items per page (default: 10)'
                }
            },
            'POST /api/feedback': {
                description: 'Submit feedback',
                requiredFields: ['rating', 'comment'],
                optionalFields: ['email']
            },
            'GET /api/feedback/stats': {
                description: 'Get feedback statistics'
            },
            'GET /api/status': {
                description: 'Get API status and data counts'
            }
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Contact Form API running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});