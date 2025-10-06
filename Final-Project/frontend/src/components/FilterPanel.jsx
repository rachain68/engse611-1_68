function FilterPanel({ onFilterChange, filters }) {
  const categories = [
    'ทั้งหมด',
    'อาหารไทย',
    'อาหารญี่ปุ่น',
    'อาหารอิตาเลียน',
    'อาหารจีน',
    'ฟาสต์ฟู้ด'
  ];

  const handleCategoryChange = (category) => {
    onFilterChange({
      category: category === 'ทั้งหมด' ? '' : category
    });
  };

  // ========================================
  // TODO 1: เพิ่มฟังก์ชัน handleRatingChange
  // ========================================
  // รับ parameter minRating
  // เรียก onFilterChange({ minRating: minRating || '' })

  const handleRatingChange = (minRating) => {
    onFilterChange({ minRating: minRating || '' })
  };
  // ========================================
  // TODO 2: เพิ่มฟังก์ชัน handlePriceChange
  // ========================================
  // รับ parameter priceRange
  // เรียก onFilterChange({ priceRange: priceRange || '' })
  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange: priceRange || '' })
  };

  // Sorting handlers
  const handleSortByChange = (sortBy) => {
    onFilterChange({ sortBy: sortBy || '' });
  };

  const handleSortOrderChange = (order) => {
    onFilterChange({ order: order || '' });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">     {/*  Sorting controls  */}
        <label>เรียงตาม:</label>
        <select value={filters.sortBy || ''} onChange={(e) => handleSortByChange(e.target.value)}>
          <option value="">🔄ค่าเริ่มต้น</option>
          <option value="name">🔤ตัวอักษร</option>
          <option value="rating">👍ตัวเลือกแนะนำ</option>
          <option value="price">💰ราคา</option>
          <option value="reviews">💬รีวิว</option>
        </select>
      </div>

      <div className="filter-group">
        <label>จาก:</label>
        <select value={filters.order || 'asc'} onChange={(e) => handleSortOrderChange(e.target.value)}>
          <option value="asc">📉จากน้อยไปมาก</option>
          <option value="desc">📈จากมากไปน้อย</option>
        </select>
      </div>

      <div className="filter-group">
        <label>หมวดหมู่:</label>
        <select
          value={filters.category || 'ทั้งหมด'}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* ========================================
          TODO 3: เพิ่ม filter สำหรับ minRating
          ======================================== */}

      <div className="filter-group">
        <label>คะแนนขั้นต่ำ:</label>
        <select
          value={filters.minRating || ''}
          onChange={(e) => handleRatingChange(e.target.value)}
        >
          <option value="">🌟 ทั้งหมด</option>
          <option value="4">⭐⭐⭐⭐ขึ้นไป</option>
          <option value="3">⭐⭐⭐ขึ้นไป</option>
          <option value="2">⭐⭐ขึ้นไป</option>
        </select>
      </div>
      {/* ========================================
          TODO 4: เพิ่ม filter สำหรับ priceRange
          ======================================== */}

      <div className="filter-group">
        <label>ช่วงราคา:</label>
        <select
          value={filters.priceRange || ''}
          onChange={(e) => handlePriceChange(e.target.value)}
        >
          <option value="">💸ทุกช่วงราคา</option>
          <option value="1">🪙ต่ำกว่า ฿100</option>
          <option value="2">💵฿100 – ฿300</option>
          <option value="3">💰มากกว่า ฿300</option>
        </select>
      </div>

    </div>
  );
}

export default FilterPanel;