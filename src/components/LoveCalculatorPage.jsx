import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function LoveCalculatorPage({ birthdayChoices }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showInfinity, setShowInfinity] = useState(false);

  const runInfinityCelebration = () => {
    // Continuous light confetti shower
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 10 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      // Confetti source points
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setErrorMsg('Please enter a value first! 💕');
      return;
    }

    setIsCalculating(true);
    setErrorMsg('');

    // Simulate standard checking, then throw a cute error
    setTimeout(() => {
      setErrorMsg('❌ SYSTEM ERROR: The value entered is too small. Stack overflow detected because Jeevana\'s love capacity is too large!');
      
      // Keep error visible for 2.5 seconds, then transition to infinity!
      setTimeout(() => {
        setIsCalculating(false);
        setShowInfinity(true);
        runInfinityCelebration();
      }, 2500);
    }, 1200);
  };

  // Pre-fill WhatsApp message link
  const getWhatsAppLink = () => {
    const baseText = `Hey Jeevana! I finished the quiz. 💖\nIt turns out you love me to INFINITY! ♾️✨\n\nFor the trip, I'd love to:\n👉 ${birthdayChoices || 'Spend time together'}`;
    const encodedText = encodeURIComponent(baseText);
    return `https://wa.me/?text=${encodedText}`;
  };

  if (showInfinity) {
    return (
      <div className="glass-container infinity-container fade-transition" style={{ maxWidth: '600px' }}>
        <span className="infinity-symbol">♾️</span>
        <h1 className="infinity-title">jeevana Loves You Infinity! ❤️</h1>
        
        <p className="subtitle" style={{ fontSize: '1.25rem', color: '#ff4071', fontWeight: 'bold' }}>
          Numbers cannot measure it, limits cannot contain it.
        </p>

        <div className="sweet-letter">
          Hi puttu, no matter what number you entered, there is no limit to how much I love you. 
          You made my life brighter, and I can't wait to go to trip together!
          <br /><br />
          <strong>Plan Confirmed puttu:</strong><br />
          ✨ {birthdayChoices || "We'll figure out a perfect plan!"}
        </div>

        <a 
          href={getWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cute-btn"
          style={{ animation: 'pulse 1.5s infinite ease-in-out' }}
        >
          Send my choices to baby 💌
        </a>
      </div>
    );
  }

  return (
    <div className="glass-container fade-transition">
      <h1>Love Calculator 💘</h1>
      <p className="subtitle">
        One final question: How much do you think Jeevana loves you? Enter your estimate below!
      </p>

      <form onSubmit={handleCalculate} className="love-input-container">
        <div className="cute-input-wrapper">
          <input
            type="text"
            placeholder="e.g. 100%, 1000000, to the moon and back"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isCalculating}
            className="cute-input"
            required
          />
        </div>

        {errorMsg && (
          <div className="error-box">
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isCalculating}
          className="cute-btn"
        >
          {isCalculating ? 'Computing Love Index... 🧠' : 'Calculate Love 💖'}
        </button>
      </form>
    </div>
  );
}
