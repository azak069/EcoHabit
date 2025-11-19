import React, { useState, useEffect } from 'react';
import { authFetch } from '../../services/api';

function AiMotivation({ userName, userLevel }) {
  const [quote, setQuote] = useState({ 
    text: "Memuat...", 
    author: "EcoHabit" 
  });

  useEffect(() => {
    if (!userName || !userLevel) return;

    authFetch('/ai/motivation', {
      method: 'POST',
      body: JSON.stringify({ name: userName, level: userLevel })
    })
    .then(data => {
    
    const cleanedText = data.text.replace(/\s+/g, ' ').trim();

    setQuote({ 
      text: cleanedText, 
      author: data.author 
    });
  })
    .catch(err => {
      console.warn('Gagal memuat motivasi AI:', err.message);
      setQuote({
        text: "Setiap tindakan kecil untuk lingkungan membawa perubahan besar untuk masa depan.",
        author: "EcoHabit"
      });
    });
  }, [userName, userLevel]);

  return (
    <div className="card">
      <h2 className="card-title">Motivasi AI</h2>
      <div className="quote-section">
        <div className="quote-text">{quote.text}</div>
        <div className="quote-author">- {quote.author}</div>
      </div>
    </div>
  );
}

export default AiMotivation;