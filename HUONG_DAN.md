# Flashcard tiếng Nhật — Unit 01

Website đã được tạo sẵn trong thư mục `flashcard`, sử dụng HTML, CSS và JavaScript thuần, không có thư viện ngoài, backend hay database.

## 1. Tạo hoặc mở ba file

```text
flashcard/
├── index.html   # Nội dung và các nút trên trang
├── style.css    # Giao diện, responsive và hiệu ứng lật 3D
└── script.js    # 120 từ Unit 01 và toàn bộ chức năng học
```

Ba file đã có đầy đủ code. Bạn có thể mở chúng bằng VS Code hoặc Notepad để chỉnh sửa. Nếu tạo lại ở nơi khác, tạo thư mục `flashcard`, sao chép cả ba file vào cùng thư mục và lưu bằng **UTF-8**. Đảm bảo tên file không bị thành `index.html.txt`.

## 2. Chạy website và học

Nhấp đúp `flashcard/index.html` để mở bằng Chrome, Edge hoặc Firefox. Không cần cài đặt hay chạy lệnh. Website dùng được khi không có mạng.

- Chọn **Phần 1**, **Phần 2** hoặc **Phần 3**. Mỗi phần gồm 40 từ theo đúng thứ tự dữ liệu bạn gửi.
- Bấm tên phần trên thanh bên để mở hai mục **Chưa thuộc** và **Đã thuộc**, kèm số lượng từ, ngay bên dưới. Chọn phần khác sẽ thu gọn phần trước; bấm lại phần đang mở để thu gọn. Bấm mục con hoặc dùng hai nút phía trên thẻ để chọn nhóm muốn ôn. Từ mới và từ từng đánh dấu **Chưa nhớ** đều nằm trong **Chưa thuộc**; kết quả **Đã nhớ** đã lưu trước đây được chuyển vào **Đã thuộc**.
- Mặt trước chỉ có từ tiếng Nhật trong trường `kanji`. Bấm vào thẻ hoặc nhấn **Space** để xem âm Hán-Việt, nghĩa cơ bản theo từng chữ Kanji, cách đọc Hiragana và nghĩa tiếng Việt của cả từ. Ví dụ: `製品` → `CHẾ PHẨM` → `製 (chế): chế tạo, làm ra · 品 (phẩm): vật phẩm, sản phẩm` → `せいひん` → Sản phẩm, chế phẩm.
- Bấm **← Từ trước** / **Từ tiếp →** hoặc dùng hai phím mũi tên để chuyển giữa các từ trong nhóm đang chọn. Số thứ tự hiển thị vị trí và tổng số từ của nhóm đó. Thẻ mới luôn quay về mặt Kanji.
- Bấm **Đã thuộc** hoặc **Chưa thuộc** để đánh dấu từ đang hiển thị. Từ chuyển sang nhóm tương ứng ngay, số lượng và tiến trình được cập nhật, rồi website mở thẻ tiếp theo trong nhóm đang ôn.
- Khi nhóm trống, website hiện thông báo và nút chuyển sang nhóm còn lại. Bạn cũng có thể chọn phần khác để tiếp tục học.
- **Xáo trộn** thay đổi thứ tự trong nhóm đang chọn, giữ kết quả ghi nhớ và thứ tự nhóm còn lại.
- Thanh tiến trình tính theo số từ đã đánh dấu **Đã thuộc** trên toàn phần, không tính số lần lật hoặc xem thẻ. Cột bên trái hiển thị tổng tiến trình của Unit 01.
- **Học lại từ đầu** đặt lại phần đang chọn sau khi bạn xác nhận. Các phần khác được giữ nguyên.

Tiến trình, phần và nhóm đang chọn, thẻ đang học và thứ tự xáo trộn được lưu bằng `localStorage`. F5 hoặc mở lại bằng cùng trình duyệt, cùng hồ sơ và cùng đường dẫn file sẽ khôi phục dữ liệu. Mặt thẻ khôi phục luôn là Kanji. Dữ liệu nằm trên thiết bị này, không đồng bộ qua điện thoại/máy tính. Chế độ ẩn danh, xóa dữ liệu trình duyệt hoặc di chuyển file có thể làm mất tiến trình. Nếu trình duyệt chặn lưu trữ, website vẫn học được và hiện thông báo không thể lưu.

## 3. Thêm từ vựng mới

Mở `script.js` và tìm `const vocabulary = [`, ngay đầu file. Thêm một object trước dấu `];` cuối mảng. Nhớ thêm dấu phẩy sau object trước đó, ví dụ:

```javascript
  { kanji: "生", hiragana: "なま", hanViet: "SINH", kanjiMeaning: "生 (sinh): sinh ra, sống", meaning: "Nguyên chất, tươi, sống" },
  { kanji: "電気", hiragana: "でんき", hanViet: "ĐIỆN KHÍ", kanjiMeaning: "電 (điện): điện · 気 (khí): khí, hơi", meaning: "Điện / điện năng" }
];
```

Lưu file, rồi F5. Website tự cập nhật tổng số từ và tự chia mỗi 40 từ thành một phần. Với 121 từ, phần 4 sẽ có 1 từ. Muốn giữ đúng 3 phần × 40 từ, hãy thay một từ có sẵn thay vì thêm từ thứ 121.

Trường `hanViet` lưu âm Hán-Việt của các chữ trong từ. Trường `kanjiMeaning` giải nghĩa cơ bản từng chữ. Khi thêm từ, hãy nhập đủ hai trường này cùng với `hiragana` và `meaning`. Chỉnh phần Hán-Việt hoặc giải nghĩa từng chữ vẫn giữ kết quả đã học.

Với từ viết hoàn toàn bằng Hiragana như `おしゃべり`, ghi `hanViet: "Không có Kanji"` và `kanjiMeaning: "Từ này được viết hoàn toàn bằng Hiragana."`. Với từ vừa có Kanji vừa có Hiragana như `引っ越し`, chỉ giải nghĩa hai chữ `引` và `越`.

Phần Hán-Việt và nghĩa từng chữ dùng để hỗ trợ ghi nhớ; nghĩa của cả từ Nhật có thể khác với nghĩa cộng lại của các chữ riêng, ví dụ `怪我` nghĩa là vết thương. Hãy dùng `hiragana` để đọc từ và `meaning` để hiểu nghĩa của cả từ.

Nguồn tra cứu chữ: [Từ điển Hán Nôm — 製](https://hvdic.thivien.net/whv/製), [剤](https://hvdic.thivien.net/whv/剤), [冗](https://hvdic.thivien.net/whv/冗), [齢](https://hvdic.thivien.net/whv/齢), [憩](https://hvdic.thivien.net/wnom/憩), [Jdict — 缶](https://jdict.net/kanji/缶). Các giải nghĩa trên thẻ được viết ngắn gọn để dễ học.

Nên thêm từ mới vào cuối danh sách. Nếu chèn vào giữa, ranh giới các phần sẽ đổi. Kết quả ghi nhớ gắn với cặp `kanji` và `hiragana`: chỉnh nghĩa tiếng Việt vẫn giữ kết quả, còn đổi Kanji hoặc cách đọc sẽ được coi là một từ mới. Tránh thêm hai từ có cùng cả Kanji lẫn hiragana.

## 4. Cách lật flashcard hoạt động

HTML đặt hai mặt thẻ trong `.card-inner`. CSS dùng `perspective` để tạo chiều sâu, xoay mặt sau sẵn `180deg` và dùng `backface-visibility: hidden` để ẩn mặt quay lưng.

Khi bạn click hoặc nhấn Space, JavaScript thêm/bỏ class `is-flipped`. Class này xoay `.card-inner` bằng `rotateY(180deg)`; `transition` làm chuyển động mượt. Khi chuyển từ, JavaScript bỏ class này và cập nhật nội dung để thẻ mới trở về mặt Kanji. Nếu thiết bị bật giảm chuyển động, hiệu ứng được tắt để dễ sử dụng hơn.

## 5. Deploy trên GitHub Pages

Ở thư mục gốc có thêm `index.html` để tự mở `flashcard/index.html`, và `.nojekyll` để GitHub phục vụ website HTML/CSS/JavaScript trực tiếp. Các file của ứng dụng vẫn nằm trong `flashcard`.

```text
JLPT_N3_Vocabulary/
├── index.html       # Tự chuyển đến trang học
├── .nojekyll
└── flashcard/
    ├── index.html   # Trang học chính
    ├── style.css
    └── script.js
```

1. Commit và push `index.html` ở thư mục gốc cùng `.nojekyll` lên nhánh `main`.
2. Trong repository GitHub, mở **Settings → Pages**.
3. Chọn **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**, rồi **Save**.
4. Sau khi GitHub deploy thành công, mở `https://tienvuiet.github.io/JLPT_N3_Vocabulary/`. Trang tự chuyển đến trang học bên trong `flashcard`.

Mỗi lần sửa file trong `flashcard`, commit và push lên `main` để GitHub Pages cập nhật website. Chỉ sửa file trên máy chưa cập nhật bản online. Có thể mất đến 10 phút để thay đổi được xuất bản.

Tham khảo: [Tạo website GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Cấu hình nguồn deploy](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
