# Phương pháp kỹ thuật cho Claude

## 1. Xác định stack trước

Video không cho biết engine. Tìm `project.godot`, `package.json`, scene/prefab files, Android `build.gradle*`, Unity `Assets`/`ProjectSettings`; xem entry point và export config. Chỉ chọn cách sửa cho stack thực có; không tự dựng project mới.

| Trách nhiệm | Nếu Godot | Nếu web/Three.js | Nếu Unity |
|---|---|---|---|
| HUD | Control/containers/anchors và safe area | DOM/CSS responsive + canvas resize | Canvas/RectTransform/safe area |
| Camera | Camera3D controller theo mode | Camera + control wrapper theo mode | Camera rig/controller theo mode |
| POI selection | Physics query + POI registry | Raycaster + POI registry | Physics query + POI registry |
| Nhãn | UI/3D labels có visibility policy | DOM/projected label hoặc sprite có policy | World-space UI/label manager |
| Đường đi | Graph/navmesh qua adapter | Graph/navmesh qua adapter | Graph/navmesh qua adapter |

Đây là ánh xạ trách nhiệm khái niệm, không phải code API khớp mọi phiên bản. Claude phải đọc docs đúng version sau khi biết engine.

## 2. Hợp đồng dữ liệu dùng chung

```json
{
  "id": "A8",
  "displayName": {"vi": "[TÊN ĐÃ XÁC NHẬN]", "en": "[VERIFIED NAME]"},
  "category": "study",
  "position": {"x": 0, "y": 0, "z": 0},
  "entranceNodeId": null,
  "aliases": ["a8"],
  "contentStatus": "unverified",
  "geometryStatus": "inferred",
  "sources": [],
  "lastVerifiedAt": null
}
```

Các tọa độ 0 và tên trong ngoặc chỉ là schema ví dụ, **không phải dữ liệu trường để import vào game**. Chung một POI store cho minimap, 2D map, world mesh, panel, search và quest. Stable ID tách khỏi tên bản dịch; không copy dữ liệu qua nhiều mảng khó đồng bộ. Entrance chưa xác nhận phải null/disabled route, không điều hướng đến tâm mesh.

## 3. Camera/input state machine

Các mode ví dụ `Overview`, `Orbit`, `Walk`, `Tour`, `Photo`. Mỗi thời điểm chỉ một controller có quyền ghi camera. Transition tự động sở hữu token hủy; lệnh mới hủy lệnh cũ trước khi chạy. Input camera bị chặn khi pointer thuộc UI. Cần phân biệt drag/pinch/tap và xử lý pointer-cancel.

Pseudo-code, không phải code dán nguyên vào engine:

```text
on_pointer_start(event):
    owner = hit_test_ui(event.position) ? UI : WORLD
    recognizer.begin(event.pointer_id, owner)

on_pointer_end(event):
    if recognizer.owner(event.pointer_id) == UI: return
    if recognizer.was_tap_without_pinch_or_drag(event.pointer_id): select_poi()

request_camera_transition(goal):
    current_transition.cancel()
    input_mode.disable_conflicting_controller()
    goal = validate_clearance_and_bounds(goal)
    current_transition = transition_to(goal, cancellable=True)
```

Nút Home cần reset camera **và** hủy transition/walk/tour có liên quan, không chỉ ghi position một lần. Đích Bay tới cần distance theo bounding volume, FOV và phần viewport không bị panel che.

## 4. Label manager

Pipeline: frustum → distance/importance → occlusion → screen-space overlap → HUD exclusion → scale clamp → render. Mục tiêu được chọn có thể có leader line/marker riêng; tránh ẩn toàn bộ nhãn khiến mất định hướng. Tính occlusion theo budget và cache, không mặc định raycast mọi nhãn mỗi frame. Hysteresis/debounce để nhãn không nhấp nháy.

## 5. Tọa độ map và đường đi

Quy định world axes, map bounds, scale, padding và north. Với affine map đơn giản, normalize x/z vào [0,1], áp phép xoay/đảo trục **đã xác nhận** rồi ra pixel. Test world→map→world cho ít nhất 5 landmark. Dùng graph đường đi bộ có chiều dài, entrance node, thuộc tính được đi; A* hoặc navmesh phù hợp. Đường không tồn tại phải báo trạng thái, không teleport im lặng qua tường.

## 6. Media/services

Tách `CaptureService`, `RecordingService`, `SaveStore`, `PrivacyAdsAdapter` khỏi scene logic. Mỗi service trả kết quả typed: success/cancel/unsupported/error. Capture không coi download-trigger là đã lưu xong. Recorder cần state hữu hạn và kiểm tra khả năng host thực hỗ trợ; không giả định web recorder chạy như native Android. Không yêu cầu quyền microphone nếu sản phẩm chỉ xuất video câm và không dùng microphone.

## 7. Hiệu năng theo số đo

Đo runtime cùng scene và thiết bị; nhận diện CPU/GPU/memory bottleneck. Chỉ sau đó chọn batching/instancing, LOD, frustum/occlusion culling, texture atlas, shadow distance hoặc cập nhật minimap theo sự kiện. Không giảm nét UI khi hạ render scale cảnh. Mục tiêu 30/60 FPS là target nội bộ đề xuất theo phân khúc, chưa phải số đo của video. Quy trình đo trước–sau tham khảo nguồn Android [S03] trong 07_METHOD_AND_SOURCES.md.

## 8. Thay đổi nhỏ có bằng chứng

Mỗi nhánh việc chỉ sửa nhóm issue liên quan. Không đổi ID POI/đường dẫn asset hàng loạt ngoài phạm vi. Test tập trung input, coordinate roundtrip, state cancellation, save migration; với UI kiểm tra bounds/screenshot trên viewport thật. Không viết test chỉ lặp implementation. Giữ log build/version/camera mode để tái hiện.
