import React, { useState } from 'react';

function SimpleCalculator() {
  // Multiple States ทำงานร่วมกัน
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // ฟังก์ชันคำนวณ
  const calculate = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    
    if (isNaN(num1) || isNaN(num2)) {
      alert('กรุณาใส่ตัวเลขที่ถูกต้อง');
      return;
    }

    let calcResult;
    switch (operator) {
      case '+':
        calcResult = num1 + num2;
        break;
      case '-':
        calcResult = num1 - num2;
        break;
      case '*':
        calcResult = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          alert('ไม่สามารถหารด้วย 0 ได้');
          return;
        }
        calcResult = num1 / num2;
        break;
      default:
        return;
    }

    setResult(calcResult);
    
    // เพิ่มลงประวัติ
    const calculation = `${num1} ${operator} ${num2} = ${calcResult}`;
    setHistory([calculation, ...history.slice(0, 4)]); // เก็บแค่ 5 รายการล่าสุด
  };

  // ฟังก์ชันล้างข้อมูล
  const clear = () => {
    setNumber1('');
    setNumber2('');
    setOperator('+');
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
        เครื่องคิดเลข (Multiple States)
      </h2>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="ตัวเลขที่ 1"
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl"
        />

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl"
        >
          <option value="+">+ บวก</option>
          <option value="-">- ลบ</option>
          <option value="*">× คูณ</option>
          <option value="/">÷ หาร</option>
        </select>

        <input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          placeholder="ตัวเลขที่ 2"
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={calculate}
          disabled={!number1 || !number2}
          className={`py-3 rounded-lg font-bold text-xl ${
            number1 && number2
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          คำนวณ
        </button>

        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold text-xl"
        >
          ล้าง
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">ผลลัพธ์:</div>
            <div className="text-3xl font-bold text-green-600">
              {result.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-800">ประวัติการคำนวณ:</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-700"
            >
              ล้างประวัติ
            </button>
          </div>
          <div className="space-y-1">
            {history.map((calc, index) => (
              <div key={index} className="text-sm text-blue-700 font-mono">
                {calc}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Debug Info */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>States:</strong>
        </p>
        <ul className="text-xs text-gray-600 mt-1 space-y-1">
          <li>number1 = "{number1}"</li>
          <li>number2 = "{number2}"</li>
          <li>operator = "{operator}"</li>
          <li>result = {result}</li>
          <li>history.length = {history.length}</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          หลาย States ทำงานร่วมกัน + Validation + History
        </p>
      </div>
    </div>
  );
}

export default SimpleCalculator;