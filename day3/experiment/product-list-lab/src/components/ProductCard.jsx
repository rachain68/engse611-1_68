import React from 'react';
import PropTypes from 'prop-types';
// import 'ProductList.css';

function ProductCard({ product, onAddToCart, onViewDetails }) {
    const {
        id,
        name,
        image,
        description,
        price,
        originalPrice,
        discount,
        inStock,
        rating,
    } = product;

    // ⭐ ฟังก์ชันแสดงดาว
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < fullStars; i++) stars.push("⭐");
        if (hasHalfStar) stars.push("✩"); // ใช้เป็นครึ่งดาว
        for (let i = 0; i < emptyStars; i++) stars.push("☆");

        return stars.join(" ");
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={image}
                    alt={name}
                    onError={(e) => {
                        e.target.src =
                            'https://placehold.co/300x300/cccccc/666666?text=No+Image';
                    }}
                />
            </div>

            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-description">{description}</p>

                {/* ✅ แสดงดาวและคะแนน */}
                <div className="product-rating">
                    <span>{renderStars(rating)}</span> <span>({rating})</span>
                </div>

                <div className="product-price">
                    ฿{price.toLocaleString()}
                    {discount > 0 && (
                        <>
                            <span className="original-price">
                                ฿{originalPrice.toLocaleString()}
                            </span>
                            <span className="discount">-{discount}%</span>
                        </>
                    )}
                </div>

                <div className="product-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={() => onViewDetails(product)}
                    >
                        ดูรายละเอียด
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}
                        disabled={!inStock}
                    >
                        {inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ✅ PropTypes ตรวจสอบรูปแบบข้อมูล
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number,
        discount: PropTypes.number,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        inStock: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default ProductCard;

