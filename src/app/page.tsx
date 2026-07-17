"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import FrogGame from "@/components/Game/FrogGame";
import BirthdayWish from "@/components/Birthday/BirthdayWish";

type Screen = "intro" | "game" | "wish";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [muted, setMuted] = useState(false);
  const start = useCallback(() => setScreen("game"), []);
  const replay = useCallback(() => setScreen("intro"), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "m" || event.key === "M") setMuted((value) => !value);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="birthday-page">
      <button className="sound-button" onClick={() => setMuted((value) => !value)} aria-label="Bật hoặc tắt âm thanh">
        {muted ? "🔇" : "🔊"}
      </button>
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.section key="intro" className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}>
            <div className="bubbles" aria-hidden="true"><i /><i /><i /><i /></div>
            <motion.div className="intro-frog" animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2.4 }}>🐸</motion.div>
            <p className="eyebrow">một cuộc phiêu lưu nho nhỏ</p>
            <h1>Frog's<br /><em>Little Quest</em></h1>
            <p className="intro-copy">Giúp chú ếch bắt đủ côn trùng<br />để khám phá điều bất ngờ ở cuối hành trình.</p>
            <button className="primary-button" onClick={start}>Bắt đầu <span>→</span></button>
            <p className="hint">Dành cho màn hình lớn • Nhấp để phóng lưỡi</p>
          </motion.section>
        )}
        {screen === "game" && <FrogGame key="game" muted={muted} onComplete={() => setScreen("wish")} />}
        {screen === "wish" && <BirthdayWish key="wish" onReplay={replay} />}
      </AnimatePresence>
    </main>
  );
}
