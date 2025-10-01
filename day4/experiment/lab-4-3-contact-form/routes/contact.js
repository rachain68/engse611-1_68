const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');
const { readJsonFile, appendToJsonFile } = require('../middleware/fileManager');

// POST /api/contact - บันทึกข้อมูลติดต่อ
router.post('/', validateContact, async (req, res) => {
    try {
        const newContact = await appendToJsonFile('contacts.json', req.body);
        
        if (!newContact) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save contact data'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Contact data saved successfully',
            data: newContact
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/contact - ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
    try {
        const contacts = await readJsonFile('contacts.json');
        
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Calculate pagination metadata
        const totalItems = Array.isArray(contacts) ? contacts.length : 0;
        const totalPages = Math.ceil(totalItems / limit);

        // Slice data for current page
        const paginatedContacts = contacts.slice(startIndex, endIndex);

        res.json({
            success: true,
            message: 'Contacts retrieved successfully',
            data: paginatedContacts,
            pagination: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems: totalItems,
                totalPages: totalPages
            }
        });
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;