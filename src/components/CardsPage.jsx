import React, { useState } from 'react';

export default function CardsPage({ onNext }) {
  const [activeModal, setActiveModal] = useState(null);
  const [clickedCards, setClickedCards] = useState({ 1: false, 2: false, 3: false });

  const cardData = [
    {
      id: 1,
      emoji: '🌸',
      hint: 'Reveal Secret 1',
      title: 'A Little Thought',
      message: 'You guys make every day brighter! ☀️🌸'
    },
    {
      id: 2,
      emoji: '💖',
      hint: 'Reveal Secret 2',
      title: 'A True Feeling',
      message: 'Everything around us changes but our frndship is constant! 💖✨'
    },
    {
      id: 3,
      emoji: '✨',
      hint: 'Reveal Secret 3',
      title: 'Yu guys to have reveal this',
      message: 'Ikkada em pettalo telitle andhuke💫🌟'
    }
  ];

  const handleCardClick = (card) => {
    setActiveModal(card);
    setClickedCards(prev => ({
      ...prev,
      [card.id]: true
    }));
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const allClicked = clickedCards[1] && clickedCards[2] && clickedCards[3];

  return (
    <div className="glass-container fade-transition" style={{ maxWidth: '700px' }}>
      <h1>Sweet Secrets 💌</h1>
      <p className="subtitle">
        I've hidden a few little messages for you here. Tap on each card below to open them!
      </p>

      <div className="cards-grid">
        {cardData.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="emoji-card"
            style={{
              borderColor: clickedCards[card.id] ? 'var(--primary-pink)' : 'rgba(255, 255, 255, 0.5)',
              background: clickedCards[card.id] ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.35)'
            }}
          >
            <div className="emoji-icon">{card.emoji}</div>
            <div className="card-hint">
              {clickedCards[card.id] ? 'Opened 🔓' : card.hint}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', minHeight: '24px', margin: '20px 0' }}>
        {allClicked 
          ? 'You have unlocked all messages! Feel free to read them again or click continue.' 
          : 'Tap on each card to unlock the next step! 🔑'}
      </p>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={onNext}
          disabled={!allClicked}
          className="cute-btn"
          style={allClicked ? { animation: 'pulse 2s infinite ease-in-out' } : {}}
        >
          Continue 🌸 ➔
        </button>
      </div>

      {/* Pop Up Modal Overlay */}
      <div 
        className={`modal-overlay ${activeModal ? 'active' : ''}`}
        onClick={closeModal}
      >
        <div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {activeModal && (
            <>
              <div className="modal-emoji">{activeModal.emoji}</div>
              <h2>{activeModal.title}</h2>
              <div className="modal-message">{activeModal.message}</div>
              <button 
                onClick={closeModal}
                className="cute-btn"
                style={{ padding: '12px 28px', fontSize: '1rem', marginTop: '10px' }}
              >
                Close 💕
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
