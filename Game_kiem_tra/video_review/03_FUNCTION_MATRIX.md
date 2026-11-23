# Ma trận chức năng

“Có nút” không đồng nghĩa “đã kiểm thử thành công”. Video bắt đầu khi bản đồ đã mở, không có quy trình launch hay toàn bộ menu.

| Chức năng | Bằng chứng trong video | Kết luận hợp lệ | Cần cải thiện/kiểm tra |
|---|---|---|---|
| Hiển thị bản đồ 3D | Toàn bộ clip | Có hoạt động render bản đồ | O15–O17, V09 |
| Thay đổi góc nhìn/độ gần | Cảnh biến đổi từ trên cao tới sát nhà | Có thay đổi camera; chưa biết action gốc | O08–O10, V01,V02 |
| Chọn POI và mở card | A8 xuất hiện F000683 đến cuối | Card hiển thị; chưa xác nhận tap chính xác | O03,O04,O07,V01 |
| Danh mục | Nút hiển thị | Chưa mở trong bản ghi | Search/filter có thể đã nằm trong menu: N01 |
| Tham quan | Nút hiển thị | Chưa xác định trạng thái playback | V06 |
| Về trường | Nút hiển thị | Chưa có before/after gắn thao tác | V06 |
| Chụp ảnh | Nút hiển thị | Chưa có file xuất để kiểm chứng | V04,N10 |
| Quay phim | Nút hiển thị | Chưa có file xuất/recorder state | V05; icon quay status bar có thể từ OS |
| Ẩn giao diện | Nút hiển thị | Chưa thấy UI biến mất | Test ẩn/hiện và nút phục hồi |
| Tổng quan/Nhà Khát Vọng/Cổng A/Góc ảnh/Sân bóng | Hàng preset hiển thị | Chưa đối chiếu từng click | V06,V11 |
| Bản đồ phẳng | Nút hiển thị | Chưa thấy chuyển 2D | V08 |
| Bay tới | Nút trong card | Chưa có action log xác định đoạn bay | V02,V06 |
| Đi bộ tới đây | Nút trong card | Chưa chứng minh path/đến đích | V03,N02 |
| Minimap | Hiện toàn clip, có marker | Đã render, chưa kiểm chứng mapping | O12,V08 |
| Thời gian/ngày đêm | Slider 15:30 hiện toàn clip | Chưa thấy kéo slider | V07 |
| Nhãn công trình | Nhãn nổi rõ ở góc gần | Có hệ label; occlusion/density cần sửa | O05,O06,O11 |
| NPC | Có các người nhỏ một số cảnh | Có representation người; chưa chứng minh dialogue/AI | O18,N07 |
| Nút đỏ hình thẻ ở mép phải | Bị cắt | Không đọc rõ tên/chức năng | O02; tìm handler thật |
| Lưu tiến trình/cài đặt | Không thấy trong đoạn quay | Chưa kiểm chứng | V14 |
| Âm thanh/narration | Có audio stream trong MP4 | Chưa nghe/thẩm định | N08 |
| Quảng cáo/consent | Không hiện trong clip | Dự kiến người dùng muốn thêm | V13 và 06_ADS_AND_PRIVACY.md |
| Nhiệm vụ/bộ sưu tập | Không được thể hiện | Chưa kiểm chứng; đề xuất MVP nếu chưa có | N04,N05 |
