"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const wish = `Chúc cô tất cả trừ vất vả, đừng để mấy con rắn bắt nạt nhé. Nhanh giàu thành phú bà nhé, lúc đấy đừng quên anh đấy nhé. Né mấy thằng tồi ra nhé, còn yêu mấy thằng nhạt nhạt như mấy con "cua" thì cũng được nhé. Cảm ơn em gái rất nhiều đã giúp a trong thời gian vừa qua.`;

export default function BirthdayWish({ onReplay }: { onReplay: () => void }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(wish.slice(0, index));
      if (index >= wish.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <motion.section
      className="wish"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="wish-confetti" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="fireworks" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>
      <motion.div
        className="wish-hero"
        initial={{ scale: 0.72, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.1, stiffness: 175 }}
      >
        <span className="hero-spark hero-spark-left" aria-hidden="true">
          ✦
        </span>
        <div className="lotus" aria-hidden="true">
          🪷
        </div>
        <span className="birthday-cake" aria-hidden="true">
          🎂
        </span>
        <span className="hero-spark hero-spark-right" aria-hidden="true">
          ✦
        </span>
      </motion.div>
      <motion.div
        className="wish-mascots"
        aria-hidden="true"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <span>🐸</span>
        <b>today is your day!</b>
        <span>🐸</span>
      </motion.div>
      <motion.p
        className="wish-kicker"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        <span>Đã mở khóa món quà</span>
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
      >
        Chúc mừng sinh nhật
        <br />
        <em>con ếch cục súc!</em>
      </motion.h2>
      <motion.p
        className="wish-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.46 }}
      >
        Một lời chúc nhỏ dành riêng cho cô
      </motion.p>
      <motion.div
        className="wish-card"
        initial={{ opacity: 0, y: 18, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", delay: 0.5, stiffness: 170 }}
      >
        <span className="card-quote" aria-hidden="true">
          “
        </span>
        <p>
          {text}
          <span className="cursor">|</span>
        </p>
        <span className="card-leaf" aria-hidden="true">
          ❧
        </span>
        <span className="card-sticker" aria-hidden="true">
          so cute!
        </span>
      </motion.div>
      <motion.div
        className="wish-footer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <p className="signature">
          Gửi em gái cục súc <span>♥</span>
        </p>
        <button className="secondary-button" onClick={onReplay}>
          <span aria-hidden="true">↻</span> Chơi lại từ đầu
        </button>
      </motion.div>
      <p className="thanks">
        Cảm ơn vì đã cùng chú ếch hoàn thành chuyến phiêu lưu này.
      </p>
    </motion.section>
  );
}
