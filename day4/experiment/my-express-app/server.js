const express = require('express');
const app = express();
const PORT = 3000;


// สร้าง Route สำหรับหน้าแรก
app.get('/', (req, res) => {
    res.send('<h1>🎉 สวัสดี Express.js!</h1>');
});
app.get('/about', (req, res) => {
    res.send('<h1>about service!</h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>contxct service!</h1>');
});

// เริ่มต้นให้เซิร์ฟเวอร์ทำงาน
app.listen(PORT, () => {
    console.log(`🚀 Server is running...`);
});