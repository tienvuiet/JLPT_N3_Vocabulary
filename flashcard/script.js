// UNIT 01: thêm từ mới vào mảng này. Mỗi 40 từ được chia thành một phần.
// Giữ nguyên kanji và hiragana của từ đã học để giữ tiến trình của từ đó.
// hanViet là âm Hán-Việt; kanjiMeaning giải nghĩa cơ bản của từng chữ Kanji.
const vocabulary = [
  // PHẦN 1: từ 1–40
  { kanji: "性別", hiragana: "せいべつ", hanViet: "TÍNH BIỆT", kanjiMeaning: "性 (tính): tính chất, bản tính · 別 (biệt): phân biệt, khác nhau", meaning: "Giới tính" },
  { kanji: "理想", hiragana: "りそう", hanViet: "LÝ TƯỞNG", kanjiMeaning: "理 (lý): lý lẽ, nguyên lý · 想 (tưởng): nghĩ, tưởng tượng", meaning: "Lý tưởng" },
  { kanji: "高齢", hiragana: "こうれい", hanViet: "CAO LINH", kanjiMeaning: "高 (cao): cao · 齢 (linh): tuổi", meaning: "Tuổi cao" },
  { kanji: "年上", hiragana: "としうえ", hanViet: "NIÊN THƯỢNG", kanjiMeaning: "年 (niên): năm, tuổi · 上 (thượng): trên, lên", meaning: "Lớn tuổi hơn, hơn tuổi" },
  { kanji: "目上", hiragana: "めうえ", hanViet: "MỤC THƯỢNG", kanjiMeaning: "目 (mục): mắt · 上 (thượng): trên, lên", meaning: "Cấp trên, bề trên" },
  { kanji: "先輩", hiragana: "せんぱい", hanViet: "TIÊN BỐI", kanjiMeaning: "先 (tiên): trước · 輩 (bối): lớp người, thế hệ", meaning: "Tiền bối, người đi trước" },
  { kanji: "後輩", hiragana: "こうはい", hanViet: "HẬU BỐI", kanjiMeaning: "後 (hậu): sau · 輩 (bối): lớp người, thế hệ", meaning: "Hậu bối, người đi sau" },
  { kanji: "上司", hiragana: "じょうし", hanViet: "THƯỢNG TƯ", kanjiMeaning: "上 (thượng): trên, lên · 司 (tư): quản lý, phụ trách", meaning: "Cấp trên" },
  { kanji: "相手", hiragana: "あいて", hanViet: "TƯƠNG THỦ", kanjiMeaning: "相 (tương): lẫn nhau, đối nhau · 手 (thủ): tay", meaning: "Đối phương" },
  { kanji: "知り合い", hiragana: "しりあい", hanViet: "TRI HỢP", kanjiMeaning: "知 (tri): biết · 合 (hợp): hợp lại, phù hợp", meaning: "Người quen" },

  { kanji: "友人", hiragana: "ゆうじん", hanViet: "HỮU NHÂN", kanjiMeaning: "友 (hữu): bạn · 人 (nhân): người", meaning: "Bạn, người bạn" },
  { kanji: "仲", hiragana: "なか", hanViet: "TRỌNG", kanjiMeaning: "仲 (trọng): ở giữa; quan hệ giữa người", meaning: "Quan hệ, mối quan hệ" },
  { kanji: "生年月日", hiragana: "せいねんがっぴ", hanViet: "SINH NIÊN NGUYỆT NHẬT", kanjiMeaning: "生 (sinh): sinh ra, sống · 年 (niên): năm, tuổi · 月 (nguyệt): tháng, mặt trăng · 日 (nhật): ngày, mặt trời", meaning: "Ngày tháng năm sinh" },
  { kanji: "誕生", hiragana: "たんじょう", hanViet: "ĐẢN SINH", kanjiMeaning: "誕 (đản): sinh ra · 生 (sinh): sinh ra, sống", meaning: "Sự ra đời" },
  { kanji: "年", hiragana: "とし", hanViet: "NIÊN", kanjiMeaning: "年 (niên): năm, tuổi", meaning: "Năm, tuổi" },
  { kanji: "出身", hiragana: "しゅっしん", hanViet: "XUẤT THÂN", kanjiMeaning: "出 (xuất): ra · 身 (thân): thân thể, bản thân", meaning: "Xuất thân, gốc gác" },
  { kanji: "故郷", hiragana: "こきょう", hanViet: "CỐ HƯƠNG", kanjiMeaning: "故 (cố): cũ, trước đây · 郷 (hương): quê hương", meaning: "Quê hương" },
  { kanji: "成長", hiragana: "せいちょう", hanViet: "THÀNH TRƯỞNG", kanjiMeaning: "成 (thành): thành, trở thành · 長 (trưởng): dài; lớn lên", meaning: "Sinh trưởng, phát triển" },
  { kanji: "成人", hiragana: "せいじん", hanViet: "THÀNH NHÂN", kanjiMeaning: "成 (thành): thành, trở thành · 人 (nhân): người", meaning: "Người trưởng thành" },
  { kanji: "合格", hiragana: "ごうかく", hanViet: "HỢP CÁCH", kanjiMeaning: "合 (hợp): hợp lại, phù hợp · 格 (cách): tiêu chuẩn, tư cách", meaning: "Đỗ, trúng tuyển" },

  { kanji: "進学", hiragana: "しんがく", hanViet: "TIẾN HỌC", kanjiMeaning: "進 (tiến): tiến lên · 学 (học): học tập", meaning: "Học lên" },
  { kanji: "退学", hiragana: "たいがく", hanViet: "THOÁI HỌC", kanjiMeaning: "退 (thoái): lùi, rời khỏi · 学 (học): học tập", meaning: "Thôi học, bỏ học" },
  { kanji: "就職", hiragana: "しゅうしょく", hanViet: "TỰU CHỨC", kanjiMeaning: "就 (tựu): đến, bắt đầu làm · 職 (chức): nghề, chức vụ", meaning: "Tìm việc, có việc làm" },
  { kanji: "退職", hiragana: "たいしょく", hanViet: "THOÁI CHỨC", kanjiMeaning: "退 (thoái): lùi, rời khỏi · 職 (chức): nghề, chức vụ", meaning: "Nghỉ việc" },
  { kanji: "失業", hiragana: "しつぎょう", hanViet: "THẤT NGHIỆP", kanjiMeaning: "失 (thất): mất, thất bại · 業 (nghiệp): nghề, công việc", meaning: "Thất nghiệp" },
  { kanji: "残業", hiragana: "ざんぎょう", hanViet: "TÀN NGHIỆP", kanjiMeaning: "残 (tàn): còn lại · 業 (nghiệp): nghề, công việc", meaning: "Làm thêm giờ" },
  { kanji: "生活", hiragana: "せいかつ", hanViet: "SINH HOẠT", kanjiMeaning: "生 (sinh): sinh ra, sống · 活 (hoạt): sống, hoạt động", meaning: "Cuộc sống, sinh hoạt" },
  { kanji: "通勤", hiragana: "つうきん", hanViet: "THÔNG CẦN", kanjiMeaning: "通 (thông): đi qua, thông suốt · 勤 (cần): chăm chỉ, làm việc", meaning: "Đi làm, đi lại giữa nhà và nơi làm việc" },
  { kanji: "学歴", hiragana: "がくれき", hanViet: "HỌC LỊCH", kanjiMeaning: "学 (học): học tập · 歴 (lịch): trải qua, quá trình", meaning: "Bằng cấp, quá trình học tập" },
  { kanji: "給料", hiragana: "きゅうりょう", hanViet: "CẤP LIỆU", kanjiMeaning: "給 (cấp): cung cấp · 料 (liệu): vật liệu, khoản phí", meaning: "Tiền lương" },

  { kanji: "面接", hiragana: "めんせつ", hanViet: "DIỆN TIẾP", kanjiMeaning: "面 (diện): mặt · 接 (tiếp): tiếp xúc, nối tiếp", meaning: "Phỏng vấn" },
  { kanji: "休憩", hiragana: "きゅうけい", hanViet: "HƯU KHẾ", kanjiMeaning: "休 (hưu): nghỉ · 憩 (khế): nghỉ ngơi", meaning: "Nghỉ giải lao" },
  { kanji: "観光", hiragana: "かんこう", hanViet: "QUAN QUANG", kanjiMeaning: "観 (quan): xem, quan sát · 光 (quang): ánh sáng", meaning: "Tham quan, du lịch" },
  { kanji: "帰国", hiragana: "きこく", hanViet: "QUY QUỐC", kanjiMeaning: "帰 (quy): trở về · 国 (quốc): nước, quốc gia", meaning: "Về nước" },
  { kanji: "帰省", hiragana: "きせい", hanViet: "QUY TỈNH", kanjiMeaning: "帰 (quy): trở về · 省 (tỉnh): thăm hỏi; xem xét", meaning: "Về quê" },
  { kanji: "帰宅", hiragana: "きたく", hanViet: "QUY TRẠCH", kanjiMeaning: "帰 (quy): trở về · 宅 (trạch): nhà ở", meaning: "Về nhà" },
  { kanji: "参加", hiragana: "さんか", hanViet: "THAM GIA", kanjiMeaning: "参 (tham): tham gia · 加 (gia): thêm vào", meaning: "Tham gia" },
  { kanji: "出席", hiragana: "しゅっせき", hanViet: "XUẤT TỊCH", kanjiMeaning: "出 (xuất): ra · 席 (tịch): chỗ ngồi", meaning: "Tham dự, có mặt" },
  { kanji: "欠席", hiragana: "けっせき", hanViet: "KHIẾM TỊCH", kanjiMeaning: "欠 (khiếm): thiếu, vắng · 席 (tịch): chỗ ngồi", meaning: "Vắng mặt" },
  { kanji: "遅刻", hiragana: "ちこく", hanViet: "TRÌ KHẮC", kanjiMeaning: "遅 (trì): chậm, muộn · 刻 (khắc): khắc; thời điểm", meaning: "Đến muộn" },

  // PHẦN 2: từ 41–80
  { kanji: "化粧", hiragana: "けしょう", hanViet: "HÓA TRANG", kanjiMeaning: "化 (hóa): biến đổi · 粧 (trang): trang điểm", meaning: "Trang điểm" },
  { kanji: "計算", hiragana: "けいさん", hanViet: "KẾ TOÁN", kanjiMeaning: "計 (kế): tính toán, kế hoạch · 算 (toán): tính toán", meaning: "Tính toán" },
  { kanji: "計画", hiragana: "けいかく", hanViet: "KẾ HOẠCH", kanjiMeaning: "計 (kế): tính toán, kế hoạch · 画 (hoạch): vẽ; hoạch định", meaning: "Kế hoạch" },
  { kanji: "成功", hiragana: "せいこう", hanViet: "THÀNH CÔNG", kanjiMeaning: "成 (thành): thành, trở thành · 功 (công): công lao, thành quả", meaning: "Thành công" },
  { kanji: "失敗", hiragana: "しっぱい", hanViet: "THẤT BẠI", kanjiMeaning: "失 (thất): mất, thất bại · 敗 (bại): thua, thất bại", meaning: "Thất bại" },
  { kanji: "準備", hiragana: "じゅんび", hanViet: "CHUẨN BỊ", kanjiMeaning: "準 (chuẩn): chuẩn bị; tiêu chuẩn · 備 (bị): chuẩn bị, sẵn sàng", meaning: "Chuẩn bị" },
  { kanji: "整理", hiragana: "せいり", hanViet: "CHỈNH LÝ", kanjiMeaning: "整 (chỉnh): chỉnh đốn, ngay ngắn · 理 (lý): lý lẽ, nguyên lý", meaning: "Sắp xếp, chỉnh lý" },
  { kanji: "注文", hiragana: "ちゅうもん", hanViet: "CHÚ VĂN", kanjiMeaning: "注 (chú): rót vào; chú ý · 文 (văn): văn bản, chữ viết", meaning: "Gọi món, đặt hàng" },
  { kanji: "貯金", hiragana: "ちょきん", hanViet: "TRỮ KIM", kanjiMeaning: "貯 (trữ): tích trữ · 金 (kim): vàng, tiền", meaning: "Tiền tiết kiệm, gửi tiết kiệm" },
  { kanji: "徹夜", hiragana: "てつや", hanViet: "TRIỆT DẠ", kanjiMeaning: "徹 (triệt): suốt, xuyên suốt · 夜 (dạ): đêm", meaning: "Thức trắng đêm" },

  { kanji: "引っ越し", hiragana: "ひっこし", hanViet: "DẪN VIỆT", kanjiMeaning: "引 (dẫn): kéo, dẫn · 越 (việt): vượt qua", meaning: "Chuyển nhà, dọn nhà" },
  { kanji: "身長", hiragana: "しんちょう", hanViet: "THÂN TRƯỜNG", kanjiMeaning: "身 (thân): thân thể, bản thân · 長 (trường): dài; lớn lên", meaning: "Chiều cao cơ thể" },
  { kanji: "体重", hiragana: "たいじゅう", hanViet: "THỂ TRỌNG", kanjiMeaning: "体 (thể): cơ thể · 重 (trọng): nặng, trọng lượng", meaning: "Cân nặng, trọng lượng" },
  { kanji: "怪我", hiragana: "けが", hanViet: "QUÁI NGÃ", kanjiMeaning: "怪 (quái): lạ, kỳ quái · 我 (ngã): tôi, bản thân", meaning: "Vết thương, bị thương" },
  { kanji: "会", hiragana: "かい", hanViet: "HỘI", kanjiMeaning: "会 (hội): gặp, hội họp", meaning: "Hội, buổi gặp mặt, bữa tiệc" },
  { kanji: "趣味", hiragana: "しゅみ", hanViet: "THÚ VỊ", kanjiMeaning: "趣 (thú): thú vui, hướng tới · 味 (vị): vị, hương vị", meaning: "Sở thích, gu thẩm mỹ" },
  { kanji: "興味", hiragana: "きょうみ", hanViet: "HƯNG VỊ", kanjiMeaning: "興 (hưng): hứng thú, nổi lên · 味 (vị): vị, hương vị", meaning: "Hứng thú, sự quan tâm" },
  { kanji: "思い出", hiragana: "おもいで", hanViet: "TƯ XUẤT", kanjiMeaning: "思 (tư): nghĩ · 出 (xuất): ra", meaning: "Kỷ niệm" },
  { kanji: "冗談", hiragana: "じょうだん", hanViet: "NHŨNG ĐÀM", kanjiMeaning: "冗 (nhũng): thừa, rườm rà · 談 (đàm): nói chuyện", meaning: "Nói đùa, chuyện đùa" },
  { kanji: "目的", hiragana: "もくてき", hanViet: "MỤC ĐÍCH", kanjiMeaning: "目 (mục): mắt · 的 (đích): mục tiêu", meaning: "Mục đích" },

  { kanji: "約束", hiragana: "やくそく", hanViet: "ƯỚC THÚC", kanjiMeaning: "約 (ước): hẹn, cam kết · 束 (thúc): buộc, bó", meaning: "Lời hứa, hẹn" },
  { kanji: "おしゃべり", hiragana: "おしゃべり", hanViet: "Không có Kanji", kanjiMeaning: "Từ này được viết hoàn toàn bằng Hiragana.", meaning: "Nói chuyện, nói nhiều" },
  { kanji: "遠慮", hiragana: "えんりょ", hanViet: "VIỄN LỰ", kanjiMeaning: "遠 (viễn): xa · 慮 (lự): lo nghĩ, cân nhắc", meaning: "Khách khí, ngần ngại" },
  { kanji: "我慢", hiragana: "がまん", hanViet: "NGÃ MẠN", kanjiMeaning: "我 (ngã): tôi, bản thân · 慢 (mạn): chậm; kiêu ngạo", meaning: "Nhẫn nại, chịu đựng" },
  { kanji: "迷惑", hiragana: "めいわく", hanViet: "MÊ HOẶC", kanjiMeaning: "迷 (mê): lạc, mê · 惑 (hoặc): bối rối, nghi hoặc", meaning: "Làm phiền, quấy rầy" },
  { kanji: "希望", hiragana: "きぼう", hanViet: "HI VỌNG", kanjiMeaning: "希 (hi): mong, hiếm · 望 (vọng): mong đợi, trông", meaning: "Hy vọng, mong ước" },
  { kanji: "夢", hiragana: "ゆめ", hanViet: "MỘNG", kanjiMeaning: "夢 (mộng): giấc mơ", meaning: "Giấc mơ, ước mơ" },
  { kanji: "賛成", hiragana: "さんせい", hanViet: "TÁN THÀNH", kanjiMeaning: "賛 (tán): khen, tán thành · 成 (thành): thành, trở thành", meaning: "Tán thành, đồng ý" },
  { kanji: "反対", hiragana: "はんたい", hanViet: "PHẢN ĐỐI", kanjiMeaning: "反 (phản): ngược, chống lại · 対 (đối): đối diện, đối lại", meaning: "Phản đối, đối ngược" },
  { kanji: "想像", hiragana: "そうぞう", hanViet: "TƯỞNG TƯỢNG", kanjiMeaning: "想 (tưởng): nghĩ, tưởng tượng · 像 (tượng): hình ảnh, hình tượng", meaning: "Tưởng tượng" },

  { kanji: "努力", hiragana: "どりょく", hanViet: "NỖ LỰC", kanjiMeaning: "努 (nỗ): cố gắng · 力 (lực): sức lực", meaning: "Nỗ lực, cố gắng" },
  { kanji: "太陽", hiragana: "たいよう", hanViet: "THÁI DƯƠNG", kanjiMeaning: "太 (thái): lớn · 陽 (dương): mặt trời, phía có nắng", meaning: "Mặt trời, ánh mặt trời" },
  { kanji: "地球", hiragana: "ちきゅう", hanViet: "ĐỊA CẦU", kanjiMeaning: "地 (địa): đất · 球 (cầu): hình cầu", meaning: "Trái đất, địa cầu" },
  { kanji: "温度", hiragana: "おんど", hanViet: "ÔN ĐỘ", kanjiMeaning: "温 (ôn): ấm · 度 (độ): mức độ", meaning: "Nhiệt độ" },
  { kanji: "湿度", hiragana: "しつど", hanViet: "THẤP ĐỘ", kanjiMeaning: "湿 (thấp): ẩm, ướt · 度 (độ): mức độ", meaning: "Độ ẩm" },
  { kanji: "湿気", hiragana: "しっけ", hanViet: "THẤP KHÍ", kanjiMeaning: "湿 (thấp): ẩm, ướt · 気 (khí): khí, hơi", meaning: "Hơi ẩm, sự ẩm ướt" },
  { kanji: "梅雨", hiragana: "つゆ", hanViet: "MAI VŨ", kanjiMeaning: "梅 (mai): cây mai, mơ · 雨 (vũ): mưa", meaning: "Mùa mưa" },
  { kanji: "かび", hiragana: "かび", hanViet: "Không có Kanji", kanjiMeaning: "Từ này được viết hoàn toàn bằng Hiragana.", meaning: "Nấm mốc" },
  { kanji: "暖房", hiragana: "だんぼう", hanViet: "NOÃN PHÒNG", kanjiMeaning: "暖 (noãn): ấm áp · 房 (phòng): phòng, buồng", meaning: "Hệ thống sưởi, chế độ làm ấm" },
  { kanji: "皮", hiragana: "かわ", hanViet: "BÌ", kanjiMeaning: "皮 (bì): da, vỏ", meaning: "Da, vỏ" },

  // PHẦN 3: từ 81–120
  { kanji: "缶", hiragana: "かん", hanViet: "PHẪU", kanjiMeaning: "缶 (phẫu): đồ đựng; lon trong tiếng Nhật", meaning: "Lon, hộp kim loại" },
  { kanji: "画面", hiragana: "がめん", hanViet: "HỌA DIỆN", kanjiMeaning: "画 (họa): vẽ; hoạch định · 面 (diện): mặt", meaning: "Màn hình, màn ảnh" },
  { kanji: "番組", hiragana: "ばんぐみ", hanViet: "PHIÊN TỔ", kanjiMeaning: "番 (phiên): lượt, phiên · 組 (tổ): nhóm, tổ chức", meaning: "Chương trình truyền hình" },
  { kanji: "記事", hiragana: "きじ", hanViet: "KÝ SỰ", kanjiMeaning: "記 (ký): ghi chép · 事 (sự): việc, sự việc", meaning: "Bài báo, bài viết" },
  { kanji: "近所", hiragana: "きんじょ", hanViet: "CẬN SỞ", kanjiMeaning: "近 (cận): gần · 所 (sở): nơi, chỗ", meaning: "Hàng xóm, vùng phụ cận" },
  { kanji: "警察", hiragana: "けいさつ", hanViet: "CẢNH SÁT", kanjiMeaning: "警 (cảnh): cảnh giác, cảnh báo · 察 (sát): xem xét, quan sát", meaning: "Cảnh sát, ngành cảnh sát" },
  { kanji: "犯人", hiragana: "はんにん", hanViet: "PHẠM NHÂN", kanjiMeaning: "犯 (phạm): vi phạm, phạm tội · 人 (nhân): người", meaning: "Thủ phạm, tội phạm" },
  { kanji: "小銭", hiragana: "こぜに", hanViet: "TIỂU TIỀN", kanjiMeaning: "小 (tiểu): nhỏ · 銭 (tiền): tiền, đồng tiền", meaning: "Tiền lẻ, đồng lẻ" },
  { kanji: "ごちそう", hiragana: "ごちそう", hanViet: "Không có Kanji", kanjiMeaning: "Từ này được viết hoàn toàn bằng Hiragana.", meaning: "Yến tiệc, chiêu đãi, khao" },
  { kanji: "作者", hiragana: "さくしゃ", hanViet: "TÁC GIẢ", kanjiMeaning: "作 (tác): làm, tạo ra · 者 (giả): người", meaning: "Tác giả" },

  { kanji: "作品", hiragana: "さくひん", hanViet: "TÁC PHẨM", kanjiMeaning: "作 (tác): làm, tạo ra · 品 (phẩm): vật phẩm, sản phẩm", meaning: "Tác phẩm, sản phẩm" },
  { kanji: "制服", hiragana: "せいふく", hanViet: "CHẾ PHỤC", kanjiMeaning: "制 (chế): quy định, chế độ · 服 (phục): quần áo; phục tùng", meaning: "Đồng phục" },
  { kanji: "洗剤", hiragana: "せんざい", hanViet: "TẨY TỄ", kanjiMeaning: "洗 (tẩy): rửa · 剤 (tễ): chất, chế phẩm", meaning: "Chất tẩy rửa" },
  { kanji: "底", hiragana: "そこ", hanViet: "ĐỂ", kanjiMeaning: "底 (để): đáy", meaning: "Đáy, đế, phần dưới cùng" },
  { kanji: "地下", hiragana: "ちか", hanViet: "ĐỊA HẠ", kanjiMeaning: "地 (địa): đất · 下 (hạ): dưới, xuống", meaning: "Dưới mặt đất, ngầm" },
  { kanji: "寺", hiragana: "てら", hanViet: "TỰ", kanjiMeaning: "寺 (tự): chùa", meaning: "Chùa" },
  { kanji: "道路", hiragana: "どうろ", hanViet: "ĐẠO LỘ", kanjiMeaning: "道 (đạo): đường, lối · 路 (lộ): đường", meaning: "Con đường" },
  { kanji: "坂", hiragana: "さか", hanViet: "PHẢN", kanjiMeaning: "坂 (phản): dốc", meaning: "Dốc" },
  { kanji: "煙", hiragana: "けむり", hanViet: "YÊN", kanjiMeaning: "煙 (yên): khói", meaning: "Khói" },
  { kanji: "灰", hiragana: "はい", hanViet: "HÔI", kanjiMeaning: "灰 (hôi): tro", meaning: "Tro, tàn" },

  { kanji: "判", hiragana: "はん", hanViet: "PHÁN", kanjiMeaning: "判 (phán): phán định; dấu xác nhận", meaning: "Dấu, con dấu" },
  { kanji: "名刺", hiragana: "めいし", hanViet: "DANH THÍCH", kanjiMeaning: "名 (danh): tên · 刺 (thích): đâm; thẻ ghi tên", meaning: "Danh thiếp" },
  { kanji: "免許", hiragana: "めんきょ", hanViet: "MIỄN HỨA", kanjiMeaning: "免 (miễn): miễn, cho phép · 許 (hứa): cho phép", meaning: "Giấy phép, sự cho phép" },
  { kanji: "多く", hiragana: "おおく", hanViet: "ĐA", kanjiMeaning: "多 (đa): nhiều", meaning: "Nhiều" },
  { kanji: "前半", hiragana: "ぜんはん", hanViet: "TIỀN BÁN", kanjiMeaning: "前 (tiền): trước · 半 (bán): nửa", meaning: "Phần đầu" },
  { kanji: "後半", hiragana: "こうはん", hanViet: "HẬU BÁN", kanjiMeaning: "後 (hậu): sau · 半 (bán): nửa", meaning: "Phần sau" },
  { kanji: "最高", hiragana: "さいこう", hanViet: "TỐI CAO", kanjiMeaning: "最 (tối): nhất · 高 (cao): cao", meaning: "Cao nhất, tuyệt vời" },
  { kanji: "最低", hiragana: "さいてい", hanViet: "TỐI ĐÊ", kanjiMeaning: "最 (tối): nhất · 低 (đê): thấp", meaning: "Thấp nhất, tồi nhất, kinh khủng" },
  { kanji: "最初", hiragana: "さいしょ", hanViet: "TỐI SƠ", kanjiMeaning: "最 (tối): nhất · 初 (sơ): đầu tiên", meaning: "Đầu tiên" },
  { kanji: "最後", hiragana: "さいご", hanViet: "TỐI HẬU", kanjiMeaning: "最 (tối): nhất · 後 (hậu): sau", meaning: "Cuối cùng" },

  { kanji: "自動", hiragana: "じどう", hanViet: "TỰ ĐỘNG", kanjiMeaning: "自 (tự): tự mình · 動 (động): chuyển động", meaning: "Tự động" },
  { kanji: "種類", hiragana: "しゅるい", hanViet: "CHỦNG LOẠI", kanjiMeaning: "種 (chủng): loại, giống · 類 (loại): loại, nhóm", meaning: "Chủng loại, loại" },
  { kanji: "性格", hiragana: "せいかく", hanViet: "TÍNH CÁCH", kanjiMeaning: "性 (tính): tính chất, bản tính · 格 (cách): tiêu chuẩn, tư cách", meaning: "Tính cách, nhân phẩm" },
  { kanji: "性質", hiragana: "せいしつ", hanViet: "TÍNH CHẤT", kanjiMeaning: "性 (tính): tính chất, bản tính · 質 (chất): bản chất, tính chất", meaning: "Tính chất, bản chất" },
  { kanji: "順番", hiragana: "じゅんばん", hanViet: "THUẬN PHIÊN", kanjiMeaning: "順 (thuận): theo thứ tự, thuận · 番 (phiên): lượt, phiên", meaning: "Thứ tự, lần lượt" },
  { kanji: "番", hiragana: "ばん", hanViet: "PHIÊN", kanjiMeaning: "番 (phiên): lượt, phiên", meaning: "Lượt, phiên, trông coi" },
  { kanji: "方法", hiragana: "ほうほう", hanViet: "PHƯƠNG PHÁP", kanjiMeaning: "方 (phương): phương hướng, cách · 法 (pháp): phương pháp, quy tắc", meaning: "Phương pháp, cách thức" },
  { kanji: "製品", hiragana: "せいひん", hanViet: "CHẾ PHẨM", kanjiMeaning: "製 (chế): chế tạo, làm ra · 品 (phẩm): vật phẩm, sản phẩm", meaning: "Sản phẩm, chế phẩm" },
  { kanji: "値上がり", hiragana: "ねあがり", hanViet: "TRỊ THƯỢNG", kanjiMeaning: "値 (trị): giá trị, giá tiền · 上 (thượng): trên, lên", meaning: "Tăng giá" },
  { kanji: "生", hiragana: "なま", hanViet: "SINH", kanjiMeaning: "生 (sinh): sinh ra, sống", meaning: "Nguyên chất, tươi, sống" }
];

const WORDS_PER_PART = 40;
const STORAGE_KEY = "kotoba-unit01-v1";
const parts = [];
for (let start = 0; start < vocabulary.length; start += WORDS_PER_PART) {
  parts.push(vocabulary.slice(start, start + WORDS_PER_PART));
}

// Dùng nội dung từ làm mã định danh: xáo trộn không làm mất kết quả đã nhớ.
function wordKey(word) { return word.kanji + "|" + word.hiragana; }
const wordsByKey = new Map(vocabulary.map(word => [wordKey(word), word]));
const $ = id => document.getElementById(id);
let storageAvailable = true;
let recoveredStorage = false;
let isFlipped = false;

function createSession(part) {
  const order = part.map(wordKey);
  return { order, cursor: 0, currentKey: order[0], history: [], normalSinceReview: 0, lastReviewKey: null };
}

// Chỉ chấp nhận dữ liệu hợp lệ; vẫn chạy được nếu localStorage bị hỏng hoặc bị chặn.
function loadState() {
  const fresh = { version: 1, activePart: 0, statuses: {}, sessions: parts.map(createSession) };
  let saved;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;
    saved = JSON.parse(raw);
    if (!saved || saved.version !== 1 || typeof saved.statuses !== "object" || !saved.statuses || !Array.isArray(saved.sessions)) {
      throw new Error("Dữ liệu lưu không hợp lệ");
    }
  } catch (error) {
    if (error instanceof SyntaxError || error.message === "Dữ liệu lưu không hợp lệ") recoveredStorage = true;
    else storageAvailable = false;
    return fresh;
  }
  for (const key of wordsByKey.keys()) {
    if (["known", "missed"].includes(saved.statuses[key])) fresh.statuses[key] = saved.statuses[key];
  }
  if (Number.isInteger(saved.activePart) && saved.activePart >= 0 && saved.activePart < parts.length) fresh.activePart = saved.activePart;
  fresh.sessions = parts.map((part, index) => {
    const session = createSession(part);
    const old = saved.sessions[index];
    if (!old || typeof old !== "object") return session;
    // Bổ sung các từ mới, bỏ từ đã xóa, không giữ bản sao trùng lặp.
    const keys = new Set(session.order);
    const order = Array.isArray(old.order) ? [...new Set(old.order.filter(key => keys.has(key)))] : [];
    session.order = order.concat(session.order.filter(key => !order.includes(key)));
    session.cursor = Number.isInteger(old.cursor) && old.cursor >= 0 && old.cursor < session.order.length ? old.cursor : 0;
    session.currentKey = keys.has(old.currentKey) ? old.currentKey : session.order[session.cursor];
    session.normalSinceReview = Number.isInteger(old.normalSinceReview) ? Math.max(0, Math.min(2, old.normalSinceReview)) : 0;
    session.lastReviewKey = keys.has(old.lastReviewKey) ? old.lastReviewKey : null;
    if (Array.isArray(old.history)) {
      session.history = old.history.filter(item => item && keys.has(item.currentKey) && Number.isInteger(item.cursor) && item.cursor >= 0 && item.cursor < session.order.length).slice(-100).map(item => ({
        cursor: item.cursor,
        currentKey: item.currentKey,
        normalSinceReview: Number.isInteger(item.normalSinceReview) ? Math.max(0, Math.min(2, item.normalSinceReview)) : 0,
        lastReviewKey: keys.has(item.lastReviewKey) ? item.lastReviewKey : null
      }));
    }
    return session;
  });
  return fresh;
}

const state = loadState();
function currentSession() { return state.sessions[state.activePart]; }
function countKnown(part) { return part.filter(word => state.statuses[wordKey(word)] === "known").length; }

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  updateStorageMessage();
}

function updateStorageMessage() {
  $("storage-status").textContent = storageAvailable
    ? "Tiến trình lưu trên trình duyệt này"
    : "Không thể lưu tiến trình. Hãy cho phép lưu trữ trên trình duyệt.";
  document.body.classList.toggle("storage-unavailable", !storageAvailable);
}

// Tạo nút chọn phần từ dữ liệu, không cần sửa HTML khi thêm từ.
parts.forEach((part, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "part-button";
  button.innerHTML = `<span class="part-number">${String(index + 1).padStart(2, "0")}</span><span class="part-copy"><span class="part-title">Phần ${index + 1}</span><span class="part-detail"></span></span><span class="part-indicator" aria-hidden="true">↗</span>`;
  button.addEventListener("click", () => {
    state.activePart = index;
    render();
    saveState();
    $("feedback").textContent = `Đang học phần ${index + 1}. Tiến trình các phần khác được giữ lại.`;
  });
  $("part-list").appendChild(button);
});

function setFlipped(value) {
  isFlipped = value;
  $("flashcard").classList.toggle("is-flipped", value);
  $("flashcard").setAttribute("aria-pressed", String(value));
  $("card-front").setAttribute("aria-hidden", String(value));
  $("card-back").setAttribute("aria-hidden", String(!value));
  const word = wordsByKey.get(currentSession().currentKey);
  $("flashcard").setAttribute("aria-label", value
    ? `Hán-Việt: ${word.hanViet || "Chưa bổ sung"}. ${word.kanjiMeaning || ""}. ${word.hiragana}. ${word.meaning}. Lật thẻ để xem lại Kanji.`
    : `${word.kanji}. Lật thẻ để xem Hán-Việt, nghĩa từng chữ Kanji, Hiragana và nghĩa của từ.`);
  $("flip-hint").textContent = value
    ? "↻ Chạm vào thẻ hoặc nhấn Space để quay lại Kanji"
    : "↻ Chạm vào thẻ hoặc nhấn Space để xem đáp án";
}

function render() {
  const session = currentSession();
  const part = parts[state.activePart];
  const word = wordsByKey.get(session.currentKey);
  // Tắt hiệu ứng khi đổi từ, tránh hiện đáp án trong lúc mặt sau đang xoay.
  $("flashcard").classList.add("no-animation");
  setFlipped(false);
  $("kanji").textContent = word.kanji;
  $("kanji").classList.toggle("long-word", [...word.kanji].length >= 4);
  $("hiragana").textContent = word.hiragana;
  $("han-viet").textContent = word.hanViet || "Chưa bổ sung Hán-Việt";
  $("kanji-meaning").textContent = word.kanjiMeaning || "Chưa bổ sung nghĩa từng chữ Kanji.";
  $("meaning").textContent = word.meaning;
  void $("flashcard").offsetWidth; // Yêu cầu trình duyệt áp dụng trạng thái mặt trước.
  $("flashcard").classList.remove("no-animation");

  const known = countKnown(part);
  const percent = Math.round(known / part.length * 100);
  $("counter").textContent = `${session.order.indexOf(session.currentKey) + 1} / ${part.length}`;
  $("known-count").textContent = `${known} / ${part.length} từ đã nhớ`;
  $("progress-percent").textContent = `${percent}%`;
  $("part-progress").max = part.length;
  $("part-progress").value = known;
  $("part-label").textContent = `PHẦN ${String(state.activePart + 1).padStart(2, "0")}`;
  const start = state.activePart * WORDS_PER_PART + 1;
  $("part-range").textContent = `Từ ${String(start).padStart(2, "0")}–${start + part.length - 1}`;
  const status = state.statuses[session.currentKey];
  $("word-status").dataset.status = status || "new";
  $("word-status").textContent = status === "known" ? "✓ Đã nhớ" : status === "missed" ? "↺ Cần ôn lại" : "Từ mới";
  $("known").setAttribute("aria-pressed", String(status === "known"));
  $("not-known").setAttribute("aria-pressed", String(status === "missed"));
  $("previous").disabled = session.history.length === 0 && session.order.length <= 1;
  $("next").disabled = session.order.length <= 1;

  const totalKnown = countKnown(vocabulary);
  $("unit-known").textContent = totalKnown;
  $("unit-total").textContent = ` / ${vocabulary.length} từ đã nhớ`;
  $("course-description").textContent = `${vocabulary.length} từ · ${parts.length} phần học`;
  $("unit-progress").max = vocabulary.length;
  $("unit-progress").value = totalKnown;
  [...$("part-list").children].forEach((button, index) => {
    const active = index === state.activePart;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "true" : "false");
    button.querySelector(".part-detail").textContent = `${countKnown(parts[index])} / ${parts[index].length} đã nhớ`;
  });
  updateStorageMessage();
}

function snapshot(session) {
  return { cursor: session.cursor, currentKey: session.currentKey, normalSinceReview: session.normalSinceReview, lastReviewKey: session.lastReviewKey };
}

// Sau hai lượt chuyển bình thường, ôn một từ chưa nhớ rồi tiếp tục từ vị trí cũ.
// Không nhân đôi từ trong bộ thẻ; số từ đã nhớ luôn được tính theo từ duy nhất.
function nextWord() {
  const session = currentSession();
  if (session.order.length <= 1) return;
  session.history.push(snapshot(session));
  if (session.history.length > 100) session.history.shift();
  const missed = session.order.filter(key => state.statuses[key] === "missed");
  let reviewKey;
  if (session.normalSinceReview >= 2 && missed.length) {
    const after = (missed.indexOf(session.lastReviewKey) + 1) % missed.length;
    for (let offset = 0; offset < missed.length; offset++) {
      const candidate = missed[(after + offset) % missed.length];
      if (candidate !== session.currentKey) { reviewKey = candidate; break; }
    }
  }
  if (reviewKey) {
    session.currentKey = reviewKey;
    session.lastReviewKey = reviewKey;
    session.normalSinceReview = 0;
  } else {
    session.cursor = (session.cursor + 1) % session.order.length;
    session.currentKey = session.order[session.cursor];
    session.normalSinceReview = Math.min(2, session.normalSinceReview + 1);
  }
  render();
  saveState();
  $("feedback").textContent = reviewKey
    ? "Ôn lại một chút: đây là từ bạn đã đánh dấu Chưa nhớ."
    : "Từ chưa nhớ sẽ được ưu tiên ôn lại sau hai lượt chuyển từ.";
}

function previousWord() {
  const session = currentSession();
  if (session.history.length) {
    Object.assign(session, session.history.pop());
  } else {
    session.cursor = (session.order.indexOf(session.currentKey) - 1 + session.order.length) % session.order.length;
    session.currentKey = session.order[session.cursor];
    session.normalSinceReview = 0;
  }
  render();
  saveState();
  $("feedback").textContent = "Đã quay lại thẻ trước. Kết quả đánh dấu được giữ nguyên.";
}

function rateWord(status) {
  const word = wordsByKey.get(currentSession().currentKey);
  state.statuses[currentSession().currentKey] = status;
  nextWord(); // Đánh dấu xong chuyển sang thẻ tiếp theo, luôn ở mặt Kanji.
  // Phần chỉ còn một từ vẫn cần cập nhật và lưu kết quả.
  if (currentSession().order.length === 1) { render(); saveState(); }
  const complete = countKnown(parts[state.activePart]) === parts[state.activePart].length;
  $("feedback").textContent = complete
    ? "Tuyệt vời! Bạn đã nhớ tất cả từ trong phần này. Có thể chọn phần tiếp hoặc tiếp tục ôn."
    : status === "known" ? `Đã nhớ “${word.kanji}”. Tiếp tục nhé!` : `“${word.kanji}” được đánh dấu Chưa nhớ và sẽ sớm xuất hiện lại.`;
}

// Fisher–Yates: mỗi từ vẫn xuất hiện đúng một lần trong thứ tự thẻ.
function shuffleWords() {
  const session = currentSession();
  for (let index = session.order.length - 1; index > 0; index--) {
    const random = Math.floor(Math.random() * (index + 1));
    [session.order[index], session.order[random]] = [session.order[random], session.order[index]];
  }
  session.cursor = 0;
  session.currentKey = session.order[0];
  session.history = [];
  session.normalSinceReview = 0;
  session.lastReviewKey = null;
  render();
  saveState();
  $("feedback").textContent = "Đã xáo trộn phần đang học. Kết quả đã nhớ vẫn được giữ lại.";
}

function resetPart() {
  // Chỉ xóa dữ liệu của phần đang chọn, không dùng localStorage.clear().
  if (!window.confirm(`Học lại phần ${state.activePart + 1} từ đầu? Kết quả của phần này sẽ được đặt lại; các phần khác được giữ nguyên.`)) return;
  parts[state.activePart].forEach(word => delete state.statuses[wordKey(word)]);
  state.sessions[state.activePart] = createSession(parts[state.activePart]);
  render();
  saveState();
  $("feedback").textContent = "Bắt đầu lại phần này từ thẻ đầu tiên. Chúc bạn học vui!";
}

$("flashcard").addEventListener("click", () => setFlipped(!isFlipped));
$("previous").addEventListener("click", previousWord);
$("next").addEventListener("click", nextWord);
$("shuffle").addEventListener("click", shuffleWords);
$("known").addEventListener("click", () => rateWord("known"));
$("not-known").addEventListener("click", () => rateWord("missed"));
$("reset").addEventListener("click", resetPart);

document.addEventListener("keydown", event => {
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
  // Không cản nhập liệu nếu sau này bổ sung ô tìm kiếm hay form.
  if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault(); // Không cuộn trang hoặc kích hoạt lại nút đang focus.
    setFlipped(!isFlipped);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault(); previousWord();
  } else if (event.key === "ArrowRight") {
    event.preventDefault(); nextWord();
  }
});

render();
if (recoveredStorage) $("feedback").textContent = "Dữ liệu lưu trước đó bị hỏng. Website đã khởi tạo lại tiến trình để bạn tiếp tục học.";
