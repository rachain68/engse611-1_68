import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');

    // ✅ Filtering + Sorting รวมกัน
    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                // filter by category
                if (selectedCategory !== 'all' && product.category !== selectedCategory) {
                    return false;
                }
                // filter by search query (ใน name และ description)
                const query = searchQuery.toLowerCase();
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                );
            })
            .sort((a, b) => {
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                }
                if (sortBy === 'price') {
                    return a.price - b.price;
                }
                if (sortBy === 'rating') {
                    return b.rating - a.rating; // rating มากอยู่ก่อน
                }
                return 0;
            });
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <div className="product-list-container">
            {/* Header */}
            <div className="header">
                <h1>🛍️ ร้านค้าออนไลน์</h1>
                <p>Lab 3.2 - การสร้าง Components และ Props</p>
            </div>

            {/* Controls */}
            <div className="filters">
                {/* Category Filter */}
                <label htmlFor="category-select">หมวดหมู่: </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Search Box */}
                <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Sort Dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="name">เรียงตามชื่อ</option>
                    <option value="price">เรียงตามราคา</option>
                    <option value="rating">เรียงตามคะแนน</option>
                </select>
            </div>

            {/* Products Display */}
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onViewDetails={onViewDetails}
                        />
                    ))
                ) : (
                    <p className="empty-state">ไม่พบสินค้า</p>
                )}
            </div>
        </div>
    );
}

// ✅ ปรับปรุง PropTypes ให้ละเอียดขึ้น
ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            originalPrice: PropTypes.number.isRequired,
            discount: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            inStock: PropTypes.bool.isRequired,
            rating: PropTypes.number.isRequired,
        })
    ).isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default ProductList;
