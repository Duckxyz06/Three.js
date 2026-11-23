# Nhận định chính

Bản hiện tại đã có một nền tảng tham quan khuôn viên 3D: toàn cảnh, công trình gắn mã, minimap, lựa chọn điểm và bảng thông tin. Vấn đề nên sửa đầu tiên là **khả năng nhìn và điều khiển trên điện thoại**, sau đó mới tăng số lượng công trình hoặc tính năng chơi.

## Những gì thực sự thấy được

1. UI chiếm nhiều chiều cao, một nút đỏ bên phải bị cắt. Xem F000001, F000099.
2. Card A8 bị cắt tiêu đề; nó chiếm xấp xỉ 19,88% vùng game ước lượng, chưa tính HUD và minimap. Xem F000693.
3. Nhãn xa hiện trên cây/tường, nhiều mã/nhãn chen vào vùng quan sát ở góc thấp. Xem F000735 và F000753.
4. Có góc camera rất sát tường và tán cây che cảnh. Xem F000753–F000768. Chưa chứng minh collision xuyên vật thể.
5. Card A8 tự ghi nhận hình học còn giả định. Cần giữ độ minh bạch đó, đồng thời bổ sung thông tin công năng hữu ích có nguồn.
6. Khi xem hết video, vẫn chưa có bằng chứng đủ để kiểm chứng chụp ảnh, quay phim, đi bộ đến đích, bản đồ phẳng hay thay đổi giờ.

## Điểm đang làm được nên giữ

- Hình toàn trường dễ liên tưởng bản đồ mô phỏng; có nhiều landmark/sân/đường để khám phá.
- Có các preset/đường vào chức năng thay vì buộc người dùng thao tác camera thuần túy.
- Minimap và time-of-day đã có vị trí trong HUD.
- Có NPC nhỏ trong cảnh; cần kiểm tra hệ hiện có trước khi bổ sung.
- Nội dung A8 đã phân biệt phần mô phỏng chưa xác minh; không nên xóa ghi chú này để làm dữ liệu có vẻ chính xác hơn.

## Trình tự nên giao Claude

| Thứ tự | Nhóm | Kết quả cần có |
|---|---|---|
| 1 | Nhận diện repo/build | Xác định engine, bản chạy, đường dẫn module thật, baseline screenshot và test |
| 2 | HUD và panel | Không cắt nút/tiêu đề; panel không che mục tiêu; layout theo safe-area |
| 3 | Input và camera | Tap/drag/pinch tách biệt, UI không điều khiển world; chuyển mode có hủy |
| 4 | Nhãn và minimap | Occlusion/priority/clamp; phân biệt vị trí, hướng, đích |
| 5 | POI và đường đi | Tên/công năng có nguồn; tìm kiếm; đích là lối vào hợp lệ |
| 6 | Chụp/quay/giờ/lifecycle | Thử end-to-end có kết quả thực, phục hồi sau background |
| 7 | Hiệu năng | Số đo runtime trên máy thật trước–sau, giảm chi phí đúng bottleneck |
| 8 | Gameplay MVP | Onboarding → tuyến 5 điểm → ghi nhận khám phá → phần thưởng nội bộ |
| 9 | Quảng cáo | Chỉ triển khai sau luồng chính ổn, có test ads/consent/data declarations |

## Không nên làm ngay

Không viết lại toàn bộ engine, không thay tất cả asset thành high-poly, không thêm multiplayer/server/account chỉ để làm bản đồ tham quan, không gắn ads giữa thao tác camera, không coi 30 giây video là đủ xác nhận mọi nút đã hoạt động.

## Phạm vi ưu tiên MVP

Một người chơi tìm địa điểm → biết đường tới → xem thông tin có nguồn → hoàn thành một tuyến ngắn → lưu tiến trình. Photo mode và nội dung NPC nên phục vụ luồng này. Các tính năng kiếm tiền không được làm hỏng vòng chơi miễn phí.
