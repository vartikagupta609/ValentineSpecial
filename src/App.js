import { useState, useRef, useEffect } from 'react';
import './App.css';
import image1 from "./assets/bubu 2.webp"
import image2 from "./assets/dudu1.jpeg"

function App() {
  const [accepted, setAccepted] = useState(false);
  const [showTooLate, setShowTooLate] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(null);
  const noButtonRef = useRef(null);
  const changeMindRef = useRef(null);

  useEffect(() => {
    if (!accepted) return;

    const targetElement = changeMindRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowTooLate(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [accepted]);

  const moveButton = (cursorX, cursorY) => {
    if (accepted || !noButtonRef.current) return;
    
    const button = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;
    
    const distanceX = cursorX - buttonCenterX;
    const distanceY = cursorY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 100) {
      if (!noButtonPos) {
        setNoButtonPos({ x: button.left, y: button.top });
      }
      
      const minX = window.innerWidth * 0.1;
      const maxX = window.innerWidth * 0.9 - button.width;
      const minY = window.innerHeight * 0.1;
      const maxY = window.innerHeight * 0.9 - button.height;
      
      const newX = Math.random() * (maxX - minX) + minX;
      const newY = Math.random() * (maxY - minY) + minY;
      
      setNoButtonPos({ x: newX, y: newY });
    }
  };

  const handleMouseMove = (e) => {
    moveButton(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      moveButton(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="App" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      <div className="floating-hearts">
        <span className="heart">💕</span>
        <span className="heart">💖</span>
        <span className="heart">💗</span>
        <span className="heart">💝</span>
        <span className="heart">💓</span>
        <span className="heart">💞</span>
      </div>

      {!accepted ? (
        <div className="valentine-card">
          <div className="card-header">
            <span className="emoji">💘</span>
          </div>
          <h1 className="valentine-message">
            Swammi💓,Will you be my Valentine? 💕
          </h1>
          <div className="button-container">
            <button 
              className="yes-button"
              onClick={() => setAccepted(true)}
            >
              Yes 💝
            </button>
            <button 
              ref={noButtonRef}
              className="no-button"
              style={noButtonPos ? {
                position: 'fixed',
                left: `${noButtonPos.x}px`,
                top: `${noButtonPos.y}px`,
                margin: 0,
                transition: 'all 0.15s ease-out',
                zIndex: 1000
              } : {}}
            >
              No 😢
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div className="good-choice-message">
             Good Choice Dudu! 😘💖
          </div>
          <div className="success-card">
            <div className="celebration">🎉</div>
            <h1 className="success-message">
               Happy Valentine's Day! 💖
            </h1>
            <div className="hearts-celebration">
             💕 💗 💝 💖 💞 💓
            </div>
          </div>

          
          <div className="extra-message">
            <p className="unlocked-text">
              You just unlocked unlimited hugs, kisses, and cuddles<br />
            </p>
            
            <div className="cute-images">
              <img src={image1} alt="Cute couple hugging" className="cute-img" />
              <img src={image2} alt="Cute couple together" className="cute-img" />
            </div>
            
            <p className="stuck-forever">
              Now you're stuck with me forever ∞
            </p>
            
            <p ref={changeMindRef} className="change-mind">
              Wait... do you want to change your mind? 🤔
            </p>

            
            {showTooLate && (
              <div className="too-late-section">
                <h2 className="too-late-title">TOO LATE! 😬</h2>
                <p className="too-late-subtitle">You already said YES, which means:</p>
                
                <div className="rules-list">
                  <p className="rule-item no-rule">❌ No take-backs allowed</p>
                  <p className="rule-item no-rule">❌ You're legally mine now (I checked)</p>
                  <p className="rule-item no-rule">❌ Every 'no' from now on = 10 extra kisses every day</p>
                  <p className="rule-item yes-rule">✅ You're stuck with your mutki bubu FOREVER 😈</p>
                </div>
                
                <p className="deal-with-it">Deal with it 😘💕</p>
              </div>
            )}

<div className="too-late-section">
                {/* <h2 className="too-late-title"> 😬</h2> */}
                {/* <p className="too-late-subtitle">Happy Valentine’s Day to the man who stole my heart… and still refuses to give it back! 😘</p> */}
                
                <div className="rules-list">
                  <p className="rule-item yes-rule">Happy Valentine’s Day to the man who stole my heart… and still refuses to give it back! 😘</p>
                  <p className="rule-item yes-rule">Life with you is my favorite adventure — full of love, laughter, and your terrible laugh. You’re my husband, my best friend, my personal bodyguard, and my lifetime Valentine.</p>
                  <p className="rule-item yes-rule">I promise to keep loving you, annoying you, supporting you, and stealing your hoodies forever. ❤️</p>
                  <p className="rule-item yes-rule">Forever yours… even when we argue about your habits of saying anything that annoys me😄💕</p>
                </div>
                
                {/* <p className="deal-with-it">                😘💕</p> */}
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
