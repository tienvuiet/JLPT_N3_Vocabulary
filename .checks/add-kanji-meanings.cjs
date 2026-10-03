// Tạo dữ liệu Hán-Việt từ nghĩa cơ bản của từng chữ, không đổi dữ liệu gốc.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const file = path.resolve(__dirname, '../flashcard/script.js');
let source = fs.readFileSync(file, 'utf8');
const vocabulary = vm.runInNewContext(source.split('const WORDS_PER_PART')[0] + '\nvocabulary');
const entries = `
性|tính|tính chất, bản tính
別|biệt|phân biệt, khác nhau
理|lý|lý lẽ, nguyên lý
想|tưởng|nghĩ, tưởng tượng
高|cao|cao
齢|linh|tuổi
年|niên|năm, tuổi
上|thượng|trên, lên
目|mục|mắt
先|tiên|trước
輩|bối|lớp người, thế hệ
後|hậu|sau
司|tư|quản lý, phụ trách
相|tương|lẫn nhau, đối nhau
手|thủ|tay
知|tri|biết
合|hợp|hợp lại, phù hợp
友|hữu|bạn
人|nhân|người
仲|trọng|ở giữa; quan hệ giữa người
生|sinh|sinh ra, sống
月|nguyệt|tháng, mặt trăng
日|nhật|ngày, mặt trời
誕|đản|sinh ra
出|xuất|ra
身|thân|thân thể, bản thân
故|cố|cũ, trước đây
郷|hương|quê hương
成|thành|thành, trở thành
長|trường|dài; lớn lên
格|cách|tiêu chuẩn, tư cách
進|tiến|tiến lên
学|học|học tập
退|thoái|lùi, rời khỏi
就|tựu|đến, bắt đầu làm
職|chức|nghề, chức vụ
失|thất|mất, thất bại
業|nghiệp|nghề, công việc
残|tàn|còn lại
活|hoạt|sống, hoạt động
通|thông|đi qua, thông suốt
勤|cần|chăm chỉ, làm việc
歴|lịch|trải qua, quá trình
給|cấp|cung cấp
料|liệu|vật liệu, khoản phí
面|diện|mặt
接|tiếp|tiếp xúc, nối tiếp
休|hưu|nghỉ
憩|khế|nghỉ ngơi
観|quan|xem, quan sát
光|quang|ánh sáng
帰|quy|trở về
国|quốc|nước, quốc gia
省|tỉnh|thăm hỏi; xem xét
宅|trạch|nhà ở
参|tham|tham gia
加|gia|thêm vào
席|tịch|chỗ ngồi
欠|khiếm|thiếu, vắng
遅|trì|chậm, muộn
刻|khắc|khắc; thời điểm
化|hóa|biến đổi
粧|trang|trang điểm
計|kế|tính toán, kế hoạch
算|toán|tính toán
画|họa|vẽ; hoạch định
功|công|công lao, thành quả
敗|bại|thua, thất bại
準|chuẩn|chuẩn bị; tiêu chuẩn
備|bị|chuẩn bị, sẵn sàng
整|chỉnh|chỉnh đốn, ngay ngắn
注|chú|rót vào; chú ý
文|văn|văn bản, chữ viết
貯|trữ|tích trữ
金|kim|vàng, tiền
徹|triệt|suốt, xuyên suốt
夜|dạ|đêm
引|dẫn|kéo, dẫn
越|việt|vượt qua
体|thể|cơ thể
重|trọng|nặng, trọng lượng
怪|quái|lạ, kỳ quái
我|ngã|tôi, bản thân
会|hội|gặp, hội họp
趣|thú|thú vui, hướng tới
味|vị|vị, hương vị
興|hưng|hứng thú, nổi lên
思|tư|nghĩ
冗|nhũng|thừa, rườm rà
談|đàm|nói chuyện
的|đích|mục tiêu
約|ước|hẹn, cam kết
束|thúc|buộc, bó
遠|viễn|xa
慮|lự|lo nghĩ, cân nhắc
慢|mạn|chậm; kiêu ngạo
迷|mê|lạc, mê
惑|hoặc|bối rối, nghi hoặc
希|hi|mong, hiếm
望|vọng|mong đợi, trông
夢|mộng|giấc mơ
賛|tán|khen, tán thành
反|phản|ngược, chống lại
対|đối|đối diện, đối lại
像|tượng|hình ảnh, hình tượng
努|nỗ|cố gắng
力|lực|sức lực
太|thái|lớn
陽|dương|mặt trời, phía có nắng
地|địa|đất
球|cầu|hình cầu
温|ôn|ấm
度|độ|mức độ
湿|thấp|ẩm, ướt
気|khí|khí, hơi
梅|mai|cây mai, mơ
雨|vũ|mưa
暖|noãn|ấm áp
房|phòng|phòng, buồng
皮|bì|da, vỏ
缶|phẫu|đồ đựng; lon trong tiếng Nhật
番|phiên|lượt, phiên
組|tổ|nhóm, tổ chức
記|ký|ghi chép
事|sự|việc, sự việc
近|cận|gần
所|sở|nơi, chỗ
警|cảnh|cảnh giác, cảnh báo
察|sát|xem xét, quan sát
犯|phạm|vi phạm, phạm tội
小|tiểu|nhỏ
銭|tiền|tiền, đồng tiền
作|tác|làm, tạo ra
者|giả|người
品|phẩm|vật phẩm, sản phẩm
制|chế|quy định, chế độ
服|phục|quần áo; phục tùng
洗|tẩy|rửa
剤|tễ|chất, chế phẩm
底|để|đáy
下|hạ|dưới, xuống
寺|tự|chùa
道|đạo|đường, lối
路|lộ|đường
坂|phản|dốc
煙|yên|khói
灰|hôi|tro
判|phán|phán định; dấu xác nhận
名|danh|tên
刺|thích|đâm; thẻ ghi tên
免|miễn|miễn, cho phép
許|hứa|cho phép
多|đa|nhiều
前|tiền|trước
半|bán|nửa
最|tối|nhất
低|đê|thấp
初|sơ|đầu tiên
自|tự|tự mình
動|động|chuyển động
種|chủng|loại, giống
類|loại|loại, nhóm
質|chất|bản chất, tính chất
順|thuận|theo thứ tự, thuận
方|phương|phương hướng, cách
法|pháp|phương pháp, quy tắc
製|chế|chế tạo, làm ra
値|trị|giá trị, giá tiền
`.trim();
const dictionary = new Map(entries.split('\n').map(line => {
  const [character, reading, meaning] = line.split('|');
  return [character, { reading, meaning }];
}));
const overrides = { '成長': { '長': 'trưởng' }, '計画': { '画': 'hoạch' } };
const updated = vocabulary.map(word => {
  const chars = [...word.kanji].filter(character => /\p{Script=Han}/u.test(character));
  const items = chars.map(character => {
    const entry = dictionary.get(character);
    if (!entry) throw new Error('Missing character: ' + character);
    return { character, reading: overrides[word.kanji]?.[character] || entry.reading, meaning: entry.meaning };
  });
  return {
    kanji: word.kanji,
    hiragana: word.hiragana,
    hanViet: items.length ? items.map(item => item.reading).join(' ').toLocaleUpperCase('vi') : 'Không có Kanji',
    kanjiMeaning: items.length ? items.map(item => `${item.character} (${item.reading}): ${item.meaning}`).join(' · ') : 'Từ này được viết hoàn toàn bằng Hiragana.',
    meaning: word.meaning
  };
});
let index = 0;
source = source.replace(/  \{ kanji: [^\r\n]+/g, () => {
  const word = updated[index++];
  const fields = Object.entries(word).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ');
  return `  { ${fields} }${index < updated.length ? ',' : ''}`;
});
if (index !== 120) throw new Error('Expected 120 vocabulary entries');
fs.writeFileSync(file, source, 'utf8');
console.log(`Updated ${index} entries with Han-Viet and per-character meanings.`);
