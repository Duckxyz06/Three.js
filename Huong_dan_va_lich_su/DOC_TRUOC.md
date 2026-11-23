# Gói tiếp nối — Kết nối Claude

Ngày đóng gói: 24/11/2026. Đây là bản sao phục vụ phiên mới, không phải bản xuất đầy đủ từ ChatGPT.

## Bắt đầu phiên mới
Giải nén ZIP, cung cấp thư mục này cho trợ lý và nói: “Đọc DOC_TRUOC.md cùng lịch sử, tiếp tục dựng tòa H1 bằng Three.js theo tài liệu tham chiếu; rà soát tệp trước khi thay đổi.” Hỏi lại tệp tham chiếu H1 nếu thiếu.

## Mục tiêu và tiến độ
- Hỗ trợ dự án mô hình 3D khuôn viên Đại học Đồng Tháp, tiết kiệm công sức khi phối hợp với Claude. Tại lần kiểm tra trước, chưa có kết nối Claude trực tiếp.
- Nghiên cứu nguồn ảnh thật và bộ nhận diện; cần giữ nguyên logo chính thức, không tự vẽ hoặc sửa logo.
- Đã tạo tài nguyên Trung tâm Ngoại ngữ Tin học FLiC: mô hình Three.js, GLB, ảnh 4 góc và bảng/poster. Xem thư mục Tai_nguyen và README bên trong từng dự án. Kích thước, mái, phần khuất là ước dựng.
- Có các tệp đầu vào kiểm tra game và video trong Game_kiem_tra; lịch sử có thể chứa nhận xét bổ sung.
- Yêu cầu cuối: dựng tòa H1 bằng Three.js, cả ngoài và trong theo tham chiếu; các lần thử gần nhất bị gián đoạn. Chưa có căn cứ xác nhận mô hình H1 hoàn tất. Trước đó cũng có yêu cầu phục dựng toàn bộ bảng/poster.
- Đã có báo cáo tạo ba ảnh H1 gồm 12 góc, nhưng chưa xác nhận tệp ảnh nằm trong gói.

## Lịch sử
- Tệp 6afbb8c4...json: các lượt ChatGPT được công cụ trả về và danh sách tên tệp đính kèm.
- Tệp 6afbb8c6...-messages.json và 6afbc1e6...-messages.json: tin nhắn đọc được từ hai luồng công việc Codex, sắp xếp mới trước. Tệp 6afbc1e6...json chứa thông tin bổ sung của 10 lượt gần nhất.
- Công cụ không thể đọc một lượt quá lớn trong luồng thứ hai nên 24 lượt mới nhất được lưu; các lượt cũ hơn không thể truy xuất qua công cụ này. Một số nội dung công cụ/đầu ra có thể bị rút gọn; không coi đây là bản ghi toàn vẹn.
- Các ảnh/tệp tạo trên thư viện đám mây không được tự động đưa vào nếu không có bản cục bộ.

## Tài nguyên bị thiếu
Các tệp đính kèm Tham chiếu 360(2).zip, H1(3).zip, Tham chiếu 360(1).zip và H1(2).zip được liệt kê trong chat nhưng đường dẫn tạm không còn trên máy tại thời điểm đóng gói. Cần cung cấp lại nếu phiên mới cần dựng chính xác. Các file kỹ thuật transfer và thông tin phiên bị loại để tránh đóng gói thông tin truy cập.

## Cách dùng
Mở Tai_nguyen/FLiC_ThreeJS/README.md để biết cách chạy FLiC; bản HTML ngoại tuyến nằm trong cùng thư mục. Đường dẫn localhost hoặc sandbox trong lịch sử là của phiên cũ, không đảm bảo còn hoạt động.
