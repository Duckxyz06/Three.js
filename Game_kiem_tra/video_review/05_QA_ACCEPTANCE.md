# Kiểm thử và nghiệm thu

Các mục dưới đây là kế hoạch, **chưa được chạy trên game**. Gói chỉ đã kiểm tra trích frame, số lượng, liên kết tài liệu và ZIP. Không đánh dấu PASS nếu chỉ nhìn thấy nút.

| Test | Cách thử | Điều kiện đạt | Liên quan |
|---|---|---|---|
| Q01 | Mở game tại 16:9, 20:9, cửa sổ hẹp | Không cắt nút/header; HUD nằm trong safe area | O01–O04,O14 |
| Q02 | Mở A8 và tăng font scale | Tiêu đề/đóng/nội dung đầy đủ; body scroll nếu cần | O03,V12 |
| Q03 | Mở/đóng panel 30 lần | Không lệch layout, không listener lặp | O03,O04 |
| Q04 | Chạm/scroll panel khi camera đang chạy | Không phát world tap hay camera drag | V01 |
| Q05 | Pinch từ 2 ngón rồi nhả 1 ngón | Không bật POI, không teleport | V01 |
| Q06 | Drag mạnh ngoài viewport rồi pointercancel | Không stuck control | V01 |
| Q07 | Bay tới 5 POI và hủy bằng chạm | Transition hủy đúng; chỉ một controller hoạt động | V06,O10 |
| Q08 | Home trong Orbit/Walk/Tour/Photo | Về preset hợp lệ, không tween cũ kéo ngược | V06 |
| Q09 | Camera đi sát tường/cây/mặt đất | Đúng quy tắc mode, không kẹt/xuyên ở Walk | O08,O09,V02 |
| Q10 | Che POI bởi tòa nhà/cây | Nhãn theo policy, không gắn nhầm vật trước mặt | O05 |
| Q11 | Xoay map mọi góc với label bật | Không overlap selected/HUD; cỡ chữ clamp | O06,O11 |
| Q12 | 5 landmark world/map/minimap roundtrip | Sai số trong tolerance đã chốt và có unit thực | V08 |
| Q13 | Đi bộ tới POI có entrance | Tới lối vào, dừng rõ, có đường đi | V03,N02 |
| Q14 | Chọn POI không có đường | Thông báo và giữ quyền điều khiển | V03,N02 |
| Q15 | Tìm a8/tên có dấu/không dấu | Trả đúng POI, empty state hợp lệ | N01 |
| Q16 | Chụp có và không HUD | Tệp mở được đúng chiều, có preview | V04,N10 |
| Q17 | Quay 10s/start-stop nhanh/background | Tệp phát được; không chạy 2 recorder; có lỗi hữu ích | V05 |
| Q18 | Từ chối quyền, hết bộ nhớ, host unsupported | Không treo/không báo thành công giả | V04,V05 |
| Q19 | Kéo giờ sáng/trưa/chiều/tối | Nhãn/ánh sáng sync; scene còn nhìn được | V07 |
| Q20 | Đổi app/resume, Back, mạng tắt | State và safe area phục hồi; không mất save | V10,V14 |
| Q21 | Cold launch/reload với save lỗi | Recovery/migration rõ, không trắng màn hình | V14 |
| Q22 | Chuyển VI↔EN/font lớn | Không string thiếu/cắt, POI ID không đổi | N12,N14 |
| Q23 | Bật Reduce motion/sensitivity | Input/camera tuân cấu hình và được lưu | N13 |
| Q24 | Hoàn thành tuyến 5 POI | Progress idempotent, không thưởng lặp | N04,N05 |
| Q25 | Chạy 10 phút trên máy mục tiêu | Báo cáo p50/p95/p99 frame time, RAM/thermal trước–sau | V09,N11 |
| Q26 | Low/Medium/High cùng camera | Cải thiện đo được, UI vẫn nét | N11 |
| Q27 | Consent required/not required/deny/error | Ads request theo SDK state hợp lệ; game vẫn dùng được | V13 |
| Q28 | Mất mạng/no-fill/quảng cáo đóng | Không khóa gameplay; không tự trao thưởng trước callback đúng | V13 |
| Q29 | Chơi camera/đi bộ và kết thúc tuyến | Không interstitial giữa thao tác; placement đúng thiết kế | V13 |
| Q30 | Đối chiếu SDK + traffic + Privacy + Data safety | Không tuyên bố không thu dữ liệu khi SDK có thu | V13 |

## Mẫu ghi kết quả

`Test ID | commit/build | device/OS | viewport/density | mode/POI | steps | expected | actual | PASS/FAIL/NOT RUN | screenshot/log`

## Điều kiện chốt bản thử nghiệm

Không còn UI clipping ở các viewport đã cam kết; core input và Home ổn định; ít nhất 5 POI và tuyến đi có dữ liệu đúng; capture/quay chỉ bật nếu hoạt động end-to-end trên host mục tiêu; không crash ở smoke test vòng đời; có baseline hiệu năng. Nếu gắn ads, hoàn tất V13 và dùng test ads trong bản QA. Đây là đề xuất nghiệm thu kỹ thuật, không thay thế kiểm duyệt Google Play.
