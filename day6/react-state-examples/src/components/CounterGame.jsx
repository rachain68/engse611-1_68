import React, { useState, useEffect } from 'react';

function CounterGame() {
  // Game States
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [clickStreak, setClickStreak] = useState(0);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // ฟังก์ชันเริ่มเกม
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setMultiplier(1);
    setClickStreak(0);
    setIsGameActive(true);
  };

  // ฟังก์ชันเพิ่มคะแนน
  const addScore = (points) => {
    if (!isGameActive) return;

    const newScore = score + (points * multiplier);
    const newStreak = clickStreak + 1;
    
    setScore(newScore);
    setClickStreak(newStreak);

    // เลเวลอัพ
    const newLevel = Math.floor(newScore / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setMultiplier(1 + (newLevel - 1) * 0.5);
    }

    // Streak bonus
    if (newStreak % 10 === 0) {
      setScore(prev => prev + 50); // Bonus!
    }

    // อัพเดท High Score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  // จบเกม
  const endGame = () => {
    setIsGameActive(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">
        เกมนับคะแนน (Complex State Logic)
      </h2>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-gray-600">คะแนน</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{highScore}</div>
          <div className="text-sm text-gray-600">คะแนนสูงสุด</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">Lv.{level}</div>
          <div className="text-sm text-gray-600">เลเวล</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{timeLeft}s</div>
          <div className="text-sm text-gray-600">เวลาเหลือ</div>
        </div>
      </div>

      {/* Multiplier & Streak */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-yellow-600">×{multiplier.toFixed(1)}</div>
          <div className="text-xs text-gray-600">ตัวคูณ</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-red-600">{clickStreak}</div>
          <div className="text-xs text-gray-600">คลิกต่อเนื่อง</div>
        </div>
      </div>

      {/* Game Controls */}
      {!isGameActive ? (
        <div className="text-center mb-6">
          <button
            onClick={startGame}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-xl"
          >
            🎮 เริ่มเกม
          </button>
          {score > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-bold">เกมจบแล้ว!</p>
              <p>คะแนนรวม: <span className="text-purple-600 font-bold">{score}</span></p>
              <p>เลเวลสูงสุด: <span className="text-green-600 font-bold">{level}</span></p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => addScore(1)}
              className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg"
            >
              +1 คะแนน
            </button>
            <button
              onClick={() => addScore(5)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold text-lg"
            >
              +5 คะแนน
            </button>
          </div>
          <button
            onClick={() => addScore(10)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-bold text-lg"
          >
            +10 คะแนน (โบนัส!)
          </button>
          <button
            onClick={endGame}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
          >
            หยุดเกม
          </button>
        </div>
      )}

      {/* Game Rules */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-2">📖 กติกา:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• คลิกปุ่มเพื่อเก็บคะแนนภายใน 30 วินาที</li>
          <li>• ทุก 100 คะแนน = เลเวลอัพ + ตัวคูณเพิ่ม</li>
          <li>• คลิกต่อเนื่อง 10 ครั้ง = โบนัส 50 คะแนน</li>
          <li>• พยายามทำคะแนนสูงสุด!</li>
        </ul>
      </div>

      {/* State Debug Info */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm font-bold mb-2">🔧 Complex States:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>score: {score}</div>
          <div>level: {level}</div>
          <div>timeLeft: {timeLeft}</div>
          <div>isGameActive: {isGameActive.toString()}</div>
          <div>multiplier: {multiplier}</div>
          <div>clickStreak: {clickStreak}</div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Timer + Conditions + State Machine + useEffect
        </p>
      </div>
    </div>
  );
}

export default CounterGame;