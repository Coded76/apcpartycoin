'use client';

import { useState, useEffect, useRef } from 'react';
import AirdropSection from '@/components/AirdropSection';

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
    const text = 'BGWDQQ8L14w5aDkfcoomCJsiDpvVBJvx2yLVCQdRFR8p';
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
          <a href="#tokenomics" onClick={() => scrollToSection('tokenomics')}>Money Talk</a>
          <a href="#speech" onClick={() => scrollToSection('speech')}>Big Man Say</a>
          <a href="#airdrop" onClick={() => scrollToSection('airdrop')}>Get Airdrop</a>
          <a href="https://dexscreener.com/solana/bqnxy6mtbbjoyqysmm46mrk9gudpxjn49zw7mzryabxa" target="_blank" rel="noopener noreferrer">
            See Price
          </a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h2 className="fade-in">The Village Don Cash Out.</h2>
          <h2 className="fade-in" style={{animationDelay: '0.2s'}}>Big Man President Bola Ahmed Tinubu Say Make All $APC Holders Come Party.</h2>
          <p className="fade-in" style={{animationDelay: '0.4s'}}>$APC — The African Coin Party Token.</p>

          <div className="buttons fade-in" style={{animationDelay: '0.6s'}}>
            <a href="https://dexscreener.com/solana/bqnxy6mtbbjoyqysmm46mrk9gudpxjn49zw7mzryabxa" className="btn-primary">Buy $APC Now</a>
            <a href="https://dexscreener.com/solana/bqnxy6mtbbjoyqysmm46mrk9gudpxjn49zw7mzryabxa" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              See Price</a>
          </div>

          <p style={{ marginTop: '40px', fontWeight: '700', fontSize: '1.1rem' }}>Coin Address</p>

          <div className="copybox fade-in" style={{animationDelay: '0.8s'}}>
            <span id="contract" className="contract-text">BGWDQQ8L14w5aDkfcoomCJsiDpvVBJvx2yLVCQdRFR8p</span>
            <button onClick={copyAddress} className="copy-btn">Copy</button>
          </div>

          {copiedMsg && (
            <p className="copied-msg">✓ Copied to clipboard 🚀</p>
          )}
        </div>
      </section>

      <section className="section narrative-section" id="narrative">
        <h3>The Story</h3>
        <p className="section-subtitle">How Village Find Money</p>
        <div className="grid">
          <div className="card card-animated">
            <div className="card-image-wrapper">
              <img src="/coin-img-1.jpeg" alt="Village" />
            </div>
            <div className="card-content">
              <h4>The Light Shine</h4>
              <p>Village finally see the money road… now everybody fine well.</p>
            </div>
          </div>

          <div className="card card-animated">
            <div className="card-image-wrapper">
              <img src="/coin-img-3.jpeg" alt="Party" />
            </div>
            <div className="card-content">
              <h4>The Jollification</h4>
              <p>Pepper soup, palm wine, horn blow, dance move — the party no end.</p>
            </div>
          </div>

          <div className="card card-animated">
            <div className="card-image-wrapper">
              <img src="/coin-img-2.jpeg" alt="Money" />
            </div>
            <div className="card-content">
              <h4>Everybody Shine</h4>
              <p>Money na water. Everybody laugh small. Even the goat see the money well.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tokenomics-section" id="tokenomics">
        <h3>Money Talk</h3>
        <p className="section-subtitle">The Numbers Them</p>
        <div className="grid tokenomics-grid">
          <div className="card tokenomics-card">
            <div className="tokenomics-icon">📊</div>
            <h2>How Much</h2>
            <p className="tokenomics-value">1,000,000,000</p>
            <p className="tokenomics-label">$APC Coin Tokens</p>
          </div>
          <div className="card tokenomics-card">
            <div className="tokenomics-icon">🔐</div>
            <h2>Strong Strong</h2>
            <p className="tokenomics-value">Forever Lock Down</p>
            <p className="tokenomics-label">In the Party Place</p>
          </div>
        </div>
      </section>

      <section className="section speech-section" id="speech">
        <h3>Big Man Say</h3>
        <p className="section-subtitle">From The President Him Self</p>
        <div className="card speech-card">
          <p><b>My people of the village,</b></p>

          <p>Today we no talk about government side.<br />
          Today we talk about the money side.</p>

          <p>I be your papa, I be your big father.<br />
          Make you listen me and buy the coin $APC.</p>

          <p>The goat dem done cash out.<br />
          The fowl dem done cash out.<br />
          Even the village drummer just buy two phone from $APC money.</p>

          <p>I go tell police say he no be internet person.</p>

          <p>This na the $APC time.<br />
          The time when everybody chop, everybody dance, and nobody check chart because fear go catch am.</p>

          <p>If you see money fall from sky, no fear small.<br />
          Na only $APC doing the work.</p>

          <p><i>God bless the village. God bless the party. God bless the people them that hold the coin.</i></p>

          <p className="signature">-President Bola Ahmed Tinubu</p>

          <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '20px' }}>(This speech na play play for entertainment only.)</p>
        </div>
      </section>

      <AirdropSection />

      <section className="section cta-section">
        <h3>Join the APC coin party Now</h3>
        <p className="section-subtitle">No be say make you be the one standing when everybody dey dance for village.</p>
        <div className="buttons">
          <a href="https://dexscreener.com/solana/bqnxy6mtbbjoyqysmm46mrk9gudpxjn49zw7mzryabxa" className="btn-primary btn-large">Buy $APC Today</a>
          <a href="https://x.com/apccoinsol" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-large">
            Follow on Twitter</a>
        </div>
        <p className="section-subtitle" style={{ marginTop: '30px', fontSize: '0.95rem' }}>🎉 Special Party Time Now 🎉</p>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>$APC Coin</h4>
            <p>APC Party Coin - The Play Play Coin Token</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#narrative">The Story</a>
            <a href="#tokenomics">Money Talk</a>
            <a href="#speech">Big Man Say</a>
            <a href="#airdrop">Get Airdrop</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://x.com/apccoinsol" target="_blank" rel="noopener noreferrer">Twitter</a>
              {/* <a href="#" target="_blank" rel="noopener noreferrer">Discord</a> */}
              <a href="https://t.me/apcpartycoin" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p><b>⚠️ Play Play Warning</b></p>
          <p>
            $APC na one play play meme coin for fun and laugh only.<br />
            This thing no be real or official, no be APC party, no be government, no be real politician business.
          </p>
          <p>
            No political person support this thing.<br />
            Everything here na just for the laugh and the fun play.
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
