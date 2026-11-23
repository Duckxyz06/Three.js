# Phương pháp, nguồn và giới hạn

## Nguồn video

- Tệp: `Record_2026-11-17-13-36-02.mp4`
- Thời lượng: 30,380111 s; 933 frame; MP4/H.264, audio AAC mono 48 kHz.
- Kích thước coded: 720×1600; rotation metadata 90°; ảnh xem đã xoay đúng: 1600×720.
- SHA-256 video: `0c163c58380c6fc9c56eddc4c27cfef77bec6c37e0280d90882e9ea03970f29e`.

## Cách trích và lập ghi chú

FFprobe đọc danh sách PTS từng frame. FFmpeg xuất với fps-mode passthrough, không ép FPS cố định. Số ảnh được đối chiếu đúng 933. JPEG q=4 giữ kích thước hiển thị; mỗi ảnh có SHA-256 trong manifest. Cảnh gần trùng vẫn giữ ảnh/file Markdown riêng theo yêu cầu. Mốc phút:giây.mili-giây được làm tròn từ PTS gốc; không tính bằng số frame chia 30.

Rà overview khoảng 1 ảnh/giây và mở các frame đại diện gốc ở các mốc UI, chuyển cảnh, mặt đất, sát tường và A8. Các file frame Markdown dùng phân đoạn diễn biến cộng số đo tự động; chỉ rõ đâu là frame dẫn chứng trực tiếp của issue, đâu là bối cảnh kế thừa. Không giả danh đã thử nút/app.

`visual_delta_0_255` là mean absolute RGB difference của crop world bên trái `(72,285)-(895,640)` sau resize 160×72, so với frame trước. Nó phát hiện thay đổi ảnh, không đo tốc độ camera vật lý, FPS game hay độ trễ input. `pts_gap_ms` là khoảng giữa hai hình được ghi, có ảnh hưởng bởi screen recorder.

## Đo hình học trên screenshot

Vùng game ước lượng x=71..1512, y=71..720, tương đương 81.18% ảnh. Card x=904..1496, y=226..540, khoảng 19.88% vùng game. Đây là đo thủ công gần đúng từ screenshot, không phải UI hierarchy, không trừ alpha vùng trong suốt và không suy ra density/dp. Dải header 190px so với 649px vùng game chỉ phản ánh chiều cao chiếm dải trên.

## Những gì không đủ dữ liệu để kết luận

Engine/framework/version; source-level nguyên nhân lỗi; trạng thái Android native/WebView/browser; xác thực vị trí công trình; hoạt động của từng nút; âm thanh nghe thực; FPS/RAM/nhiệt runtime; ad consent/compliance; save/offline/lifecycle. Source metadata Android 13 là thuộc tính bản ghi, không thay thế thông số thiết bị test.

## Nguồn chính thức tham khảo — kiểm tra 17/11/2026

### S01 — Android — immersive/system bars

[Android — immersive/system bars](https://developer.android.com/develop/ui/views/layout/immersive)

Fullscreen có thể phù hợp game; cần xử lý system bars và insets khi chúng hiện lại. Không mặc định status bar trong video là lỗi game.

### S02 — Android — touch targets/accessibility

[Android — touch targets/accessibility](https://developer.android.com/guide/topics/ui/accessibility/apps)

Android khuyến nghị vùng tương tác tối thiểu 48×48dp. Pixel trong video không đủ xác định dp của thiết bị.

### S03 — Android — phân tích hiệu năng game

[Android — phân tích hiệu năng game](https://developer.android.com/games/optimize/gameperformance)

Đo runtime, xác định CPU/GPU bottleneck, tối ưu rồi so sánh trong điều kiện tương ứng; không dùng FPS video thay phép đo game.

### S04 — AdMob — interstitial guidance

[AdMob — interstitial guidance](https://support.google.com/admob/answer/6066980)

Interstitial nên ở điểm chuyển tiếp nội dung tự nhiên, tránh click ngoài ý muốn.

### S05 — AdMob — rewarded policies

[AdMob — rewarded policies](https://support.google.com/admob/answer/7313578)

Rewarded thông thường phải do người dùng chọn rõ ràng; mô tả phần thưởng trung thực và tuân yêu cầu định dạng.

### S06 — AdMob — UMP Android

[AdMob — UMP Android](https://developers.google.com/admob/android/privacy)

Kiểm tra/cập nhật consent information khi mở app và hiển thị form nếu cần; quản lý quyền request ads theo SDK.

### S07 — Google Play — User data

[Google Play — User data](https://support.google.com/googleplay/android-developer/answer/10144311)

Khai Data safety và privacy policy đúng dữ liệu thực, gồm cả SDK bên thứ ba.

### S08 — Google Play — target audience

[Google Play — target audience](https://support.google.com/googleplay/android-developer/answer/9867159)

Nhóm tuổi khai báo phải phản ánh sản phẩm; nếu gồm trẻ em thì có yêu cầu Families và ads SDK liên quan.
