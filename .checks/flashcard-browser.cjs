const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const net = require('node:net');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const original = fs.readFileSync('C:/Users/Admin/.codex/attachments/05cee8ed-3fb9-491d-810c-79a03a4310ac/Pasted text.txt', 'utf8');
const source = fs.readFileSync(path.join(root, 'flashcard/script.js'), 'utf8');
const expected = vm.runInNewContext(original + '\nvocabulary');
const actual = vm.runInNewContext(source.split('const WORDS_PER_PART')[0] + '\nvocabulary');
assert.equal(JSON.stringify(actual.map(({ kanji, hiragana, meaning }) => ({ kanji, hiragana, meaning }))), JSON.stringify(expected), 'Original vocabulary preserved exactly');
assert.ok(actual.every(word => typeof word.hanViet === 'string' && word.hanViet && typeof word.kanjiMeaning === 'string' && word.kanjiMeaning && !('romaji' in word)), 'All 120 words have Han-Viet and per-character meanings; Romaji removed');
assert.equal(actual.find(word => word.kanji === '製品').hanViet, 'CHẾ PHẨM');
assert.equal(actual.find(word => word.kanji === '生年月日').hanViet, 'SINH NIÊN NGUYỆT NHẬT');
assert.equal(actual.find(word => word.kanji === '引っ越し').hanViet, 'DẪN VIỆT');
assert.equal(actual.find(word => word.kanji === 'おしゃべり').hanViet, 'Không có Kanji');
actual.forEach(word => [...word.kanji].filter(c => /\p{Script=Han}/u.test(c)).forEach(c => assert.ok(word.kanjiMeaning.includes(c + ' ('), 'Every Kanji explained: ' + c)));

const profile = path.join(__dirname, 'chrome-profile-' + Date.now());
fs.mkdirSync(profile, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', '--remote-allow-origins=*', `--user-data-dir=${profile}`, 'about:blank'
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
let failures = [];
let checks = 0;
const keepAlive = setInterval(() => {}, 1000);
async function main() {
  const portFile = path.join(profile, 'DevToolsActivePort');
  let port;
  for (let i = 0; i < 60; i++) {
    if (fs.existsSync(portFile)) { port = Number(fs.readFileSync(portFile, 'utf8').split('\n')[0]); break; }
    await delay(150);
  }
  assert.ok(port, 'Chrome started');
  console.log('Chrome started on port ' + port);
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  console.log('Connecting to browser');
  const url = new URL(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  socket = net.createConnection({ host: url.hostname, port: Number(url.port) });
  let incoming = Buffer.alloc(0);
  let messageHandler;
  let handshakeDone = false;
  await new Promise((resolve, reject) => {
    socket.on('error', reject);
    socket.on('connect', () => socket.write(`GET ${url.pathname} HTTP/1.1\r\nHost: ${url.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${crypto.randomBytes(16).toString('base64')}\r\nSec-WebSocket-Version: 13\r\n\r\n`));
    socket.on('data', chunk => {
      incoming = Buffer.concat([incoming, chunk]);
      if (!handshakeDone) {
        const end = incoming.indexOf('\r\n\r\n');
        if (end < 0) return;
        assert.ok(/^HTTP\/1.1 101 /.test(incoming.subarray(0, end).toString()), incoming.subarray(0, end).toString());
        incoming = incoming.subarray(end + 4);
        handshakeDone = true;
        resolve();
      }
      while (incoming.length >= 2) {
        const opcode = incoming[0] & 15;
        let size = incoming[1] & 127;
        let start = 2;
        if (size === 126) { if (incoming.length < 4) return; size = incoming.readUInt16BE(2); start = 4; }
        if (size === 127) { if (incoming.length < 10) return; size = Number(incoming.readBigUInt64BE(2)); start = 10; }
        if (incoming.length < start + size) return;
        const payload = incoming.subarray(start, start + size);
        incoming = incoming.subarray(start + size);
        if (opcode === 1) messageHandler?.(JSON.parse(payload.toString()));
      }
    });
  });
  console.log('Browser connection ready');
  let nextId = 0;
  const pending = new Map();
  messageHandler = message => {
    if (message.method === 'Runtime.exceptionThrown') failures.push(message.params.exceptionDetails.text);
    if (pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    const payload = Buffer.from(JSON.stringify({ id, method, params }));
    const mask = crypto.randomBytes(4);
    const header = Buffer.alloc(payload.length < 126 ? 2 : 4);
    header[0] = 129;
    if (payload.length < 126) header[1] = 128 | payload.length;
    else { header[1] = 254; header.writeUInt16BE(payload.length, 2); }
    const masked = Buffer.from(payload);
    for (let i = 0; i < masked.length; i++) masked[i] ^= mask[i % 4];
    socket.write(Buffer.concat([header, mask, masked]));
    const timeout = setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('Timed out: ' + method)); } }, 10000);
    timeout.unref();
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const check = async (expression, label) => {
    assert.equal(await evaluate(expression), true, label);
    checks++;
    console.log('PASS ' + label);
  };
  const reload = async () => {
    await send('Page.reload');
    await delay(200);
    for (let i = 0; i < 30; i++) {
      if (await evaluate('document.readyState === "complete" && typeof state !== "undefined"')) return;
      await delay(100);
    }
    throw new Error('Page did not reload');
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'file:///' + path.join(root, 'index.html').replaceAll('\\', '/') });
  await delay(300);
  await check('location.pathname.endsWith("/flashcard/index.html") && typeof state !== "undefined"', 'Root index redirects to working flashcard page');
  await evaluate('localStorage.clear()');
  await reload();
  await check('vocabulary.length === 120 && parts.length === 3 && parts.every(p => p.length === 40)', '120 words in three equal parts');
  await check('$("kanji").textContent === "性別" && $("counter").textContent === "1 / 40" && !isFlipped', 'First card has Kanji only');
  await evaluate('$("flashcard").click()');
  await check('isFlipped && $("han-viet").textContent === "TÍNH BIỆT" && $("kanji-meaning").textContent.includes("性 (tính)") && $("kanji-meaning").textContent.includes("別 (biệt)") && $("hiragana").textContent === "せいべつ" && $("meaning").textContent === "Giới tính" && $("card-back").getAttribute("aria-hidden") === "false" && $("flashcard").getAttribute("aria-label").includes("TÍNH BIỆT") && !$("romaji")', 'Click reveals Han-Viet, each Kanji meaning, Hiragana and whole-word meaning');
  await evaluate('document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", code: "ArrowRight", bubbles: true }))');
  await check('$("kanji").textContent === "理想" && !isFlipped', 'Right arrow advances and resets front face');
  await evaluate('document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })); document.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true }))');
  await check('$("kanji").textContent === "性別" && isFlipped', 'Left arrow returns and Space flips');
  await evaluate('$("not-known").click(); $("next").click(); $("next").click()');
  await check('$("kanji").textContent === "性別" && $("word-status").textContent.includes("Cần ôn")', 'Forgotten word returns after two ordinary advances');
  await evaluate('$("previous").click()');
  await check('$("kanji").textContent === "高齢"', 'Previous returns to actual card before priority review');
  await evaluate('$("known").click()');
  await check('$("known-count").textContent === "1 / 40 từ đã nhớ" && $("unit-known").textContent === "1" && $("part-progress").value === 1', 'Remembered count and progress update');
  const beforeReload = await evaluate('JSON.stringify(state)');
  await reload();
  assert.equal(await evaluate('JSON.stringify(state)'), beforeReload, 'All state survives refresh');
  console.log('PASS All state survives refresh'); checks++;
  await evaluate('$("part-list").children[1].click()');
  await check('$("kanji").textContent === "化粧" && $("known-count").textContent === "0 / 40 từ đã nhớ"', 'Part two uses its own progress');
  await evaluate('$("known").click(); $("part-list").children[2].click()');
  await check('$("kanji").textContent === "缶" && $("unit-known").textContent === "2"', 'Part three begins at original word 81');
  await evaluate('$("part-list").children[0].click(); $("shuffle").click()');
  await check('new Set(currentSession().order).size === 40 && $("counter").textContent === "1 / 40" && $("unit-known").textContent === "2" && !isFlipped', 'Shuffle preserves unique words and results');
  const shuffleState = await evaluate('JSON.stringify(state)');
  await reload();
  assert.equal(await evaluate('JSON.stringify(state)'), shuffleState, 'Shuffled order survives refresh');
  console.log('PASS Shuffled order survives refresh'); checks++;
  await evaluate('window.confirm = () => false; $("reset").click()');
  await check('$("unit-known").textContent === "2"', 'Cancel reset keeps progress');
  await evaluate('window.confirm = () => true; $("reset").click()');
  await check('$("kanji").textContent === "性別" && $("known-count").textContent === "0 / 40 từ đã nhớ" && $("unit-known").textContent === "1"', 'Reset restores only active part');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1050, deviceScaleFactor: 1, mobile: false });
  await delay(200);
  await check('document.documentElement.scrollWidth <= innerWidth', 'Desktop has no horizontal overflow');
  let screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(__dirname, 'desktop.png'), Buffer.from(screenshot.data, 'base64'));
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(200);
  await check('document.documentElement.scrollWidth <= innerWidth && $("flashcard").getBoundingClientRect().width <= innerWidth', '390px mobile has no horizontal overflow');
  await evaluate('$("flashcard").click()');
  await delay(700);
  await check('isFlipped && $("han-viet").textContent === "TÍNH BIỆT" && $("han-viet").getBoundingClientRect().top >= $("flashcard").getBoundingClientRect().top && $("meaning").getBoundingClientRect().bottom <= $("flashcard").getBoundingClientRect().bottom', 'Han-Viet explanation and answer fit on mobile card');
  screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync(path.join(__dirname, 'mobile.png'), Buffer.from(screenshot.data, 'base64'));
  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 740, deviceScaleFactor: 1, mobile: true });
  await evaluate('state.activePart = 0; currentSession().currentKey = wordKey(vocabulary[12]); render()');
  await check('document.documentElement.scrollWidth <= innerWidth && $("kanji").getBoundingClientRect().width < $("flashcard").getBoundingClientRect().width', 'Long Kanji fits at 320px');
  await check('vocabulary.every(word => { const partIndex = parts.findIndex(part => part.includes(word)); state.activePart = partIndex; currentSession().currentKey = wordKey(word); render(); setFlipped(true); const card = $("flashcard").getBoundingClientRect(); return $("han-viet").getBoundingClientRect().top >= card.top && $("meaning").getBoundingClientRect().bottom <= card.bottom && $("card-back").scrollHeight <= $("card-back").clientHeight; })', 'All 120 full answers fit at 320px');
  await check('$("study-title").textContent === "Mỗi ngày, một chút tiếng Nhật." && $("study-title").textContent === $("study-title").textContent.normalize("NFC") && !getComputedStyle($("study-title")).fontFamily.includes("Georgia") && getComputedStyle($("study-title")).letterSpacing === "normal"', 'Vietnamese title uses correct Unicode and system font without negative spacing');
  for (const [width, height] of [[320,568], [360,640], [375,667], [390,844], [430,932], [600,800], [768,1024], [820,1180], [980,700], [981,700], [1024,768], [1280,720], [1440,900], [1920,1080], [2560,1440], [844,390]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await evaluate('state.activePart = 0; currentSession().currentKey = wordKey(vocabulary[12]); render(); setFlipped(true)');
    await delay(50);
    await check('document.documentElement.scrollWidth <= innerWidth && $("study-title").scrollWidth <= $("study-title").clientWidth && $("card-back").scrollHeight <= $("card-back").clientHeight && $("kanji").scrollWidth <= $("kanji").clientWidth && $("flashcard").getBoundingClientRect().width <= innerWidth && $("known").getBoundingClientRect().height >= 44 && $("not-known").getBoundingClientRect().right <= $("known").getBoundingClientRect().left && (innerWidth <= 980 || document.querySelector(".main").getBoundingClientRect().left >= document.querySelector(".sidebar").getBoundingClientRect().right)', `Responsive layout fits ${width}x${height}, including long answers and touch controls`);
    if (width === 768) {
      await delay(600);
      const tabletImage = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(path.join(__dirname, 'tablet.png'), Buffer.from(tabletImage.data, 'base64'));
    }
  }
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await check('getComputedStyle(document.querySelector(".card-inner")).transitionDuration === "0s"', 'Reduced motion preference disables flip animation');
  await evaluate('localStorage.setItem(STORAGE_KEY, "broken json")');
  await reload();
  await check('recoveredStorage && $("kanji").textContent === "性別"', 'Corrupted storage recovers without crash');
  await evaluate('Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); }; $("known").click()');
  await check('!storageAvailable && document.body.classList.contains("storage-unavailable") && $("kanji").textContent === "理想"', 'Blocked storage shows notice and learning continues');
  assert.deepEqual(failures, [], 'No browser exceptions');
  console.log(`Verified ${checks} browser checks plus exact original data integrity.`);
  await send('Browser.close');
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  clearInterval(keepAlive);
  socket?.destroy();
  chrome.kill();
});
