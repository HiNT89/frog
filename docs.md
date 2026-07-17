# 🐸 Happy Birthday - Frog Wishes

> Một website mini game được tạo như một món quà sinh nhật dành riêng cho một người bạn/em.
>
> Người nhận sẽ chơi một mini game nhỏ, sau đó mở khóa lời chúc sinh nhật đặc biệt ở cuối trò chơi.

---

# 1. Mục tiêu

Xây dựng một website sinh nhật có tính tương tác thay vì chỉ là một tấm thiệp.

Người nhận sẽ:

- Truy cập website.
- Chơi một mini game ngắn khoảng 1–2 phút.
- Hoàn thành thử thách.
- Mở khóa lời chúc sinh nhật được chuẩn bị riêng.

Website hướng đến trải nghiệm vui vẻ, bất ngờ và mang tính cá nhân.

---

# 2. Công nghệ sử dụng

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Phaser.js
- Framer Motion

Website hoàn toàn chạy phía Frontend, không cần Backend.

---

# 3. Ý tưởng

Lấy cảm hứng từ game Đào Vàng.

Nhân vật chính là một chú ếch đang ngồi trên lá sen.

Thay vì đào vàng, chú ếch sẽ sử dụng chiếc lưỡi của mình để bắt những chú côn trùng bay phía trên.

Sau khi đạt đủ số điểm yêu cầu, người chơi sẽ mở khóa món quà sinh nhật được chuẩn bị sẵn.

---

# 4. Gameplay

## Bắt đầu

Màn hình hiển thị:

```
🐸

Happy Birthday!

Nhấn để bắt đầu
```

Sau khi nhấn **Bắt đầu**, game sẽ chạy.

---

## Trong game

- Chú ếch ngồi trên lá sen.
- Tự động xoay trái - phải khoảng 180°.
- Người chơi nhấn chuột hoặc chạm màn hình.
- Lưỡi phóng theo hướng hiện tại.
- Nếu bắt được côn trùng sẽ cộng điểm.
- Nếu trượt, lưỡi sẽ thu về.

---

# 5. Các loại côn trùng

| Loại         | Điểm |
| ------------ | ---- |
| 🪰 Ruồi      | +10  |
| 🦋 Bướm      | +20  |
| 🦗 Châu chấu | +30  |
| ✨ Đom đóm   | +50  |

---

# 6. Mục tiêu

Ví dụ:

```
100 điểm
```

Khi đạt đủ điểm:

- Game kết thúc.
- Chú ếch nhảy lên.
- Hoa sen bắt đầu nở.
- Xuất hiện hiệu ứng pháo hoa.
- Mở khóa lời chúc sinh nhật.

---

# 7. Hiệu ứng

- Lá sen rung nhẹ.
- Sóng nước.
- Bong bóng nổi lên.
- Đom đóm phát sáng.
- Hiệu ứng khi bắt côn trùng.
- Animation hoa sen nở.

---

# 8. Âm thanh

Nhạc nền nhẹ nhàng.

Hiệu ứng:

- Tiếng nước.
- Tiếng ếch.
- Tiếng "Chụt" khi bắt côn trùng.
- Tiếng chiến thắng khi hoàn thành.

---

# 9. Màn hình chúc mừng

Sau khi hoàn thành game.

Hiệu ứng:

- Màn hình tối dần.
- Hoa sen nở.
- Pháo hoa.
- Confetti.
- Nhạc Happy Birthday.

Hiển thị:

```
🎉

Chúc mừng!

Bạn đã hoàn thành thử thách.
```

Sau vài giây sẽ hiện lời chúc.

---

# 10. Lời chúc

Ví dụ:

> 🎂 Happy Birthday!

> Chúc em luôn mạnh khỏe, luôn vui vẻ và gặp thật nhiều may mắn.

> Mong rằng tuổi mới sẽ mang đến thật nhiều điều tốt đẹp, nhiều niềm vui và đạt được những điều mình mong muốn.

> Hãy luôn giữ nụ cười và tận hưởng thật nhiều khoảnh khắc đẹp nhé!

> Chúc mừng sinh nhật ❤️

Có thể hiển thị theo hiệu ứng đánh máy (Typewriter).

---

# 11. Hình ảnh kỷ niệm (Tùy chọn)

Sau lời chúc có thể xuất hiện:

- Một album ảnh.
- Ảnh chụp chung.
- GIF vui.
- Video ngắn.
- Sticker.

Người xem có thể chuyển qua từng ảnh bằng hiệu ứng slider.

---

# 12. Kết thúc

Cuối website hiển thị:

```
❤️

Cảm ơn vì đã chơi.

Chúc em có một ngày sinh nhật thật đáng nhớ!
```

Có thể thêm nút:

```
🎁 Chơi lại
```

---

# 13. Cấu trúc dự án

```
src/
│
├── app/
│
├── components/
│   ├── Game/
│   ├── Birthday/
│   ├── Gallery/
│   ├── UI/
│
├── game/
│   ├── Frog/
│   ├── Tongue/
│   ├── Insects/
│   └── Scene/
│
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
│
├── hooks/
├── utils/
├── types/
└── styles/
```

---

# 14. Luồng trải nghiệm

```
Trang mở đầu

↓

Giới thiệu sinh nhật

↓

Bắt đầu mini game

↓

Bắt côn trùng

↓

Đủ điểm

↓

Hoa sen nở

↓

Pháo hoa

↓

Lời chúc sinh nhật

↓

Album ảnh (tùy chọn)

↓

Kết thúc
```

---

# 15. Mục tiêu cuối cùng

Website không hướng đến tính cạnh tranh hay điểm số cao.

Mục tiêu chính là tạo ra một trải nghiệm sinh nhật độc đáo, vui vẻ và đáng nhớ thông qua một mini game ngắn, giúp người nhận cảm thấy bất ngờ trước khi mở món quà là lời chúc được chuẩn bị riêng.
