"use client";

import { useState } from "react";
import styles from "./AirdropSection.module.css";
import { supabase } from "@/lib/supabase"; // ← adjust path if your supabase.js is in a different folder

export default function AirdropSection() {
  const [wallet, setWallet] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ... your existing imports ...

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

    console.log("Attempting insert with wallet:", wallet.trim());
    console.log(
      "Using Supabase URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL ? "set" : "MISSING",
    );

    try {
      const { data, error } = await supabase
        .from("airdrop_entries")
        .insert({ wallet: wallet.trim() });

      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }

      console.log("Insert success:", data);
      setMessage("Wallet saved! Good luck – winners every 24hrs 🎉");
      setIsSuccess(true);
      setWallet("");
    } catch (err) {
      console.error("Full submission error:", err);
      setMessage(
        "Error: " +
          (err.message ||
            "Check console for details – likely RLS policy issue."),
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.airdropSection} id="airdrop">
      <h3>Come Join the Airdrop</h3>

      <p className={styles.sectionSubtitle}>
        Hold $APC coin in your wallet, drop your Solana wallet address below,
        <br /> and enter the draw. We dey pick random winners{" "}
        <strong>every 24 hours</strong>!
        <br /> abeg don&apos;t submit your wallet multiple times, that one na
        automatic disqualification!
      </p>

      <div className={styles.airdropContainer}>
        <div className={`${styles.airdropCard} ${styles.airdropFormWrapper}`}>
          <h4>Submit Your Wallet for the Draw</h4>

          <p className={styles.airdropDescription}>
            No extra cost beyond the $5 purchase. Just paste your Solana wallet
            here. We go send airdrop straight to winners. Make sure na your real
            wallet you dey use!
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
