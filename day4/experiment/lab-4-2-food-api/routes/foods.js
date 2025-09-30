const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        
        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;
        
        // Filtering logic
        if (search) {
            const searchTerm = search.toLowerCase();
            foods = foods.filter(food => 
                food.name.toLowerCase().includes(searchTerm) || 
                food.description.toLowerCase().includes(searchTerm)
            );
        }
        
        if (category) {
            foods = foods.filter(food => 
                food.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        if (maxSpicy) {
            const maxSpicyLevel = parseInt(maxSpicy);
            if (!isNaN(maxSpicyLevel)) {
                foods = foods.filter(food => food.spicyLevel <= maxSpicyLevel);
            }
        }
        
        if (vegetarian) {
            const isVegetarian = vegetarian.toLowerCase() === 'true';
            foods = foods.filter(food => food.vegetarian === isVegetarian);
        }
        
        if (available) {
            const isAvailable = available.toLowerCase() === 'true';
            foods = foods.filter(food => food.available === isAvailable);
        }
        
        if (maxPrice) {
            const maxPriceValue = parseFloat(maxPrice);
            if (!isNaN(maxPriceValue)) {
                foods = foods.filter(food => food.price <= maxPriceValue);
            }
        }
        
        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
    try {
        const foods = loadFoods();
        
        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No foods available'
            });
        }
        
        const randomIndex = Math.floor(Math.random() * foods.length);
        const randomFood = foods[randomIndex];
        
        res.json({
            success: true,
            data: randomFood
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching random food'
        });
    }
});

// GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    try {
        const foods = loadFoods();
        const id = parseInt(req.params.id);
        const food = foods.find(food => food.id === id);
        
        if (!food) {
            return res.status(404).json({
                success: false,
                message: `Food with ID ${id} not found`
            });
        }
        
        res.json({
            success: true,
            data: food
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching food'
        });
    }
});

// GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    try {
        const foods = loadFoods();
        const category = req.params.category;
        
        const filteredFoods = foods.filter(food => 
            food.category.toLowerCase() === category.toLowerCase()
        );
        
        if (filteredFoods.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No foods found in category: ${category}`
            });
        }
        
        res.json({
            success: true,
            data: filteredFoods,
            total: filteredFoods.length,
            category: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods by category'
        });
    }
});

module.exports = router;