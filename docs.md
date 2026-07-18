# 🐸 Frog's Little Quest

Mini game sinh nhật trên web: người chơi giúp chú ếch bắt côn trùng trên hồ sen để mở khóa lời chúc cuối hành trình.

## Luồng trải nghiệm

1. **Mở đầu** — Hiển thị tiêu đề *Frog's Little Quest*, mô tả thử thách và nút **Bắt đầu**.
2. **Chơi game** — Bắt côn trùng để tích lũy đủ 100 điểm.
3. **Lời chúc** — Khi đạt mục tiêu, game chuyển sang màn hình chúc mừng; lời chúc được hiển thị theo hiệu ứng đánh máy. Người chơi có thể chọn **Chơi lại** để trở về màn hình mở đầu.

Người chơi có thể bật/tắt trạng thái âm thanh bằng nút ở góc trên phải hoặc phím `M`. Hiện tại dự án chưa phát file âm thanh; trạng thái này chỉ được phản ánh trên giao diện game.

## Gameplay

- Chú ếch đứng trên lá sen và trôi nhẹ qua lại theo chiều ngang.
- Côn trùng xuất hiện từ hai mép hồ, bay ngang ở các độ cao khác nhau và có chuyển động nhấp nhô.
- Nhấp/tap vào vùng game hoặc nhấn `Space` để ếch phóng lưỡi thẳng lên.
- Một lần phóng chỉ bắt được côn trùng nằm phía trên ếch, trong vùng ngang hẹp của lưỡi; mục tiêu gần nhất được bắt trước.
- Nếu không có mục tiêu hợp lệ, lưỡi vẫn phóng lên và thu về nhưng không cộng điểm.
- Mỗi lần bắt được côn trùng, điểm nhận ngẫu nhiên là `10`, `20`, `30` hoặc `50`; tổng điểm được giới hạn tối đa ở `100`.
- Khi đạt `100` điểm, game hoàn tất sau một khoảng ngắn để hiển thị hiệu ứng bắt cuối cùng.

Tối đa tám côn trùng có thể cùng tồn tại trên màn hình. Côn trùng bay ra ngoài khung sẽ tự được loại bỏ.

## Hiệu ứng trong game

- Mặt nước có các gợn sóng chuyển động liên tục quanh hồ và lá sen.
- Ếch nhấp nhô khi trôi, co giãn khi bắt trúng côn trùng.
- Hai chú ốc và cua ở hồ vẫy tay/chuyển động ăn mừng mỗi lần bắt trúng.
- Điểm thưởng hiện nổi ở giữa màn hình; phần thưởng `+50` kèm biểu tượng ✨.
- Màn hình lời chúc có hoa sen, các tia pháo hoa dạng ký tự và hiệu ứng typewriter.

## Khả năng hiển thị

Game được thiết kế cho màn hình lớn. Với màn hình hẹp hơn `680px`, hoặc màn hình thấp trong một số kích thước nhỏ, khu vực game sẽ hiển thị thông báo đề nghị mở trên máy tính hoặc máy tính bảng ngang. Màn mở đầu và lời chúc vẫn có giao diện responsive.

## Công nghệ

- Next.js 15 với App Router
- React 19 và TypeScript
- Phaser 3 để vẽ và vận hành mini game trên canvas
- Framer Motion cho chuyển cảnh và animation giao diện
- Tailwind CSS 4 (được nạp trong stylesheet toàn cục)

Ứng dụng chạy hoàn toàn ở phía client, không dùng backend hay cơ sở dữ liệu.

## Cấu trúc dự án hiện tại

```text
src/
├── app/
│   ├── layout.tsx          # Layout gốc của Next.js
│   ├── page.tsx            # Điều phối các màn intro, game và lời chúc
│   └── globals.css         # Toàn bộ style và responsive rules
└── components/
    ├── Game/
    │   └── FrogGame.tsx    # Phaser scene và logic bắt côn trùng
    └── Birthday/
        └── BirthdayWish.tsx # Màn hình chúc mừng, typewriter và chơi lại
```

## Chạy dự án

```bash
npm install
npm run dev
```

Để kiểm tra bản production:

```bash
npm run build
npm run start
```
