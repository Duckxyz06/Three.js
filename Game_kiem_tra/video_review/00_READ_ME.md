# University Map Simulator — gói phân tích video

Nguồn: `Record_2026-11-17-13-36-02.mp4`. Ngày phân tích: 17/11/2026, giờ Việt Nam.

## Kết quả

- **933 ảnh frame JPEG**, giữ nguyên độ phân giải hiển thị **1600 × 720**, đúng thứ tự 1–933, không lấy mẫu bỏ frame và không sinh frame bù.
- **933 file Markdown**, mỗi frame có timestamp PTS thực, ảnh, diễn biến, số đo hình và liên kết vấn đề liên quan.
- **48 mục công việc**: 18 quan sát/giới hạn từ video, 14 mục phải kiểm tra khi chạy, 16 đề xuất tính năng. **Không phải 48 lỗi đã được xác nhận.**
- 20 contact sheet chứa toàn bộ frame + 1 overview gần mỗi giây; chỉ mục HTML mở offline.
- 10 gói tác vụ Claude, tiêu chí nghiệm thu, phương án kiến trúc và ma trận kiểm thử.

## Đọc theo nhu cầu

| Mục đích | Tệp |
|---|---|
| Gửi cho Claude, tiết kiệm ngữ cảnh | [CLAUDE_START_HERE.md](CLAUDE_START_HERE.md) |
| Nhận định và thứ tự sửa | [01_EXECUTIVE_REVIEW.md](01_EXECUTIVE_REVIEW.md) |
| Tất cả 48 mục | [02_ALL_ISSUES.md](02_ALL_ISSUES.md), [issues.json](issues.json) |
| Chức năng đang thấy/chưa kiểm chứng | [03_FUNCTION_MATRIX.md](03_FUNCTION_MATRIX.md) |
| Toàn bộ frame theo timestamp | [FRAME_ANALYSIS.md](FRAME_ANALYSIS.md), [index.html](index.html) |
| Hướng triển khai kỹ thuật | [04_TECHNICAL_APPROACH.md](04_TECHNICAL_APPROACH.md) |
| Kiểm thử, tiêu chí phát hành | [05_QA_ACCEPTANCE.md](05_QA_ACCEPTANCE.md) |
| Quảng cáo dự kiến và dữ liệu | [06_ADS_AND_PRIVACY.md](06_ADS_AND_PRIVACY.md) |
| Nguồn + phương pháp + giới hạn | [07_METHOD_AND_SOURCES.md](07_METHOD_AND_SOURCES.md) |
| Cần Claude xác minh từ repo | [08_OPEN_QUESTIONS.md](08_OPEN_QUESTIONS.md) |

## Giới hạn cần giữ khi bàn giao

Đây là **phân tích bản ghi 30,380111 giây**, không phải review source code, APK hay phiên chơi trực tiếp. Phần hình đã được rà qua overview và các frame đại diện phóng lớn; ghi chú từng frame được sinh theo đoạn diễn biến có đối chiếu mốc minh chứng và số đo tự động, **không phải 933 bản kết luận thủ công độc lập**. Frame trong cùng đoạn dùng lại bối cảnh để không bịa ra lỗi mới ở các hình gần trùng.

Không kết luận chức năng không có chỉ vì chưa mở trong video. Không quy FPS bản ghi thành FPS game, không suy hao pin từ % pin trên status bar. Audio có trong container nhưng chưa được nghe/thẩm định; gói này tập trung hình ảnh và UX.

JPEG là bản trích có nén (FFmpeg q=4), không phải PNG lossless. Rotation 90° của nguồn đã được áp dụng để xem đúng chiều; không crop, không vẽ đè lên frame gốc. Video nguồn không kèm lại trong ZIP để tránh nhân đôi dung lượng; SHA-256 và metadata có trong gói.

## Mức ưu tiên

- P0: điều kiện phải xử lý **trước khi phát hành có quảng cáo**; không có nghĩa đã thấy crash/lỗ hổng trong video.
- P1: sửa/kiểm tra sớm vì ảnh hưởng thao tác cốt lõi.
- P2: nâng chất lượng hoặc hoàn thiện trải nghiệm sau luồng chính.
- P3: làm sau khi bản chính ổn định.

Mọi ngưỡng UI, FPS, thời gian ở báo cáo là **mục tiêu nghiệm thu đề xuất** nếu không ghi nguồn chuẩn cụ thể. Đây chưa phải chứng nhận được Google Play phê duyệt.
