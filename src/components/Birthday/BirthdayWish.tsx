"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const wish = "Chúc em luôn mạnh khỏe, luôn vui vẻ và gặp thật nhiều may mắn. Mong rằng tuổi mới sẽ mang đến thật nhiều điều tốt đẹp, nhiều niềm vui và đạt được những điều mình mong muốn. Hãy luôn giữ nụ cười và tận hưởng thật nhiều khoảnh khắc đẹp nhé!";

export default function BirthdayWish({ onReplay }: { onReplay: () => void }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1; setText(wish.slice(0, index));
      if (index >= wish.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <motion.section className="wish" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="wish-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="fireworks" aria-hidden="true"><span>✦</span><span>✦</span><span>✦</span><span>✦</span></div>
      <motion.div className="wish-hero" initial={{ scale: .72, y: 18 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", delay: .1, stiffness: 175 }}>
        <span className="hero-spark hero-spark-left" aria-hidden="true">✦</span>
        <div className="lotus" aria-hidden="true">🪷</div>
        <span className="birthday-cake" aria-hidden="true">🎂</span>
        <span className="hero-spark hero-spark-right" aria-hidden="true">✦</span>
      </motion.div>
      <motion.div className="wish-mascots" aria-hidden="true" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>
        <span>🐸</span><b>today is your day!</b><span>🐸</span>
      </motion.div>
      <motion.p className="wish-kicker" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }}><span>Đã mở khóa món quà</span></motion.p>
      <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }}>Chúc mừng<br /><em>sinh nhật!</em></motion.h2>
      <motion.p className="wish-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .46 }}>Một lời chúc nhỏ dành riêng cho em</motion.p>
      <motion.div className="wish-card" initial={{ opacity: 0, y: 18, rotate: -1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: "spring", delay: .5, stiffness: 170 }}>
        <span className="card-quote" aria-hidden="true">“</span>
        <p>{text}<span className="cursor">|</span></p>
        <span className="card-leaf" aria-hidden="true">❧</span>
        <span className="card-sticker" aria-hidden="true">so cute!</span>
      </motion.div>
      <motion.div className="wish-footer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>
        <p className="signature">Chúc mừng sinh nhật <span>♥</span></p>
        <button className="secondary-button" onClick={onReplay}><span aria-hidden="true">↻</span> Chơi lại từ đầu</button>
      </motion.div>
      <p className="thanks">Cảm ơn vì đã cùng chú ếch hoàn thành chuyến phiêu lưu này.</p>
    </motion.section>
  );
}
