const http = require('http');
const url = require('url');

const PORT = 3000;

// สร้างข้อมูลจำลอง students array
const students = [
    { id: 1, name: "สมชาย ใจดี", major: "วิศวกรรม", year: 2 },
    { id: 2, name: "สมหญิง รักเรียน", major: "วิทยาการคอมพิวเตอร์", year: 3 },
    { id: 3, name: "สมศรี เก่งมาก", major: "วิศวกรรม", year: 1 }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    // จัดการ route GET /
    if (method === 'GET' && pathname === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: "ยินดีต้อนรับสู่ Student API",
            endpoints: [
                { method: "GET", path: "/" },
                { method: "GET", path: "/students" },
                { method: "GET", path: "/students/:id" },
                { method: "GET", path: "/students/major/:major" }
            ]
        }));
        return;
    }
    
    // จัดการ route GET /students
    if (method === 'GET' && pathname === '/students') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
        return;
    }
    
    // จัดการ route GET /students/:id
    if (method === 'GET' && pathname.startsWith('/students/') && pathname.split('/').length === 3) {
        const id = parseInt(pathname.split('/')[2]);
        const student = students.find(s => s.id === id);
        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `ไม่พบนักศึกษาที่มี ID: ${id}` }));
        }
        return;
    }
    
    // จัดการ route GET /students/major/:major
    if (method === 'GET' && pathname.startsWith('/students/major/') && pathname.split('/').length === 4) {
        const major = decodeURIComponent(pathname.split('/')[3]);
        const filteredStudents = students.filter(s => s.major === major);
        if (filteredStudents.length > 0) {
            res.writeHead(200);
            res.end(JSON.stringify(filteredStudents));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `ไม่พบนักศึกษาที่เรียนสาขา: ${major}` }));
        }
        return;
    }
    
    // จัดการกรณี 404 Not Found
    res.writeHead(404);
    res.end(JSON.stringify({ message: "ไม่พบ endpoint ที่ร้องขอ" }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
});