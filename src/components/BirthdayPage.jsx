import React, { useState } from 'react';

export default function BirthdayPage({ onNext, setBirthdayChoices }) {
  const [mainChoice, setMainChoice] = useState(null); // 'out_of_station' | 'bangalore'
  const [subChoice, setSubChoice] = useState(null); // 'beach' | 'hill_station' | 'cafes' | 'resort'
  const [finalDetail, setFinalDetail] = useState(''); // specific destination or choice

  const handleReset = () => {
    setMainChoice(null);
    setSubChoice(null);
    setFinalDetail('');
  };

  const handleFinish = () => {
    let summaryText = '';
    if (mainChoice === 'out_of_station') {
      summaryText = `Go out of station to a ${subChoice === 'beach' ? 'Beach' : 'Hill Station'} at ${finalDetail}`;
    } else {
      summaryText = `Stay in Bangalore and ${subChoice === 'cafes' ? 'Explore cozy cafes' : 'Visit a resort & do adventure activities'}`;
    }
    setBirthdayChoices(summaryText);
    onNext();
  };

  return (
    <div className="glass-container fade-transition" style={{ maxWidth: '650px' }}>
      <h1>And it's high time, let's plan for a trip</h1>
      <p className="subtitle">
        Where does your heart want to go?
      </p>

      <div className="birthday-flow-container">
        {/* Step 1: Main Choice */}
        {mainChoice === null && (
          <div className="fade-transition">
            <h3>Choose a path:</h3>
            <div className="choices-row">
              <button
                onClick={() => setMainChoice('out_of_station')}
                className="choice-box-btn"
              >
                <span className="choice-emoji">✈️</span>
                <span className="choice-title">Out of Station</span>
                <span className="choice-sub">Travel to somewhere scenic</span>
              </button>

              <button
                onClick={() => setMainChoice('bangalore')}
                className="choice-box-btn"
              >
                <span className="choice-emoji">🏡</span>
                <span className="choice-title">Stay in Bangalore</span>
                <span className="choice-sub">Explore the local vibes</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2a: Out of Station Subchoice */}
        {mainChoice === 'out_of_station' && subChoice === null && (
          <div className="fade-transition">
            <h3>Which scenery do you prefer?</h3>
            <div className="choices-row">
              <button
                onClick={() => setSubChoice('beach')}
                className="choice-box-btn"
              >
                <span className="choice-emoji">🌊</span>
                <span className="choice-title">Beach Vibe</span>
                <span className="choice-sub">Sun, sand, and ocean waves</span>
              </button>

              <button
                onClick={() => setSubChoice('hill_station')}
                className="choice-box-btn"
              >
                <span className="choice-emoji">⛰️</span>
                <span className="choice-title">Hill Station</span>
                <span className="choice-sub">Cool breeze, mist, and heights</span>
              </button>
            </div>
            
            <button onClick={handleReset} className="cute-btn-secondary">
              ◀ Back to start
            </button>
          </div>
        )}

        {/* Step 2b: Bangalore Subchoice */}
        {mainChoice === 'bangalore' && subChoice === null && (
          <div className="fade-transition">
            <h3>What local adventure are we planning?</h3>
            <div className="choices-row">
              <button
                onClick={() => {
                  setSubChoice('cafes');
                  setFinalDetail('Explore Cafes');
                }}
                className="choice-box-btn"
              >
                <span className="choice-emoji">☕</span>
                <span className="choice-title">Explore Cafes</span>
                <span className="choice-sub">Visit cute & aesthetic spots</span>
              </button>

              <button
                onClick={() => {
                  setSubChoice('resort');
                  setFinalDetail('Resort Adventure');
                }}
                className="choice-box-btn"
              >
                <span className="choice-emoji">🧗‍♀️</span>
                <span className="choice-title">Resort & Adventure</span>
                <span className="choice-sub">Thrill, activities, and relaxation</span>
              </button>
            </div>

            <button onClick={handleReset} className="cute-btn-secondary">
              ◀ Back to start
            </button>
          </div>
        )}

        {/* Step 3: Destination selection for Beach */}
        {mainChoice === 'out_of_station' && subChoice === 'beach' && (
          <div className="fade-transition" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Pick your favorite beach destination:</h3>
            <div className="options-grid">
              {['Goa 🌊', 'Gokarna 🐚', 'Pondicherry 🌴'].map((dest) => (
                <button
                  key={dest}
                  onClick={() => setFinalDetail(dest)}
                  className={`option-chip ${finalDetail === dest ? 'selected' : ''}`}
                >
                  {dest}
                </button>
              ))}
            </div>
            
            <div className="btn-row">
              <button onClick={() => setSubChoice(null)} className="cute-btn-secondary">
                ◀ Back
              </button>
              <button 
                onClick={handleFinish} 
                disabled={!finalDetail} 
                className="cute-btn" 
              >
                Confirm Choice ✨
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Destination selection for Hill Station */}
        {mainChoice === 'out_of_station' && subChoice === 'hill_station' && (
          <div className="fade-transition" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Pick your favorite hill station destination:</h3>
            <div className="options-grid">
              {['Kodaikanal 🌲', 'Ooty 🌸', 'Coorg ☕', 'Chikmagalur 🍃'].map((dest) => (
                <button
                  key={dest}
                  onClick={() => setFinalDetail(dest)}
                  className={`option-chip ${finalDetail === dest ? 'selected' : ''}`}
                >
                  {dest}
                </button>
              ))}
            </div>
            
            <div className="btn-row">
              <button onClick={() => setSubChoice(null)} className="cute-btn-secondary">
                ◀ Back
              </button>
              <button 
                onClick={handleFinish} 
                disabled={!finalDetail} 
                className="cute-btn"
              >
                Confirm Choice ✨
              </button>
            </div>
          </div>
        )}

        {/* Summary for Bangalore option */}
        {mainChoice === 'bangalore' && subChoice !== null && (
          <div className="fade-transition" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Sounds wonderful! You selected:</h3>
            <div className="option-chip selected" style={{ width: '100%', maxWidth: '300px', cursor: 'default' }}>
              {subChoice === 'cafes' ? '☕ Explore Aesthetic Cafes' : '🧗‍♀️ Resort & Adventurous Activities'}
            </div>
            
            <div className="btn-row">
              <button onClick={() => setSubChoice(null)} className="cute-btn-secondary">
                ◀ Back
              </button>
              <button onClick={handleFinish} className="cute-btn">
                Confirm Choice ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
