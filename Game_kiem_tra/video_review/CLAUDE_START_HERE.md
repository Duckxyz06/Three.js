# Bàn giao cho Claude — University Map Simulator

Bạn là kỹ sư phụ trách sửa game hiện có. Hãy dùng gói này để xác minh và triển khai từng nhóm việc, không viết lại game từ video.

## Đọc tối thiểu trước

1. `01_EXECUTIVE_REVIEW.md`.
2. `03_FUNCTION_MATRIX.md`.
3. `tasks/T01.md`, sau đó chỉ mở task/issue/frame liên quan batch hiện tại.

Gói có 933 frame + 933 MD, nhưng không đọc hết vào context. Dùng `frames_manifest.csv`, `FRAME_ANALYSIS.md` và overview để định vị; đọc bản phân tích theo sự kiện và chỉ vài ảnh gốc cần đối chiếu. Nạp `issues.json` bằng script nếu cần lọc ID/priority thay vì đọc mọi issuecard.

## Phân biệt bằng chứng

- O01–O18: quan sát/giới hạn thiết kế từ bản ghi, chưa có nguyên nhân source được xác nhận.
- V01–V14: phải kiểm tra repo/runtime. Nút xuất hiện không chứng minh feature thành công hay thất bại.
- N01–N16: đề xuất bổ sung, kiểm tra đã có trước khi tạo.
- 933 MD được lập theo frame timestamp + bối cảnh phân đoạn; không phải 933 review thủ công độc lập.

## Việc cần làm theo thứ tự

T01 khảo sát → T02 HUD/panel → T03 input/camera → T04 nhãn/minimap → T05 POI/content → T06 đi bộ/route → T07 media/save → T08 performance/lifecycle → T09 gameplay MVP → T10 ads/release gate. Không triển khai toàn bộ cùng một patch. Có thể xử lý gate privacy sớm ở mức thiết kế, nhưng chưa thêm ads vào core loop đang lỗi.

## Mốc minh chứng ưu tiên

| Frame | Mốc | Dùng để xem |
|---|---|---|
| F000001 | 00:00.000 | HUD ba tầng, nút đỏ phải bị cắt, minimap, status/navigation bars |
| F000099 | 00:04.009 | Module công trình và bố cục khi nhìn gần |
| F000369 | 00:10.977 | Nhãn, góc nhìn gần khối nhà |
| F000682→683 | 00:19.996→20.138 | Chuyển góc mạnh + xuất hiện A8; chưa biết action gốc |
| F000693 | 00:20.985 | Header A8 bị cắt, card che cảnh và nội dung chưa xác minh |
| F000735 | 00:22.347 | Nhãn trên tiền cảnh và cây |
| F000753 | 00:23.779 | Camera rất sát tường; nhãn nhìn xuyên cảnh |
| F000758 | 00:23.997 | Mặt đứng, người nhỏ và panel |
| F000768 | 00:24.628 | Cây cọ/cấu trúc tối che cảnh |
| F000822 | 00:27.005 | A8, vòng chọn và minimap |
| F000933 | 00:30.365 | Trạng thái cuối đoạn quay |

Timestamp chính xác tra manifest; dùng tên `frames/frame_000753.jpg` và `frame_analysis/frame_000753.md`.

## Ràng buộc

Chưa xác định engine: đọc repo trước. Không đoán tên file, không tự đổi framework. Không suy FPS game/hao pin từ video. Không bịa nguồn kiến trúc hoặc biến mô hình giả định thành dữ liệu thật. Giữ cảnh báo độ tin cậy nhưng trình bày gọn trong phần nguồn. Không kết luận thiếu photo/video/walk/save chỉ vì clip không thử. Không cài thêm SDK/analytics ngoài nhu cầu; kiểm tra V13 trước phát hành ads. Không publish hay khai Play Console thay chủ dự án.

## Nghiệm thu mỗi batch

Tạo `PROGRESS.md` ghi task done/in progress/blocked, file thật đã sửa, test đã chạy và bằng chứng trước–sau cùng viewport. Dùng tiêu chí issuecards và `05_QA_ACCEPTANCE.md`. Báo riêng NOT RUN; không dùng văn mẫu “all tests passed” nếu chưa chạy.
