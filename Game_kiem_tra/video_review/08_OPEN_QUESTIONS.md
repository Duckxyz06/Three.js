# Cần Claude xác minh khi có mã nguồn

Không cần hỏi người dùng những thứ đọc được từ repo. Trước tiên tìm các câu trả lời sau và ghi kèm đường dẫn file thật.

1. Engine/framework/version và host Android: native game, WebView, PWA hay browser?
2. Entry point, camera controller, label renderer, HUD và POI data nằm ở đâu?
3. Bản ghi tương ứng build/commit nào? Có cùng map/content với nhánh hiện tại không?
4. Nút đỏ bên phải là gì, clipping do layout nào?
5. Panel A8 header có offset âm, clip hay z-order sai?
6. Nhãn có depth test/occlusion hiện tại không? Tần suất update và ngân sách ra sao?
7. Camera gần tường là thao tác tự do hay chuyến Bay tới? Có policy min distance/collision theo mode không?
8. Đi bộ tới đây điều khiển avatar, camera hay teleport? Có pathfinding và entrance node không?
9. World/minimap/2D dùng chung projection và POI ID không?
10. Chụp/quay hỗ trợ nền tảng mục tiêu nào, trả trạng thái thật hay chỉ trigger tải?
11. NPC đã có animation, dialogue, LOD chưa?
12. Nguồn 2026 của map/POI và quyền dùng hình/logo ở đâu? Chi tiết nào là inferred?
13. Runtime profiling, crash log, device tier và mục tiêu FPS/RAM là gì?
14. Save/localization/accessibility đã có ở đâu, không tạo lại nếu có thể mở rộng?
15. Ads/analytics SDK nào đã cài, quốc gia phát hành/nhóm tuổi đã chốt chưa, privacy URL và consent config có chưa?

Các quyết định sản phẩm còn thiếu mà repo không trả lời được: bản thử ưu tiên người tham quan hay gameplay nhiệm vụ; có muốn giữ bản đồ mô phỏng thay vì tái dựng chuẩn kiến trúc; mức thu thập dữ liệu và vị trí quảng cáo mong muốn. Làm các sửa UI/camera có căn cứ trước khi phụ thuộc các lựa chọn này.
