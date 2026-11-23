# Trung tâm Ngoại ngữ và Tin học — Đại học Đồng Tháp

Bộ mô hình Three.js dựng theo ảnh người dùng, gồm công trình chính, cửa kéo kính xanh, bảng hiệu, standee, tranh tường, lối đi bộ, đường xe và đường chạy phía sau. Ngày dựng: 22/11/2026.

## Mở và sử dụng

1. Giải nén toàn bộ gói.
2. Mở **FLiC_Trung_tam_Ngoai_ngu_Tin_hoc.html** bằng Chrome hoặc Edge. Tệp này có sẵn Three.js và ảnh, mở ngoại tuyến, không cần cài npm hoặc tải CDN.
3. Chọn Trước / Sau / Trái / Phải / Trên / Dưới hoặc hai góc phối cảnh. Kéo để xoay, cuộn để zoom; chuột phải để di chuyển.
4. Bật “Khóa góc, vẫn cho zoom” để giữ hướng nhìn. Mô hình không tự đặt lại camera khi zoom.
5. Bật/tắt từng nhóm. “Thu cửa kéo” thu các nan kim loại, không giả lập thay đổi mặt bằng nội thất.
6. Bấm bảng hiệu hoặc standee để mở ảnh; ở các góc sau/trên/trái, cây cao được ẩn tạm để không che mặt tường; dùng “Chụp PNG” và “Xuất mô hình GLB” theo nhu cầu.

`index.html` là bản mã nguồn mô-đun: chạy `START_SERVER.bat` hoặc `python -m http.server 8080 --bind 127.0.0.1`, rồi mở `http://127.0.0.1:8080/index.html`. Không mở trực tiếp bản mô-đun bằng file://; dùng tệp HTML độc lập ở bước 2.

## Độ chính xác và giới hạn

**Ưu tiên ảnh chụp gốc hơn bảng phối cảnh dựng lại.** Tệp SVG thực tế gồm hai bảng, mỗi bảng bốn góc, không có sáu ảnh chụp thực nghiệm. Trình xem tạo thêm đủ sáu hướng camera từ mô hình.

| Thành phần | Căn cứ và cách dựng |
|---|---|
| Logo Trường và FLiC | Dùng PNG gốc, giữ nguyên byte ảnh trong `assets/logo-*.png`. Logo chính và logo đầu hồi dùng mặt phẳng/hình tròn để giữ tỷ lệ. |
| Bảng chính, bảng HSK, bảng kim loại, áp phích, standee | Dùng ảnh phục dựng được cung cấp; cắt phần khung trắng khi cần. Không phát sinh QR mới. Ảnh không chứa QR dùng JPEG chất lượng cao để giảm dung lượng; ảnh chứa QR và logo gốc giữ PNG. |
| Bảng chính màu xanh | Xóa vùng logo cũ trong bản nền và gắn PNG FLiC chính thức thành lớp riêng. Tách hình logo khỏi tỷ lệ ước lượng của cả bảng. |
| Bốn khoang cửa | Khung nhôm, kính xanh, nan đứng và liên kết chéo dựng bằng hình học 3D. Vị trí cột và tương quan khoang đối chiếu ảnh mặt tiền. |
| Tranh tường | Dùng phần tường trong ảnh chụp thật, hiệu chỉnh phối cảnh để đưa lên mặt đầu hồi và mặt sau. Không dùng tranh do AI vẽ lại. Đường nối, độ nét và biến dạng ảnh panorama vẫn có giới hạn. |
| Đường phía sau | Mặt đường chạy đỏ nâu với bốn vạch trắng, bẻ quanh đầu hồi; dải hoa hẹp sát tường. Không phải bản đồ toàn bộ sân vận động. |
| Lối đi bộ và đường xe | Hai lớp hình học khác nhau, vỉa hè lát ô hoa văn vòng tròn theo ảnh. |
| Mái, mặt phải, chiều sâu, kích thước | **Ước dựng**, chưa có số đo hoặc ảnh bao phủ đầy đủ. Không khẳng định đây là bản sao đo đạc chính xác 100%. |
| Nha khoa và cà phê bên cạnh | Chỉ dựng mặt tiền nhìn thấy trong ảnh, tách trong nhóm `context`, có thể bỏ khi ghép game. |
| Nội thất | Không dựng nội thất chi tiết vì chưa có ảnh. Khối tối sau kính chỉ phục vụ hiển thị. |

Logo gốc giữ nguyên ảnh nguồn. Một số ảnh poster cung cấp có logo nằm trong nội dung in sẵn; chúng được giữ nguyên trong ảnh vật liệu. Những QR trên bảng ở khoảng cách xa không bảo đảm quét từ ảnh chụp màn hình 3D; mở ảnh nguồn để đọc/quét.

Các kích thước mặc định là **giả định có thể sửa**: thân nhà rộng 26 m, sâu 10 m, tường cao 4,15 m; bảng fascia bắt đầu khoảng 3,50 m và cao 2,25 m. Đơn vị của mô hình là mét, **+Y hướng lên, +Z là mặt trước**. Gốc tọa độ ở giữa nền khối nhà. Đây không phải số đo khảo sát của Trung tâm.

## Ghép vào dự án Three.js

```js
// Dùng cùng bản Three.js trong vendor hoặc thay các import bằng phiên bản của dự án.
import { createFlicCenter } from './FLiC_ThreeJS/model.js';

const kit = await createFlicCenter({
  assetBaseUrl: new URL('./FLiC_ThreeJS/', document.baseURI).href,
  // dimensions: { width: 26, depth: 10, wallHeight: 4.15 }
});
scene.add(kit.root);
kit.root.position.set(100, 0, -40);
kit.root.rotation.y = Math.PI / 2;
kit.setPart('context', false);
kit.setPart('roof', false);
kit.setGateOpen(0.7);
```

`kit.parts` có: `building`, `storefront`, `signage`, `standees`, `roof`, `murals`, `ground`, `track`, `planting`, `context`, `utilities`. Mỗi nhóm có tên và metadata. `kit.collisions` là ba hộp tường bao cơ bản ở tỷ lệ mặc định; cần biến đổi theo vị trí/tỷ lệ công trình và bổ sung cửa, bối cảnh theo hệ va chạm của game.

Mô hình GLB trong `models/` có ảnh vật liệu nhúng trong tệp. Dùng GLTFLoader của Three.js. Phần mềm khác cần hỗ trợ EXT_mesh_gpu_instancing để đọc đầy đủ các nhóm nan cửa và cây. Bản xuất GLB tổng thể dùng các lớp đang bật; bản công trình xuất công trình/bảng/cửa/mái/tranh, bỏ mặt đường và hàng xóm. Bản bảng hiệu chỉ xuất bảng và standee.

Mã nguồn mô-đun mở qua HTTP cục bộ. Tệp HTML độc lập được đóng gói để xem trực tiếp, không nên sửa nội dung base64 trong đó. Sửa các mô-đun rồi dựng lại bằng `node build-local.cjs`; trình đóng gói phát triển cần TypeScript tại vị trí đã cấu hình trong tệp này. Không cần công cụ đó khi sử dụng mô hình hoặc mở bản độc lập.

## Cấu trúc tệp

- `model.js`: dựng công trình, cửa, bảng và cảnh quan; API ghép game.
- `config.js`: kích thước giả định và ánh xạ ảnh vật liệu.
- `main.js`: camera, tương tác, xem ảnh và xuất GLB.
- `geometry.js`: các hàm hình học dùng lại.
- `vendor/`: Three.js r180, OrbitControls, GLTFExporter và giấy phép MIT.
- `assets/`: tất cả ảnh vật liệu được mô hình sử dụng. `original/09.png` giữ nguyên ảnh VSTEP chứa QR. Hai ảnh chiêu sinh giữ PNG cắt từ ảnh nguồn; logo giữ nguyên PNG. Các bản PNG gốc khác đã có trong gói tham chiếu người dùng, không lặp lại toàn bộ để giảm dung lượng.
- `references/`: ảnh chụp trước/sau và hai bảng SVG người dùng gửi.
- `models/FLiC_Tong_the.glb`: GLB tổng thể đã xuất. Hai phạm vi công trình và bảng hiệu có thể xuất độc lập bằng nút trong trình xem.
- `SOURCE_MANIFEST.json`: tên nguồn và SHA-256 để truy vết.
- `VALIDATION.json`: kết quả kiểm tra trình xem và GLB.

Các ảnh nguồn do người dùng cung cấp. Gói này không xác lập quyền phân phối nhãn hiệu hay ảnh ngoài phạm vi sử dụng đã có của chủ dự án.
