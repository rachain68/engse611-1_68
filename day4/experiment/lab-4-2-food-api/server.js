const express = require('express');
const cors = require('cors');
const path = require('path');

const foodRoutes = require('./routes/foods');
const logger = require('./middleware/logger');

const foods = require('./data/foods.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logger);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs'
        }
    });
});

app.use('/api/foods', foodRoutes);

app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Food API Documentation',
        version: '1.0.0',
        description: 'API สำหรับข้อมูลอาหารไทย พร้อมฟังก์ชันการค้นหาและกรองข้อมูล',
        endpoints: [
            {
                method: 'GET',
                path: '/api/foods',
                description: 'ดึงข้อมูลอาหารทั้งหมด',
                queryParams: [
                    { name: 'search', description: 'ค้นหาตามชื่ออาหาร (เช่น ?search=ผัด)' },
                    { name: 'category', description: 'กรองตามหมวดหมู่ (เช่น ?category=แกง)' },
                    { name: 'maxSpicy', description: 'กรองตามระดับความเผ็ดสูงสุด (เช่น ?maxSpicy=3)' },
                    { name: 'vegetarian', description: 'กรองอาหารมังสวิรัติ (true/false, เช่น ?vegetarian=true)' }
                ]
            },
            {
                method: 'GET',
                path: '/api/foods/:id',
                description: 'ดึงข้อมูลอาหารตาม ID (เช่น /api/foods/1)'
            },
            {
                method: 'GET',
                path: '/api/docs',
                description: 'ดึงเอกสาร API นี้'
            },
            {
                method: 'GET',
                path: '/api/stats',
                description: 'ดึงสถิติข้อมูลอาหาร'
            }
        ],
        notes: 'API นี้ใช้ข้อมูลจาก foods.json และรองรับการค้นหาแบบ case-insensitive สำหรับ search และ category.'
    });
});

app.get('/api/stats', (req, res) => {
    const total = foods.length;
    
    const categories = {};
    foods.forEach(food => {
        categories[food.category] = (categories[food.category] || 0) + 1;
    });
    
    const spicyLevels = {};
    foods.forEach(food => {
        spicyLevels[food.spicyLevel] = (spicyLevels[food.spicyLevel] || 0) + 1;
    });
    
    const vegetarianCount = foods.filter(food => food.vegetarian).length;
    const availableCount = foods.filter(food => food.available).length;
    
    res.json({
        totalFoods: total,
        categories: categories,
        spicyLevels: spicyLevels,
        vegetarianCount: vegetarianCount,
        availableCount: availableCount,
        averagePrice: (foods.reduce((sum, food) => sum + food.price, 0) / total).toFixed(2),
        averageCookingTime: (foods.reduce((sum, food) => sum + food.cookingTime, 0) / total).toFixed(2)
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});