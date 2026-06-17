import React, { useState } from 'react';
import BackgroundHearts from './components/BackgroundHearts';
import LandingPage from './components/LandingPage';
import CutenessPage from './components/CutenessPage';
import CardsPage from './components/CardsPage';
import BirthdayPage from './components/BirthdayPage';
import LoveCalculatorPage from './components/LoveCalculatorPage';

export default function App() {
  const [page, setPage] = useState(0);
  const [birthdayChoices, setBirthdayChoices] = useState('');

  // Calculate progress bar percentage
  const getProgressPercentage = () => {
    switch (page) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      case 4: return 100;
      default: return 0;
    }
  };

  return (
    <>
      {/* Interactive canvas background */}
      <BackgroundHearts />

      {/* Main Container */}
      <div className="app-wrapper">
        {/* Progress Bar (hidden on Landing Page 0) */}
        {page > 0 && (
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        )}

        {/* Page Routing based on active step */}
        {page === 0 && (
          <LandingPage onNext={() => setPage(1)} />
        )}
        {page === 1 && (
          <CutenessPage onNext={() => setPage(2)} />
        )}
        {page === 2 && (
          <CardsPage onNext={() => setPage(3)} />
        )}
        {page === 3 && (
          <BirthdayPage 
            onNext={() => setPage(4)} 
            setBirthdayChoices={setBirthdayChoices} 
          />
        )}
        {page === 4 && (
          <LoveCalculatorPage birthdayChoices={birthdayChoices} />
        )}
      </div>
    </>
  );
}
