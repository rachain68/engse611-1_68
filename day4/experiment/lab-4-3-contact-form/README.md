# Contact Form API

โปรเจ็กต์นี้เป็น API สำหรับ Contact Form และ Feedback Form ที่มีระบบ validation และการเก็บข้อมูลในไฟล์ JSON พร้อมหน้าเว็บสำหรับทดสอบ API

## เป้าหมาย
- สร้าง API สำหรับบันทึกข้อมูลติดต่อและความคิดเห็น
- มีระบบ validation ทั้งฝั่ง client และ server
- เก็บข้อมูลในไฟล์ JSON (`contacts.json` และ `feedback.json`)
- รองรับ pagination สำหรับการดึงข้อมูลติดต่อ
- แสดงสถิติความคิดเห็น (เช่น ค่าเฉลี่ย rating)
- มีหน้าเว็บสำหรับส่งฟอร์มและดูผลลัพธ์ API

## เทคโนโลยีที่ใช้
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Dependencies**: express, cors, express-rate-limit
- **การเก็บข้อมูล**: JSON files (`data/contacts.json`, `data/feedback.json`)

## โครงสร้างโฟลเดอร์
```
lab-4-3-contact-form/
├── package.json           # การตั้งค่าโปรเจ็กต์และ dependencies
├── README.md             # เอกสารนี้
├── server.js             # ไฟล์หลักสำหรับรันเซิร์ฟเวอร์
├── data/
│   ├── contacts.json     # เก็บข้อมูลฟอร์มติดต่อ
│   └── feedback.json     # เก็บข้อมูลฟอร์มความคิดเห็น
├── middleware/
│   ├── validation.js     # ตรวจสอบข้อมูลฟอร์ม (server-side)
│   └── fileManager.js    # จัดการไฟล์ JSON
├── routes/
│   ├── contact.js        # API endpoints สำหรับฟอร์มติดต่อ
│   └── feedback.js       # API endpoints สำหรับฟอร์มความคิดเห็น
└── public/
    ├── index.html        # หน้าเว็บหลัก
    ├── style.css         # สไตล์สำหรับหน้าเว็บ
    └── script.js         # JavaScript สำหรับ frontend
```

## การติดตั้ง
1. **ติดตั้ง Node.js**: ตรวจสอบว่าได้ติดตั้ง Node.js (แนะนำ v14 หรือสูงกว่า)
2. **Clone โปรเจ็กต์**:
   ```bash
   git clone <repository-url>
   cd lab-4-3-contact-form
   ```
3. **ติดตั้ง Dependencies**:
   ```bash
   npm install
   ```
   หรือใช้คำสั่งต่อไปนี้เพื่อติดตั้ง dependencies ที่จำเป็น:
   ```bash
   npm init -y
   npm install express
   npm install --save-dev nodemon
   ```

4. **ตรวจสอบไฟล์ JSON**:
   - ตรวจสอบว่าโฟลเดอร์ `data/` มีไฟล์ `contacts.json` และ `feedback.json`
   - หากไม่มี สร้างไฟล์ด้วยเนื้อหา `[]` (array ว่าง)

## การรันโปรเจ็กต์
1. รันเซิร์ฟเวอร์:
   ```bash
   node server.js
   ```
2. เซิร์ฟเวอร์จะทำงานที่ `http://localhost:3000`
3. เข้าถึงหน้าเว็บที่ `http://localhost:3000`
4. เข้าถึง API documentation ที่ `http://localhost:3000/api/docs`

## การใช้งาน API

### Endpoints
1. **POST /api/contact**
   - **คำอธิบาย**: บันทึกข้อมูลจากฟอร์มติดต่อ
   - **Required Fields**: name, email, subject, message
   - **Optional Fields**: phone, company
   - **ตัวอย่าง Request**:
     ```json
     {
       "name": "ชื่อผู้ติดต่อ",
       "email": "user@example.com",
       "subject": "หัวข้อ",
       "message": "ข้อความยาวอย่างน้อย 10 ตัวอักษร",
       "phone": "0123456789",
       "company": "บริษัท"
     }
     ```
   - **ตัวอย่าง Response**:
     ```json
     {
       "success": true,
       "message": "Contact data saved successfully",
       "data": {
         "id": "1635781234567-abc123xyz",
         "name": "ชื่อผู้ติดต่อ",
         "email": "user@example.com",
         "subject": "หัวข้อ",
         "message": "ข้อความยาวอย่างน้อย 10 ตัวอักษร",
         "phone": "0123456789",
         "company": "บริษัท",
         "createdAt": "2025-10-01T13:14:00.000Z"
       }
     }
     ```

2. **GET /api/contact**
   - **คำอธิบาย**: ดึงข้อมูลติดต่อทั้งหมด (มี pagination)
   - **Parameters**:
     - `page` (default: 1)
     - `limit` (default: 10)
   - **ตัวอย่าง Request**: `GET /api/contact?page=1&limit=10`
   - **ตัวอย่าง Response**:
     ```json
     {
       "success": true,
       "message": "Contacts retrieved successfully",
       "data": [
         { "id": "...", "name": "...", ... },
         ...
       ],
       "pagination": {
         "currentPage": 1,
         "itemsPerPage": 10,
         "totalItems": 25,
         "totalPages": 3
       }
     }
     ```

3. **POST /api/feedback**
   - **คำอธิบาย**: บันทึกความคิดเห็น
   - **Required Fields**: rating (1-5), comment
   - **Optional Fields**: email
   - **ตัวอย่าง Request**:
     ```json
     {
       "rating": 4,
       "comment": "บริการดีมาก",
       "email": "user@example.com"
     }
     ```
   - **ตัวอย่าง Response**:
     ```json
     {
       "success": true,
       "message": "Feedback saved successfully",
       "data": {
         "id": "1635781234567-xyz789abc",
         "rating": 4,
         "comment": "บริการดีมาก",
         "email": "user@example.com",
         "createdAt": "2025-10-01T13:14:00.000Z"
       }
     }
     ```

4. **GET /api/feedback/stats**
   - **คำอธิบาย**: ดึงสถิติความคิดเห็น
   - **ตัวอย่าง Response**:
     ```json
     {
       "success": true,
       "message": "Feedback statistics retrieved successfully",
       "stats": {
         "totalFeedback": 10,
         "averageRating": 4.20,
         "ratingDistribution": {
           "1": 1,
           "2": 0,
           "3": 2,
           "4": 4,
           "5": 3
         }
       }
     }
     ```

5. **GET /api/status**
   - **คำอธิบาย**: ตรวจสอบสถานะ API และจำนวนข้อมูล
   - **ตัวอย่าง Response**:
     ```json
     {
       "success": true,
       "status": "API is running",
       "timestamp": "2025-10-01T13:14:00.000Z",
       "stats": {
         "contactsCount": 25,
         "feedbackCount": 10
       }
     }
     ```

6. **GET /api/docs**
   - **คำอธิบาย**: ดึง API documentation
   - **ตัวอย่าง Response**: รายละเอียด endpoints และ fields

## การใช้งานหน้าเว็บ
1. เปิด `http://localhost:3000` ในเบราว์เซอร์
2. **ฟอร์มติดต่อ**:
   - กรอกข้อมูล (name, email, subject, message, phone, company)
   - มี real-time validation แสดงข้อผิดพลาดทันที
   - กด "ส่งข้อความ" เพื่อบันทึกข้อมูล
3. **ฟอร์มความคิดเห็น**:
   - เลือก rating (1-5) และกรอก comment (email เป็น optional)
   - มี real-time validation
   - กด "ส่งความคิดเห็น" เพื่อบันทึก
4. **ทดสอบ API**:
   - หน้าเว็บมีปุ่มสำหรับเรียก `GET /api/contact`, `/api/feedback/stats`, `/api/status`, และ `/api/docs`
   - ผลลัพธ์จะแสดงในส่วน API Results เป็น JSON

## การจำกัดการใช้งาน
- ใช้ `express-rate-limit` จำกัด 10 requests ต่อ 15 นาทีต่อ IP สำหรับ API routes
- ข้อมูล JSON input ถูกจำกัดขนาดที่ 1MB

## การพัฒนาเพิ่มเติม
- เพิ่มการ authentication สำหรับ endpoint `GET /api/contact`
- เพิ่มการ backup ข้อมูล JSON
- ปรับปรุง UI/UX ของหน้าเว็บ
- เพิ่ม unit tests สำหรับ API endpoints

## การแก้ปัญหา
- **ไฟล์ JSON ไม่พบ**: ตรวจสอบว่า `data/contacts.json` และ `data/feedback.json` มีอยู่และเป็น array ว่าง `[]`
- **CORS error**: ตรวจสอบว่าเซิร์ฟเวอร์รันที่ `http://localhost:3000`
- **Rate limit error**: รอ 15 นาทีหรือเปลี่ยน IP หากเกิน 10 requests

## ผู้พัฒนา
สร้างโดย [Your Name] สำหรับ [Course/Project Name]