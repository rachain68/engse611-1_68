import React, { useState } from 'react';

function TodoList() {
  // State เก็บรายการงาน (Array of Objects)
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียน React.js', completed: false },
    { id: 2, text: 'ทำการบ้าน HTML', completed: true },
    { id: 3, text: 'ดู YouTube CSS', completed: false }
  ]);

  // State เก็บข้อความใหม่
  const [newTodo, setNewTodo] = useState('');

  // ฟังก์ชันเพิ่มงานใหม่
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, { 
        id: newId, 
        text: newTodo.trim(), 
        completed: false 
      }]);
      setNewTodo('');
    }
  };

  // ฟังก์ชันลบงาน
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // ฟังก์ชันเปลี่ยนสถานะงาน
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // คำนวณสถิติ
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
        รายการงาน (Array State)
      </h2>

      {/* สถิติ */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-gray-600">งานทั้งหมด</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">เสร็จแล้ว</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</div>
            <div className="text-sm text-gray-600">ยังไม่เสร็จ</div>
          </div>
        </div>
      </div>
      
      {/* ฟอร์มเพิ่มงาน */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="เพิ่มงานใหม่..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={addTodo}
          disabled={!newTodo.trim()}
          className={`px-4 py-3 rounded-lg font-medium ${
            newTodo.trim()
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          เพิ่ม
        </button>
      </div>
      
      {/* รายการงาน */}
      <div className="space-y-2 mb-6">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>Array State:</strong> todos.length = {todos.length}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          เพิ่ม → [...todos, newItem] | ลบ → filter() | แก้ไข → map()
        </p>
      </div>
    </div>
  );
}

export default TodoList;