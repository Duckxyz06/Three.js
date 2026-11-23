# Quảng cáo dự kiến — kế hoạch tích hợp có điều kiện

Người phát triển đã nói dự định gắn quảng cáo. Không có ads/consent flow được nhìn thấy trong clip; không kết luận bản hiện tại vi phạm hay đã tích hợp SDK.

## Vị trí đề xuất cho loại game này

- Giữ free exploration và dẫn đường cốt lõi dùng được khi không có ads/no-fill/offline.
- Nếu dùng interstitial: chỉ xem xét tại điểm ngắt tự nhiên như **kết thúc một tuyến tham quan**, không bật khi kéo camera, chọn POI, đang đi bộ, bấm Back hoặc vừa mở app. AdMob hướng dẫn đặt ở chuyển tiếp hợp lý [S04]. Frequency cap phải cấu hình và đánh giá người dùng; không có con số “chuẩn Google” được suy ra ở đây.
- Nếu dùng rewarded: người chơi chủ động chọn để nhận phần thưởng tùy chọn được mô tả rõ; không dùng thông điệp gây áp lực. Chỉ cấp thưởng theo callback hợp lệ và chống cấp trùng. Chính sách cho rewarded thông thường yêu cầu opt-in; rewarded interstitial là định dạng khác, không trộn luồng [S05].
- Chưa nên đặt banner sát joystick, minimap, nút chụp hoặc nút đóng panel; thiết kế khoảng cách ngăn click nhầm.

## Việc Claude phải làm

1. Xác định host/engine/plugin ads hỗ trợ thực tế, SDK versions và permissions; không cài quảng cáo bằng code giả ở scene.
2. Tách AdService/PrivacyService; dùng test IDs và thiết bị test khi phát triển.
3. Nếu dùng AdMob UMP: cập nhật consent information mỗi lần mở app, hiển thị form nếu được yêu cầu, chỉ request ads khi trạng thái SDK cho phép; cung cấp privacy options khi cần [S06]. Không hardcode “mọi nơi đều phải hiện consent” hoặc “không cần consent ở mọi nơi”.
4. Lập inventory dữ liệu từ code **và SDK**. Privacy policy và Data safety khớp hành vi thật; kiểm tra app có account thì xử lý thêm yêu cầu liên quan. User data policy nêu rõ trách nhiệm dữ liệu SDK [S07].
5. Chốt nhóm tuổi sản phẩm trung thực. Nếu có nhóm trẻ em, áp dụng yêu cầu Families phù hợp; không tự chọn 18+ chỉ để bỏ yêu cầu [S08].
6. Test consent/no-fill/offline/cancel/background; không chặn camera/tour vì SDK quảng cáo lỗi.

## Ngoài phạm vi đoạn quay

Chưa biết tài khoản trader đã khai gì, SDK đang có, quốc gia phát hành, dữ liệu quảng cáo/analytics, nhóm tuổi chính thức hay privacy URL. Claude cần xác minh các điểm này từ cấu hình và quyết định sản phẩm; báo cáo không xác nhận “đạt chính sách” chỉ vì game có hình ảnh lành mạnh.
