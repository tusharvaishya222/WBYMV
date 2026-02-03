import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto', moved: false })
  const containerRef = useRef<HTMLDivElement>(null)

  // Floating hearts background content
  const hearts = Array.from({ length: 20 })

  const moveNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default to stop weird touch behaviors
    if (e.type === 'touchstart') {
      e.preventDefault();
    }

    if (!containerRef.current) return

    // Get viewport dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Button dimensions - assume typical size or measure if possible, 
    // but safe margin is key.
    const buttonWidth = 150 // Estimated width + margin
    const buttonHeight = 60 // Estimated height + margin
    
    // Generate new position
    // Ensure it stays strictly within [0, viewport - size]
    const maxLeft = viewportWidth - buttonWidth
    const maxTop = viewportHeight - buttonHeight

    const randomX = Math.floor(Math.random() * maxLeft)
    const randomY = Math.floor(Math.random() * maxTop)

    setNoButtonPos({
      top: `${Math.max(0, randomY)}px`,
      left: `${Math.max(0, randomX)}px`,
      moved: true
    })
  }

  const handleYesClick = () => {
    setAccepted(true)
  }

  return (
    <>
      {/* Background Hearts */}
      <div className="floating-hearts">
        {hearts.map((_, i) => (
          <div 
            key={i} 
            className="heart" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }} 
          />
        ))}
      </div>

      <div className="card" ref={containerRef}>
        {!accepted ? (
          <>
            <h1>Priya, will you be my valentine?</h1>
            <div className="button-container">
              <button 
                className="btn-yes" 
                onClick={handleYesClick}
                aria-label="Say Yes"
              >
                Yes
              </button>
              
              {!noButtonPos.moved && (
                <button 
                  className="btn-no" 
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  aria-label="No"
                >
                  No
                </button>
              )}
            </div>
            <p style={{ marginTop: '2rem', opacity: 0.7, fontSize: '0.9rem' }}>
              (Hint: The no button is a little shy...)
            </p>
          </>
        ) : (
          <div className="success-container">
            <h1 className="love-text">I Love you priya ❤️</h1>
            <div className="details-text">
              <p>You got the chance to have a movie date with Tushar this Valentine’s Day 💕</p>
              <span className="phone-number">Save: 7400115822</span>
              <p>Contact him fast 📞</p>
            </div>
          </div>
        )}
      </div>

      {/* Portal/Hoisted No Button */}
      {noButtonPos.moved && !accepted && (
        <button 
          className="btn-no" 
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          style={{ 
            position: 'fixed', 
            top: noButtonPos.top, 
            left: noButtonPos.left 
          }}
          aria-label="No (Try to catch me if you can)"
        >
          No
        </button>
      )}
    </>
  )
}

export default App
