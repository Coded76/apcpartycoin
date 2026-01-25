"use client";

import { useState } from "react";
import styles from "./AirdropSection.module.css";   // ← must point to .module.css

export default function AirdropSection() {
  const [wallet, setWallet] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wallet.trim()) {
      setMessage("Abeg enter your Solana wallet address first.");
      setIsSuccess(false);
      return;
    }

    if (wallet.length < 32 || wallet.length > 44) {
      setMessage("This no look like correct Solana wallet o.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxiE5w2u4-qyIDUAnaiF5jeLJSKuJVoYqH8akvg67ZnS8fQ-3sIfwfwCUEkWGkXct9a/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        setMessage("Wallet saved! Good luck – winners every 24hrs 🎉");
        setIsSuccess(true);
        setWallet("");
      } else {
        setMessage("Something no work. Try again later.");
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("Network issue – check your connection and try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.airdropSection} id="airdrop">
      <h3>Come Join the Airdrop</h3>

      <p className={styles.sectionSubtitle}>
        Buy at least <strong>$5</strong> of the coin, drop your Solana wallet address below, 
        <br /> and enter the draw. We dey pick random winners <strong>every 24 hours</strong>!
        <br /> abeg don&apos;t submit your wallet multiple times, that one na automatic disqualification!
      </p>

      <div className={styles.airdropContainer}>
        <div className={`${styles.airdropCard} ${styles.airdropFormWrapper}`}>
          <h4>Submit Your Wallet for the Draw</h4>

          <p className={styles.airdropDescription}>
            No extra cost beyond the $5 purchase. Just paste your Solana wallet here. 
            We go send airdrop straight to winners. Make sure na your real wallet you dey use!
          </p>

          <form className={styles.airdropForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Solana wallet address (e.g. 7x8y...9z)"
              value={wallet}
              onChange={(e) => setWallet(e.target.value.trim())}
              disabled={loading}
              className={styles.walletInput}
              autoComplete="off"
              spellCheck={false}
            />

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? (
                <span className={styles.loadingContent}>
                  <span className={styles.spinner}></span>
                  Submitting...
                </span>
              ) : (
                "Enter Airdrop Draw"
              )}
            </button>
          </form>

          {message && (
            <p
              className={`${styles.formMessage} ${isSuccess ? styles.success : styles.error}`}
            >
              {message}
            </p>
          )}

          <p className={styles.formNote}>
            By submitting you confirm say you don buy at least $5 of the coin. 
            One entry per wallet. No multiple submissions abeg.
          </p>
        </div>
      </div>
    </section>
  );
}