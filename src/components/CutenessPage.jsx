import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function CutenessPage({ onNext }) {
  const [val, setVal] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState('Adjust the slider to your cuteness level (if you can find a limit!)');

  const runConfetti = () => {
    // Left side burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff7597', '#ffccd5', '#e0c3fc', '#ffffff']
    });
    // Right side burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff7597', '#ffccd5', '#e0c3fc', '#ffffff']
    });
  };

  const handleCalculate = () => {
    setIsAnimating(true);
    setStatusText('Analyzing facial cuteness parameters... 🔬');

    // 1. First move it up to 100 slowly
    let current = Number(val);
    const interval1 = setInterval(() => {
      if (current < 100) {
        current += 1;
        setVal(current);
      } else {
        clearInterval(interval1);
        
        // 2. Pause at 100 for suspense
        setTimeout(() => {
          setStatusText('SYSTEM OVERLOAD: Cuteness exceeds default limits! 🚨');
          
          // 3. Push it beyond to 120%!
          setTimeout(() => {
            let overflowVal = 100;
            const interval2 = setInterval(() => {
              if (overflowVal < 120) {
                overflowVal += 1;
                setVal(overflowVal);
              } else {
                clearInterval(interval2);
                setIsAnimating(false);
                setIsComplete(true);
                setStatusText('Verdict: Unbelievably cute! Scientific anomaly! 🌸💖');
                // Trigger celebratory confetti multiple times!
                runConfetti();
                const timer1 = setTimeout(runConfetti, 400);
                const timer2 = setTimeout(runConfetti, 800);
                return () => {
                  clearTimeout(timer1);
                  clearTimeout(timer2);
                };
              }
            }, 50);
          }, 1000);
        }, 800);
      }
    }, 20);
  };

  const maxVal = isAnimating || isComplete ? 120 : 100;
  const fillPercent = (val / maxVal) * 100;

  return (
    <div className="glass-container fade-transition">
      <h1>Cuteness Meter 🌸</h1>
      <p className="subtitle">
        Let's calibrate the cuteness scale. Standard tests only go up to 100%, but let's see where you stand.
      </p>

      <div className="slider-wrapper">
        <input
          type="range"
          min="0"
          max={maxVal}
          value={val}
          onChange={(e) => {
            if (!isAnimating && !isComplete) {
              setVal(Number(e.target.value));
            }
          }}
          disabled={isAnimating || isComplete}
          className="range-slider"
          style={{
            background: `linear-gradient(90deg, var(--primary-pink) 0%, #ff7597 ${fillPercent}%, rgba(255,255,255,0.4) ${fillPercent}%)`
          }}
        />

        <div className="slider-val-box">
          {val}%
        </div>
      </div>

      <p style={{ minHeight: '48px', margin: '20px 0', fontSize: '1.05rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
        {statusText}
      </p>

      <div style={{ marginTop: '20px' }}>
        {!isComplete ? (
          <button
            onClick={handleCalculate}
            disabled={isAnimating}
            className="cute-btn"
          >
            {isAnimating ? 'Calculating... ✨' : 'Calculate Cuteness 💖'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="cute-btn"
            style={{ animation: 'pulse 2s infinite ease-in-out' }}
          >
            Continue 🌸 ➔
          </button>
        )}
      </div>
    </div>
  );
}
