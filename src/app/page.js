'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize audio and autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Attempt to autoplay with sound (some browsers require user interaction)
      audio.volume = 0.5; // Set volume to 50%
      const autoplayPromise = audio.play();
      
      if (autoplayPromise !== undefined) {
        autoplayPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay was prevented, user needs to click play button
            setIsPlaying(false);
          });
      }

      // Update playing state when audio ends
      const handleEnded = () => {
        audio.currentTime = 0;
        audio.play();
      };

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('play', () => setIsPlaying(true));
        audio.removeEventListener('pause', () => setIsPlaying(false));
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const copyAddress = () => {
    const text = 'YOUR_CONTRACT_ADDRESS_HERE';
    navigator.clipboard.writeText(text);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 3000);
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="acp-page">
      <nav className={`navbar ${scrollPosition > 50 ? 'navbar-scrolled' : ''}`}>
        <h1 className="logo">$APC</h1>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
          <a href="#tokenomics" onClick={() => scrollToSection('tokenomics')}>Tokenomics</a>
          <a href="#speech" onClick={() => scrollToSection('speech')}>Presidential Speech</a>
          <a href="https://dexscreener.com/solana/YOURPAIRHERE" target="_blank" rel="noopener noreferrer">
            Dexscreener
          </a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h2 className="fade-in">The Village Is Getting Rich.</h2>
          <h2 className="fade-in" style={{animationDelay: '0.2s'}}>President Bola Ahmed Tinubu Is Throwing A Party For All $APC Coin Holders.</h2>
          <p className="fade-in" style={{animationDelay: '0.4s'}}>$APC — APC Party Coin Token.</p>

          <div className="buttons fade-in" style={{animationDelay: '0.6s'}}>
            <a href="#" className="btn-primary">Buy $APC</a>
            <a href="https://dexscreener.com/solana/YOURPAIRHERE" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Dexscreener
            </a>
          </div>

          <p style={{ marginTop: '40px', fontWeight: '700', fontSize: '1.1rem' }}>Contract Address</p>

          <div className="copybox fade-in" style={{animationDelay: '0.8s'}}>
            <span id="contract" className="contract-text">YOUR_CONTRACT_ADDRESS_HERE</span>
            <button onClick={copyAddress} className="copy-btn">Copy</button>
          </div>

          {copiedMsg && (
            <p className="copied-msg">✓ Copied to clipboard 🚀</p>
          )}
        </div>
      </section>

      <section className="section narrative-section" id="narrative">
        <h3>The Narrative</h3>
        <p className="section-subtitle">How the Village Discovered Wealth</p>
        <div className="grid">
          <div className="card card-animated">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80" alt="Village" />
            </div>
            <div className="card-content">
              <h4>Discovery</h4>
              <p>The village finally discovered crypto… now everyone is rich.</p>
            </div>
          </div>

          <div className="card card-animated">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" alt="Party" />
            </div>
            <div className="card-content">
              <h4>The Party</h4>
              <p>Food, drinks, music, vibes — the party never ends.</p>
            </div>
          </div>

          <div className="card card-animated">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80" alt="Money" />
            </div>
            <div className="card-content">
              <h4>Bullish Vibes</h4>
              <p>Money raining. Everyone smiling. Even the goats are bullish.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tokenomics-section" id="tokenomics">
        <h3>Tokenomics</h3>
        <p className="section-subtitle">The Numbers That Matter</p>
        <div className="grid tokenomics-grid">
          <div className="card tokenomics-card">
            <div className="tokenomics-icon">📊</div>
            <h2>Supply</h2>
            <p className="tokenomics-value">1,000,000,000</p>
            <p className="tokenomics-label">$APC Tokens</p>
          </div>
          <div className="card tokenomics-card">
            <div className="tokenomics-icon">🔐</div>
            <h2>Liquidity</h2>
            <p className="tokenomics-value">Forever Locked</p>
            <p className="tokenomics-label">At the Party</p>
          </div>
        </div>
      </section>

      <section className="section speech-section" id="speech">
        <h3>Presidential Speech</h3>
        <p className="section-subtitle">From The Man Himself</p>
        <div className="card speech-card">
          <p><b>My fellow villagers,</b></p>

          <p>Today we do not talk about politics.<br />
          Today we talk about profits.</p>

          <p>I am your father, I am your grandfather.<br />
          You go listen to me and buy the coin $APC.</p>

          <p>The goats are now rich.<br />
          The chickens are now rich.<br />
          Even the village drummer just bought two phones from $APC profits.</p>

          <p>I go tell the police he is not the yahoo boy.</p>

          <p>This is the $APC era.<br />
          A time where everyone eats, everyone dances, and nobody checks the chart in fear.</p>

          <p>If you see money falling from the sky, do not panic.<br />
          It is only $APC doing its job.</p>

          <p><i>God bless the village. God bless the party. God bless the holders.</i></p>

          <p className="signature">-President Bola Ahmed Tinubu</p>

          <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '20px' }}>(This speech is fictional and for entertainment only.)</p>
        </div>
      </section>

      <section className="section cta-section">
        <h3>Join The African Coin Party Movement</h3>
        <p className="section-subtitle">Don&apos;t be the only one not dancing in the village.</p>
        <div className="buttons">
          <a href="#" className="btn-primary btn-large">Buy $APC Now</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-large">
            Follow on Twitter
          </a>
        </div>
        <p className="section-subtitle" style={{ marginTop: '30px', fontSize: '0.95rem' }}>🎉 Limited Time Party Offer 🎉</p>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>$APC Token</h4>
            <p>APC Party Coin - A Parody Meme Token</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#narrative">The Narrative</a>
            <a href="#tokenomics">Tokenomics</a>
            <a href="#speech">Presidential Speech</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Discord</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p><b>⚠️ Parody Disclaimer</b></p>
          <p>
            $APC is a parody meme token created purely for entertainment purposes.<br />
            This project is NOT affiliated with APC, any political party, any government organization, or any real political figure.
          </p>
          <p>
            No political endorsement is expressed or implied.<br />
            All content on this website is fictional, satirical, and intended for humor only.
          </p>
          <p style={{ marginTop: '20px', opacity: 0.8 }}>© 2026 $APC — APC Party Coin. All rights reserved.</p>
        </div>
        </footer>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src="/AUD-20260122-WA0080.m4a"
        loop
        crossOrigin="anonymous"
      />

      {/* Fixed Audio Control Button */}
      <button
        className={`audio-control-btn ${isPlaying ? 'playing' : 'paused'}`}
        onClick={toggleAudio}
        title={isPlaying ? 'Pause audio' : 'Play audio'}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        <span className="audio-icon">
          {isPlaying ? '🔊' : '🔇'}
        </span>
        <span className="audio-waves" aria-hidden="true">
          {isPlaying && (
            <>
              <span className="wave wave-1"></span>
              <span className="wave wave-2"></span>
              <span className="wave wave-3"></span>
            </>
          )}
        </span>
      </button>
    </div>
      );
    }
