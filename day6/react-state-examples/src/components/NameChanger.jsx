import React, { useState } from 'react';

function NameChanger() {
  // State เก็บชื่อที่ผู้ใช้พิมพ์
  const [name, setName] = useState('');

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">
        การเปลี่ยนข้อความ (Text State)
      </h2>
      
      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          พิมพ์ชื่อของคุณ:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      {/* แสดงผลการทักทาย */}
      <div className="text-center bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-2xl font-bold">
          {name ? (
            <span className="text-purple-600">สวัสดี {name}! 👋</span>
          ) : (
            <span className="text-gray-400">กรุณาพิมพ์ชื่อของคุณ...</span>
          )}
        </h3>
      </div>
      
      {/* ปุ่มล้างข้อมูล */}
      <div className="text-center mb-6">
        <button
          onClick={() => setName('')}
          disabled={!name}
          className={`px-4 py-2 rounded-lg font-medium ${
            name 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ล้างชื่อ
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>State:</strong> name = "{name}"
        </p>
        <p className="text-sm">
          <strong>ความยาว:</strong> {name.length} ตัวอักษร
        </p>
        <p className="text-xs text-gray-600 mt-1">
          พิมพ์ → onChange → setName() → Re-render
        </p>
      </div>
    </div>
  );
}

export default NameChanger;