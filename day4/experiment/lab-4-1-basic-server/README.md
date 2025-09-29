# Student API Servers

โครงการนี้ประกอบด้วย API เซิร์ฟเวอร์สองตัวที่พัฒนาด้วย Node.js (`http-server.js` และ `express-server.js`) เพื่อจัดการและค้นหาข้อมูลนักศึกษา เซิร์ฟเวอร์สองตัวแรกใช้โมดูล `http` ของ Node.js ส่วนตัวที่สองใช้ Express framework โดยแต่ละเซิร์ฟเวอร์มี endpoints สำหรับเรียกดูข้อมูลนักศึกษาและมีความแตกต่างเล็กน้อยในรูปแบบการตอบสนอง

## ความต้องการเบื้องต้น

- **Node.js**: เวอร์ชัน 14 หรือสูงกว่า ดาวน์โหลดได้จาก [nodejs.org](https://nodejs.org/)
- **npm**: มาพร้อมกับ Node.js ใช้สำหรับติดตั้ง dependencies
- **เครื่องมือทดสอบ**: Postman หรือเว็บเบราว์เซอร์สำหรับทดสอบ API endpoints

## การติดตั้ง

1. **โคลนหรือดาวน์โหลดโครงการ**:
   ตรวจสอบให้แน่ใจว่ามีไฟล์สองตัว (`http-server.js` , `express-server.js`) ในโฟลเดอร์โครงการของคุณ

2. **ติดตั้ง dependencies** (จำเป็นสำหรับ `express-server.js` เท่านั้น):
   ```bash
   npm install express
   ```
   เซิร์ฟเวอร์ `http-server.js` ใช้โมดูลในตัวของ Node.js จึงไม่ต้องติดตั้งอะไรเพิ่มเติม

## โครงสร้างโครงการ

- `http-server.js`: เซิร์ฟเวอร์ HTTP ตัวแรกที่ใช้โมดูล `http` ของ Node.js
- `express-server.js`: เซิร์ฟเวอร์ที่ใช้ Express framework พร้อม endpoint `/stats` เพิ่มเติม

## การรันเซิร์ฟเวอร์

แต่ละเซิร์ฟเวอร์รันบนพอร์ตที่ต่างกันเพื่อป้องกันการ冲突 ดังนี้:

### 1. รัน `http-server.js`
- **พอร์ต**: 3000
- **คำสั่ง**:
  ```bash
  node server.js
  ```
- **ผลลัพธ์**:
  ```
  🌐 HTTP Server running on http://localhost:3000
  Available endpoints:
    GET /
    GET /students
    GET /students/:id
    GET /students/major/:major
  ```

### 2. รัน `express-server.js`
- **พอร์ต**: 3001
- **คำสั่ง**:
  ```bash
  node server3.js
  ```
- **ผลลัพธ์**:
  ```
  🚀 Express Server running on http://localhost:3001
  Available endpoints:
    GET /
    GET /students
    GET /students/:id
    GET /students/major/:major
    GET /stats
  ```

**หมายเหตุ**: หากต้องการรันหลายเซิร์ฟเวอร์พร้อมกัน ต้องกำหนดพอร์ตที่ไม่ซ้ำกันในแต่ละไฟล์โดยแก้ไขค่า `PORT` ในโค้ด

## การทดสอบ API

สามารถทดสอบ endpoints ได้โดยใช้ **Postman**, **curl**, หรือเว็บเบราว์เซอร์ ทุกเซิร์ฟเวอร์ส่งคืนข้อมูลในรูปแบบ JSON (UTF-8) และรองรับ CORS (`Access-Control-Allow-Origin: *`)

### Endpoints ที่มีในทุกเซิร์ฟเวอร์
1. **GET /**
   - **คำอธิบาย**: ส่งข้อความต้อนรับและรายการ endpoints ที่ใช้งานได้
   - **ตัวอย่าง**:
     ```
     curl http://localhost:3000/
     ```
     **ผลลัพธ์ (server.js)**:
     ```json
     {
       "message": "ยินดีต้อนรับสู่ Student API",
       "endpoints": [
         { "method": "GET", "path": "/" },
         { "method": "GET", "path": "/students" },
         { "method": "GET", "path": "/students/:id" },
         { "method": "GET", "path": "/students/major/:major" }
       ]
     }
     ```

2. **GET /students**
   - **คำอธิบาย**: ส่งรายการนักศึกษาทั้งหมด
   - **ตัวอย่าง**:
     ```
     curl http://localhost:3000/students
     ```
     **ผลลัพธ์ (server.js)**:
     ```json
     [
       { "id": 1, "name": "สมชาย ใจดี", "major": "วิศวกรรม", "year": 2 },
       { "id": 2, "name": "สมหญิง รักเรียน", "major": "วิทยาการคอมพิวเตอร์", "year": 3 },
       { "id": 3, "name": "สมศรี เก่งมาก", "major": "วิศวกรรม", "year": 1 }
     ]
     ```

3. **GET /students/:id**
   - **คำอธิบาย**: ส่งข้อมูลนักศึกษาตาม ID
   - **ตัวอย่าง**:
     ```
     curl http://localhost:3000/students/1
     ```
     **ผลลัพธ์ (server.js)**:
     ```json
     { "id": 1, "name": "สมชาย ใจดี", "major": "วิศวกรรม", "year": 2 }
     ```
     **ข้อผิดพลาด (หากไม่พบ ID)**:
     ```json
     { "message": "ไม่พบนักศึกษาที่มี ID: 999" }
     ```

4. **GET /students/major/:major**
   - **คำอธิบาย**: ส่งรายการนักศึกษาที่กรองตามสาขา (รองรับชื่อสาขาภาษาไทย)
   - **ตัวอย่าง**:
     ```
     curl http://localhost:3000/students/major/วิศวกรรม
     ```
     **ผลลัพธ์ (server.js)**:
     ```json
     [
       { "id": 1, "name": "สมชาย ใจดี", "major": "วิศวกรรม", "year": 2 },
       { "id": 3, "name": "สมศรี เก่งมาก", "major": "วิศวกรรม", "year": 1 }
     ]
     ```
     **ข้อผิดพลาด (หากไม่พบสาขา)**:
     ```json
     { "message": "ไม่พบนักศึกษาที่เรียนสาขา: ไม่มีสาขานี้" }
     ```

### Endpoint เพิ่มเติม (เฉพาะใน `express-server.js`)
5. **GET /stats**
   - **คำอธิบาย**: ส่งสถิติ เช่น จำนวนนักศึกษาทั้งหมดและจำนวนนักศึกษาในแต่ละสาขา
   - **ตัวอย่าง**:
     ```
     curl http://localhost:3001/stats
     ```
     **ผลลัพธ์**:
     ```json
     {
       "totalStudents": 3,
       "majors": {
         "วิศวกรรม": 2,
         "วิทยาการคอมพิวเตอร์": 1
       }
     }
     ```

### ความแตกต่างระหว่างเซิร์ฟเวอร์
- **server.js**: เซิร์ฟเวอร์ HTTP พื้นฐานที่ใช้โมดูล `http` พร้อมการตอบสนองที่เรียบง่าย
- **server2.js**: เซิร์ฟเวอร์ HTTP ที่มีข้อมูลนักศึกษาแตกต่าง (เช่น สาขา "บริหารธุรกิจ") และเพิ่มข้อมูลในผลลัพธ์ เช่น `total` สำหรับ `/students` และ `retrievedAt` สำหรับ `/students/:id`
- **server3.js**: เซิร์ฟเวอร์ที่ใช้ Express framework ใช้ข้อมูลนักศึกษาเดียวกับ `http-server.js` แต่เพิ่ม endpoint `/stats` สำหรับแสดงสถิติ

### การจัดการข้อผิดพลาด
- ทุกเซิร์ฟเวอร์ส่งคืนสถานะ 404 พร้อมข้อความ JSON สำหรับ endpoint ที่ไม่ถูกต้อง:
  ```json
  { "message": "ไม่พบ endpoint ที่ร้องขอ" }
  ```

## ตัวอย่างคำสั่ง curl
สำหรับ `http-server.js`:
```bash
curl http://localhost:3000/
curl http://localhost:3000/students
curl http://localhost:3000/students/1
curl http://localhost:3000/students/major/วิศวกรรม
```

สำหรับ `express-server.js`:
```bash
curl http://localhost:3001/
curl http://localhost:3001/students
curl http://localhost:3001/students/1
curl http://localhost:3001/students/major/วิศวกรรม
curl http://localhost:3001/stats
```

## หมายเหตุ
- หากต้องการรันเซิร์ฟเวอร์ทั้งสองพร้อมกัน ต้องแก้ไขพอร์ตในไฟล์ `http-server.js` หรือ `express-server.js` ให้ไม่ซ้ำกับ 3000 หรือ 3001
- หากมีคำถามเพิ่มเติมหรือต้องการปรับปรุงเซิร์ฟเวอร์ ติดต่อผู้พัฒนาได้เลย!