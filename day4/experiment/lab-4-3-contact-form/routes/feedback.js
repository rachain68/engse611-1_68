const express = require('express');
const router = express.Router();
const { validateFeedback } = require('../middleware/validation');
const { readJsonFile, appendToJsonFile } = require('../middleware/fileManager');

// POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
    try {
        const newFeedback = await appendToJsonFile('feedback.json', req.body);
        
        if (!newFeedback) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save feedback'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Feedback saved successfully',
            data: newFeedback
        });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/feedback/stats - ดึงสถิติความคิดเห็น
router.get('/stats', async (req, res) => {
    try {
        const feedback = await readJsonFile('feedback.json');
        
        // Calculate statistics
        const totalFeedback = Array.isArray(feedback) ? feedback.length : 0;
        const averageRating = totalFeedback > 0 
            ? feedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback 
            : 0;
        const ratingDistribution = [1, 2, 3, 4, 5].reduce((acc, rating) => {
            acc[rating] = feedback.filter(item => item.rating === rating).length;
            return acc;
        }, {});

        res.json({
            success: true,
            message: 'Feedback statistics retrieved successfully',
            stats: {
                totalFeedback,
                averageRating: parseFloat(averageRating.toFixed(2)),
                ratingDistribution
            }
        });
    } catch (error) {
        console.error('Error retrieving feedback stats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;