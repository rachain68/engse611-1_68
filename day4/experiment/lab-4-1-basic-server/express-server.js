const express = require('express');
const app = express();
const PORT = 3001;

// สร้างข้อมูลจำลอง students array เดียวกับใน server.js
const students = [
    { id: 1, name: "สมชาย ใจดี", major: "วิศวกรรม", year: 2 },
    { id: 2, name: "สมหญิง รักเรียน", major: "วิทยาการคอมพิวเตอร์", year: 3 },
    { id: 3, name: "สมศรี เก่งมาก", major: "วิศวกรรม", year: 1 }
];

// Middleware
app.use(express.json());

// ตั้งค่า CORS และ Content-Type
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// Route GET /
app.get('/', (req, res) => {
    res.status(200).json({
        message: "ยินดีต้อนรับสู่ Student API (Express)",
        endpoints: [
            { method: "GET", path: "/" },
            { method: "GET", path: "/students" },
            { method: "GET", path: "/students/:id" },
            { method: "GET", path: "/students/major/:major" },
            { method: "GET", path: "/stats" }
        ]
    });
});

// Route GET /students
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// Route GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: `ไม่พบนักศึกษาที่มี ID: ${id}` });
    }
});

// Route GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const major = decodeURIComponent(req.params.major);
    const filteredStudents = students.filter(s => s.major === major);
    if (filteredStudents.length > 0) {
        res.status(200).json(filteredStudents);
    } else {
        res.status(404).json({ message: `ไม่พบนักศึกษาที่เรียนสาขา: ${major}` });
    }
});

// Route GET /stats
app.get('/stats', (req, res) => {
    const totalStudents = students.length;
    const majorCounts = students.reduce((acc, student) => {
        acc[student.major] = (acc[student.major] || 0) + 1;
        return acc;
    }, {});
    res.status(200).json({
        totalStudents,
        majors: majorCounts
    });
});

// Middleware จัดการ 404
app.use((req, res) => {
    res.status(404).json({ message: "ไม่พบ endpoint ที่ร้องขอ" });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});