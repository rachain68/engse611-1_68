// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' },
    { id: 'home', name: 'ของใช้ในบ้าน' },
    { id: 'sports', name: 'กีฬา' }
];

export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 49900,
        discount: 8,
        image: 'https://placehold.co/300x300/007bff/ffffff?text=iPhone+15',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 5.0
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้าฝ้าย',
        category: 'clothing',
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: 'https://placehold.co/300x300/ffc107/000000?text=T-Shirt',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 3.5
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: 'https://placehold.co/300x300/17a2b8/ffffff?text=React+Book',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    {
        id: 4,
        name: 'หูฟังไร้สาย Bluetooth',
        category: 'electronics',
        price: 1490,
        originalPrice: 1990,
        discount: 25,
        image: 'https://placehold.co/300x300/6f42c1/ffffff?text=Headphones',
        description: 'หูฟังไร้สายคุณภาพสูง เชื่อมต่อ Bluetooth 5.0',
        inStock: true,
        rating: 3.9
    },
    {
        id: 5,
        name: 'กางเกงยีนส์ Slim Fit',
        category: 'clothing',
        price: 890,
        originalPrice: 1290,
        discount: 31,
        image: 'https://placehold.co/300x300/20c997/ffffff?text=Jeans',
        description: 'กางเกงยีนส์ทรงสลิม ใส่สบายทุกโอกาส',
        inStock: true,
        rating: 2.9
    },
    {
        id: 6,
        name: 'โต๊ะไม้โอ๊ค',
        category: 'home',
        price: 2990,
        originalPrice: 3990,
        discount: 25,
        image: 'https://placehold.co/300x300/fd7e14/ffffff?text=Table',
        description: 'โต๊ะไม้โอ๊คแท้ แข็งแรง ทนทาน ใช้งานได้หลายปี',
        inStock: true,
        rating: 2.8
    },
    {
        id: 7,
        name: 'รองเท้าวิ่ง Nike Air Zoom',
        category: 'sports',
        price: 3590,
        originalPrice: 4290,
        discount: 16,
        image: 'https://placehold.co/300x300/d63384/ffffff?text=Running+Shoes',
        description: 'รองเท้าวิ่งสำหรับนักกีฬา รองรับแรงกระแทกดีเยี่ยม',
        inStock: true,
        rating: 4.1
    },
    {
        id: 8,
        name: 'หม้อทอดไร้น้ำมัน',
        category: 'home',
        price: 1890,
        originalPrice: 2490,
        discount: 24,
        image: 'https://placehold.co/300x300/198754/ffffff?text=Air+Fryer',
        description: 'หม้อทอดไร้น้ำมันเพื่อสุขภาพ ใช้งานง่าย ทำอาหารได้หลากหลาย',
        inStock: false,
        rating: 4.5
    }
];
