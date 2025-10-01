# Food API

API แบบ REST ที่พัฒนาด้วย Node.js และ Express.js สำหรับจัดการและค้นหาข้อมูลอาหารไทย รองรับการค้นหาและกรองข้อมูลตามชื่อ, หมวดหมู่, ระดับความเผ็ด, สถานะมังสวิรัติ, ความพร้อมให้บริการ, และราคา

## โครงสร้างโปรเจกต์

```
lab-4-2-food-api/
├── package.json
├── README.md
├── server.js
├── data/
│   └── foods.json
├── routes/
│   └── foods.js
├── middleware/
│   └── logger.js
└── public/
    └── index.html
```

## ขั้นตอนการติดตั้ง

1. **ความต้องการของระบบ**
   - Node.js (เวอร์ชัน 14 หรือสูงกว่า)
   - npm (Node Package Manager)

2. **การติดตั้ง**
   ```bash
   cd lab-4-2-food-api

   # ติดตั้ง dependencies
   npm install
   ```

3. **รัน API**
   ```bash
   npm start
   ```
   เซิร์ฟเวอร์จะทำงานที่ `http://localhost:3000` โดยค่าเริ่มต้น สามารถเปลี่ยนพอร์ตได้โดยตั้งค่า environment variable `PORT`

4. **การเข้าถึง API**
   - หน้าแรก: `http://localhost:3000/`
   - เอกสาร API: `http://localhost:3000/api/docs`
   - Endpoints อาหาร: `http://localhost:3000/api/foods`

## Endpoints ของ API

### GET `/`
ส่งคืนข้อความต้อนรับพร้อมรายการ endpoints ที่ใช้งานได้

**ตัวอย่าง Response**:
```json
{
  "message": "🍜 ยินดีต้อนรับสู่ Food API!",
  "version": "1.0.0",
  "endpoints": {
    "foods": "/api/foods",
    "search": "/api/foods?search=ผัด",
    "category": "/api/foods?category=แกง",
    "spicy": "/api/foods?maxSpicy=3",
    "vegetarian": "/api/foods?vegetarian=true",
    "documentation": "/api/docs"
  }
}
```

### GET `/api/foods`
ดึงรายการอาหารทั้งหมดพร้อมตัวเลือกการกรอง

**Query Parameters**:
- `search`: ค้นหาจากชื่อหรือคำอธิบายอาหาร (ไม่สนใจตัวพิมพ์ใหญ่-เล็ก)
- `category`: กรองตามหมวดหมู่ (เช่น "แกง", "ยำ")
- `maxSpicy`: กรองอาหารที่มีระดับความเผ็ดไม่เกินค่าที่ระบุ (เช่น `3`)
- `vegetarian`: กรองอาหารมังสวิรัติ (`true` หรือ `false`)
- `available`: กรองอาหารที่พร้อมเสิร์ฟ (`true` หรือ `false`)
- `maxPrice`: กรองอาหารที่มีราคาไม่เกินค่าที่ระบุ

**ตัวอย่าง**:
```
GET /api/foods?category=แกง&maxSpicy=3&vegetarian=false
```

**ตัวอย่าง Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "name": "แกงเขียวหวานไก่",
      "category": "แกง",
      "price": 150,
      "description": "แกงเขียวหวานรสชาติเข้มข้น",
      "spicyLevel": 3,
      "vegetarian": false,
      "available": false,
      "cookingTime": 25,
      "ingredients": ["ไก่", "พริกเขียว", "กะทิ", "มะเขือ", "ใบโหระพา"]
    }
  ],
  "total": 1,
  "filters": {
    "search": null,
    "category": "แกง",
    "maxSpicy": "3",
    "vegetarian": "false",
    "available": null,
    "maxPrice": null
  }
}
```

### GET `/api/foods/:id`
ดึงข้อมูลอาหารตาม ID

**ตัวอย่าง**:
```
GET /api/foods/1
```

**ตัวอย่าง Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "ผัดไทย",
    "category": "อาหารจานเดียว",
    "price": 120,
    "description": "เส้นหมี่ผัดรสเปรี้ยวหวาน",
    "spicyLevel": 2,
    "vegetarian": false,
    "available": true,
    "cookingTime": 15,
    "ingredients": ["เส้นหมี่", "กุ้ง", "ไข่", "ถั่วงอก", "หัวไชโป๊ว"]
  }
}
```

### GET `/api/foods/category/:category`
ดึงอาหารทั้งหมดในหมวดหมู่ที่ระบุ

**ตัวอย่าง**:
```
GET /api/foods/category/ยำ
```

**ตัวอย่าง Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 4,
      "name": "ส้มตำ",
      "category": "ยำ",
      "price": 80,
      "description": "ส้มตำไทยแท้รสจัดจ้าน",
      "spicyLevel": 5,
      "vegetarian": true,
      "available": true,
      "cookingTime": 10,
      "ingredients": ["มะละกอ", "มะเขือเทศ", "ถั่วฝักยาว", "พริกขี้หนู"]
    }
  ],
  "total": 1,
  "category": "ยำ"
}
```

### GET `/api/foods/random`
ส่งคืนอาหาร 1 รายการแบบสุ่ม

**ตัวอย่าง Response**:
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "มะม่วงข้าวเหนียว",
    "category": "ของหวาน",
    "price": 90,
    "description": "ของหวานไทยคลาสสิค",
    "spicyLevel": 0,
    "vegetarian": true,
    "available": true,
    "cookingTime": 5,
    "ingredients": ["มะม่วง", "ข้าวเหนียว", "กะทิ", "เกลือ", "น้ำตาล"]
  }
}
```

### GET `/api/docs`
ส่งคืนเอกสาร API พร้อมรายละเอียด endpoints

**ตัวอย่าง Response**:
```json
{
  "title": "Food API Documentation",
  "version": "1.0.0",
  "description": "API สำหรับข้อมูลอาหารไทย พร้อมฟังก์ชันการค้นหาและกรองข้อมูล",
  "endpoints": [
    {
      "method": "GET",
      "path": "/api/foods",
      "description": "ดึงข้อมูลอาหารทั้งหมด",
      "queryParams": [
        {
          "name": "search",
          "description": "ค้นหาตามชื่ออาหาร (เช่น ?search=ผัด)"
        },
        {
          "name": "category",
          "description": "กรองตามหมวดหมู่ (เช่น ?category=แกง)"
        },
        {
          "name": "maxSpicy",
          "description": "กรองตามระดับความเผ็ดสูงสุด (เช่น ?maxSpicy=3)"
        },
        {
          "name": "vegetarian",
          "description": "กรองอาหารมังสวิรัติ (true/false, เช่น ?vegetarian=true)"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/api/foods/:id",
      "description": "ดึงข้อมูลอาหารตาม ID (เช่น /api/foods/1)"
    },
    {
      "method": "GET",
      "path": "/api/docs",
      "description": "ดึงเอกสาร API นี้"
    },
    {
      "method": "GET",
      "path": "/api/stats",
      "description": "ดึงสถิติข้อมูลอาหาร"
    }
  ],
  "notes": "API นี้ใช้ข้อมูลจาก foods.json และรองรับการค้นหาแบบ case-insensitive สำหรับ search และ category."
}
```

### GET `/api/stats`
ส่งคืนสถิติเกี่ยวกับข้อมูลอาหาร เช่น จำนวนเมนูทั้งหมด, จำนวนตามหมวดหมู่, เป็นต้น

**ตัวอย่าง Response**:
```json
{
  "totalFoods": 5,
  "categories": {
    "อาหารจานเดียว": 1,
    "แกง": 2,
    "ยำ": 1,
    "ของหวาน": 1
  },
  "spicyLevels": {
    "0": 1,
    "2": 1,
    "3": 1,
    "4": 1,
    "5": 1
  },
  "vegetarianCount": 2,
  "availableCount": 4,
  "averagePrice": "128.00",
  "averageCookingTime": "15.00"
}
```

## การจัดการข้อผิดพลาด

- **404 Not Found**: ส่งคืนเมื่อไม่พบ endpoint หรือข้อมูล
  ```json
  {
    "success": false,
    "message": "API endpoint not found",
    "requestedUrl": "/invalid-route"
  }
  ```
- **500 Internal Server Error**: ส่งคืนเมื่อเกิดข้อผิดพลาดในการประมวลผล

## Dependencies

- express
- cors
- fs (built-in ใน Node.js)
- path (built-in ใน Node.js)

## หมายเหตุ

- API ใช้ `foods.json` ในโฟลเดอร์ `data/` เป็นแหล่งข้อมูล
- การกรองทั้งหมดไม่สนใจตัวพิมพ์ใหญ่-เล็กสำหรับ `search` และ `category`
- มี middleware `logger` (`middleware/logger.js`) สำหรับบันทึกข้อมูลคำขอ
- ไฟล์ static เช่น `index.html` เสิร์ฟจากโฟลเดอร์ `public/`

## การทดสอบ API

สามารถทดสอบ API ได้ด้วยเครื่องมือ เช่น:
- Postman
- cURL
- เบราว์เซอร์ (สำหรับ GET requests)

**ตัวอย่างคำสั่ง cURL**:
```bash
curl http://localhost:3000/api/foods?category=แกง&maxSpicy=3
```

## การมีส่วนร่วม

หากต้องการปรับปรุง API สามารถส่ง issue หรือ pull request ได้ กรุณาทดสอบการเปลี่ยนแปลงให้ดีและรักษาโครงสร้างเดิมไว้