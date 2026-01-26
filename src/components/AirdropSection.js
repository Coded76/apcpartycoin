"use client";

import { useState } from "react";
import styles from "./AirdropSection.module.css";
import { supabase } from "@/lib/supabase";

export default function AirdropSection() {
  const [wallet, setWallet] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedWallet = wallet.trim();

    // Basic validation
    if (!trimmedWallet) {
      setMessage("Abeg enter your Solana wallet address first.");
      setIsSuccess(false);
      return;
    }

    if (trimmedWallet.length < 32 || trimmedWallet.length > 44) {
      setMessage("This no look like correct Solana wallet o.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      /**
       * OPTIONAL PRE-CHECK (UX IMPROVEMENT)
       * Still backed by DB unique constraint
       */
      const { data: existingWallet, error: checkError } = await supabase
        .from("airdrop_data")
        .select("id")
        .eq("wallet", trimmedWallet)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingWallet) {
        setMessage("This wallet don already enter the draw 🚫");
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      /**
       * INSERT WALLET
       */
      const { error: insertError } = await supabase
        .from("airdrop_data")
        .insert({ wallet: trimmedWallet });

      if (insertError) {
        // Duplicate wallet (DB-level protection)
        if (insertError.code === "23505") {
          setMessage("This wallet don already enter the draw 🚫");
          setIsSuccess(false);
          return;
        }

        throw insertError;
      }

      setMessage("Wallet saved! Good luck – winners every 24hrs 🎉");
      setIsSuccess(true);
      setWallet("");
    } catch (err) {
      console.error("Airdrop submission error:", err);
      setMessage("Something go wrong. Please try again later.");
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
        <br />
        and enter the draw. We dey pick random winners{" "}
        <strong>every 24 hours</strong>!
        <br />
        Abeg no submit your wallet multiple times — automatic disqualification!
      </p>

      <div className={styles.airdropContainer}>
        <div className={`${styles.airdropCard} ${styles.airdropFormWrapper}`}>
          <h4>Submit Your Wallet for the Draw</h4>

          <p className={styles.airdropDescription}>
            No extra cost beyond the $5 purchase. Just paste your Solana wallet
            here. We go send airdrop straight to winners. Make sure na your real
            wallet!
          </p>

          <form className={styles.airdropForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Solana wallet address (e.g. 7x8y...9z)"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
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
              className={`${styles.formMessage} ${
                isSuccess ? styles.success : styles.error
              }`}
            >
              {message}
            </p>
          )}

          <p className={styles.formNote}>
            By submitting you confirm say you don hold $APC coin.
            One entry per wallet. No multiple submissions abeg.
          </p>
        </div>
      </div>
    </section>
  );
}
