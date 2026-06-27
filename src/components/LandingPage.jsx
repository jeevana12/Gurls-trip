import React from 'react';

export default function LandingPage({ onNext }) {
  return (
    <div className="glass-container fade-transition" style={{ maxWidth: '550px' }}>
      <div className="landing-gift">
        🎁
      </div>
      
      <h1>Hey gurlssss! 💕</h1>
      
      <p className="subtitle landing-subtitle">
        Your loved one has sent you something special...
        <br />
        Go forward to view it! ✨
      </p>

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={onNext}
          className="cute-btn"
          style={{ animation: 'pulse 1.8s infinite ease-in-out' }}
        >
          Let's Go! ➔
        </button>
      </div>
    </div>
  );
}
