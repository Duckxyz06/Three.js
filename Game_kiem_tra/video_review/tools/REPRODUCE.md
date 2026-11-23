# Tái tạo dữ liệu hình

Python 3, Pillow, NumPy, FFmpeg và FFprobe. Hai script lưu kèm nhằm mô tả quy trình đã dùng; layout gốc khi chạy là `game_video_review/{extract_video.py, measure_frames.py, input/Record_2026-11-17-13-36-02.mp4}`. Đặt bản sao script tại thư mục cha chứa input rồi chạy extract_video.py trước, measure_frames.py sau. Không chạy extraction đè thư mục frame đã có. Font contact sheet dùng Arial tại Windows; đổi đường dẫn font nếu chạy hệ khác.

Ảnh giải mã đúng rotation nguồn. Đếm lại frame bằng FFprobe; đối chiếu tên ảnh/timestamp với manifest. Không force constant FPS vì clip có PTS biến thiên. Nếu image2 cảnh báo DTS trùng do timebase JPEG, kiểm tra số ảnh và PTS đầu vào; không suy ra thiếu frame từ riêng cảnh báo đó. Toàn bộ 933 ảnh đã được đối chiếu đếm trong lần trích này.

Script dựng báo cáo và danh sách issue riêng không cần để Claude sửa game; nguồn dữ liệu đầy đủ đã nằm trong issues.json và manifest. Bản gốc video không kèm ZIP.
