# Food API

A simple Node.js-based REST API for managing and querying Thai food data, built with Express.js. This API supports searching and filtering food items based on various criteria such as name, category, spiciness, vegetarian status, availability, and price.

## Project Structure

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

## Setup Instructions

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm (Node Package Manager)

2. **Installation**
   ```bash
   # Clone the repository (if applicable)
   git clone <repository-url>
   cd lab-4-2-food-api

   # Install dependencies
   npm install
   ```

3. **Running the API**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable.

4. **Accessing the API**
   - API root: `http://localhost:3000/`
   - Documentation: `http://localhost:3000/api/docs`
   - Food endpoints: `http://localhost:3000/api/foods`

## API Endpoints

### GET `/`
Returns a welcome message with available endpoints.

**Response Example**:
```json
{
  "message": "🍜 Welcome to Food API!",
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
Retrieves a list of foods with optional filtering.

**Query Parameters**:
- `search`: Search by food name or description (case-insensitive).
- `category`: Filter by food category (e.g., "แกง", "ยำ").
- `maxSpicy`: Filter foods with spiciness level up to the specified value (e.g., `3`).
- `vegetarian`: Filter vegetarian foods (`true` or `false`).
- `available`: Filter available foods (`true` or `false`).
- `maxPrice`: Filter foods with price up to the specified value.

**Example**:
```
GET /api/foods?category=แกง&maxSpicy=3&vegetarian=false
```

**Response Example**:
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
Retrieves a specific food by its ID.

**Example**:
```
GET /api/foods/1
```

**Response Example**:
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
Retrieves all foods in a specific category.

**Example**:
```
GET /api/foods/category/ยำ
```

**Response Example**:
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
Returns a random food item.

**Response Example**:
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
Returns API documentation with endpoint details.

### GET `/api/stats`
Returns statistics about the food data (total foods, category counts, etc.).

**Response Example**:
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

## Error Handling

- **404 Not Found**: Returned when an endpoint or resource is not found.
  ```json
  {
    "success": false,
    "message": "API endpoint not found",
    "requestedUrl": "/invalid-route"
  }
  ```
- **500 Internal Server Error**: Returned when there's an error processing the request.

## Dependencies

- express
- cors
- fs (Node.js built-in)
- path (Node.js built-in)

## Notes

- The API uses `foods.json` as the data source, located in the `data/` directory.
- All filtering is case-insensitive for `search` and `category` parameters.
- The API includes a logger middleware (`middleware/logger.js`) to log requests.
- Static files are served from the `public/` directory, including `index.html`.

## Testing the API

You can test the API using tools like:
- Postman
- cURL
- Browser (for GET requests)

**Example cURL command**:
```bash
curl http://localhost:3000/api/foods?category=แกง&maxSpicy=3
```

## Contributing

Feel free to submit issues or pull requests to improve the API. Ensure any changes are tested and maintain the existing structure.