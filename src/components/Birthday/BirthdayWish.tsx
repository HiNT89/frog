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
    <motion.section className="wish" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="fireworks" aria-hidden="true"><span>✦</span><span>✦</span><span>✦</span><span>✦</span></div>
      <motion.div className="lotus" initial={{ scale: .3, rotate: -18 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: .15 }}>🪷</motion.div>
      <p className="eyebrow">đã mở khóa món quà</p>
      <h2>Chúc mừng!<br /><em>Happy Birthday</em> 🎂</h2>
      <div className="wish-card"><p>{text}<span className="cursor">|</span></p></div>
      <p className="signature">Chúc mừng sinh nhật ❤️</p>
      <button className="secondary-button" onClick={onReplay}>🎁 Chơi lại</button>
      <p className="thanks">Cảm ơn vì đã chơi. Chúc em có một ngày sinh nhật thật đáng nhớ!</p>
    </motion.section>
  );
}
