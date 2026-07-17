const STORAGE_KEY = "spiritBeastTrail.v2";

const BEASTS = [
  { id: "fox", name: "青狐", icon: "🦊", asset: "assets/beast-fox.png" },
  { id: "bird", name: "赤鸟", icon: "🕊️", asset: "assets/beast-crimson-bird.jpg" },
  { id: "turtle", name: "玄龟", icon: "🐢", asset: "assets/beast-turtle.jpg" },
  { id: "ape", name: "白猿", icon: "🦍", asset: "assets/beast-ape.jpg" },
  { id: "koi", name: "金鲤", icon: "🐟", asset: "assets/beast-koi.jpg" },
  { id: "deer", name: "灵鹿", icon: "🦌", asset: "assets/beast-deer.png" },
  { id: "cat", name: "月狸", icon: "🐈", asset: "assets/beast-moon-cat.png" },
  { id: "crane", name: "云鹤", icon: "🦢", asset: "assets/beast-crane.png" },
  { id: "rabbit", name: "玉兔", icon: "🐇", asset: "assets/beast-rabbit.png" },
  { id: "butterfly", name: "梦蝶", icon: "🦋", asset: "assets/beast-dream-butterfly.png" },
  { id: "moth", name: "月蛾", icon: "🦋", asset: "assets/beast-moon-moth.png" },
  { id: "owl", name: "夜枭", icon: "🦉", asset: "assets/beast-night-owl.png" },
  { id: "otter", name: "水獭", icon: "🦦", asset: "assets/beast-otter.png" },
  { id: "serpent", name: "青蛇", icon: "🐍", asset: "assets/beast-serpent.png" },
  { id: "goat", name: "云羊", icon: "🐐", asset: "assets/beast-cloud-ram.png" },
  { id: "horse", name: "天马", icon: "🐎", asset: "assets/beast-heavenly-horse.png" },
  { id: "dog", name: "灵犬", icon: "🐕", asset: "assets/beast-hound.png" },
  { id: "dragon", name: "虬龙", icon: "🐉", asset: "assets/beast-dragon.png" }
];

// 机关只写在关卡数据中；后续新增封印、巡游、五行等规则无需重写关卡流程。
const LEVELS = [
  { id: 1, name: "初入山门", columns: 4, pairs: 8, moves: 16, xp: 40, chapter: "记忆教学", note: "连续翻开两张相同灵兽牌即可消除。" },
  { id: 2, name: "云阶留痕", columns: 4, pairs: 8, moves: 14, xp: 50, chapter: "记忆教学", note: "先记住已经翻开的踪影，再做有把握的选择。" },
  { id: 3, name: "月池回音", columns: 4, pairs: 8, moves: 13, xp: 60, chapter: "记忆教学", note: "观微镜可短暂展示全部未翻牌。" },
  { id: 4, name: "松风旧径", columns: 4, pairs: 8, moves: 12, xp: 70, chapter: "记忆教学", note: "步数有限，尽量减少无把握的试探。" },
  { id: 5, name: "星台试炼", columns: 4, pairs: 8, moves: 11, xp: 80, chapter: "记忆教学", note: "完成这一关，即可进入机关试炼。" },
  { id: 6, name: "薄雾石径", columns: 4, pairs: 10, moves: 17, xp: 100, chapter: "机关教学", mechanisms: { fog: { indexes: [1, 18], unlock: "adjacent-match" } }, note: "消除一对相邻灵兽牌，才能驱散迷雾。" },
  { id: 7, name: "朱印回廊", columns: 4, pairs: 10, moves: 18, xp: 110, chapter: "机关教学", mechanisms: { seal: { indexes: [3, 16] } }, note: "封印牌首次翻开只会解印，再次翻到才能消除。" },
  { id: 8, name: "藏真石台", columns: 4, pairs: 10, moves: 17, xp: 120, chapter: "机关教学", mechanisms: { seal: { indexes: [0, 5, 11, 19] } }, note: "观察已解印的灵兽，留意它们可能的同伴。" },
  { id: 9, name: "月影封台", columns: 4, pairs: 10, moves: 16, xp: 130, chapter: "机关教学", mechanisms: { seal: { indexes: [2, 7, 12, 17] } }, note: "封印数量增多，先规划需要二次翻开的牌。" },
  { id: 10, name: "移星初阵", columns: 4, pairs: 10, moves: 18, xp: 140, chapter: "机关教学", mechanisms: { teleport: { routes: [{ source: 1, swap: [16, 19] }] } }, note: "翻开阵眼后，带有星标的两张牌会固定交换位置。" },
  { id: 11, name: "双星换位", columns: 4, pairs: 10, moves: 17, xp: 150, chapter: "机关教学", mechanisms: { teleport: { routes: [{ source: 1, swap: [4, 7] }, { source: 18, swap: [12, 15] }] } }, note: "两座阵眼各自对应一组星标牌，交换规律不会改变。" },
  { id: 12, name: "列宿回环", columns: 4, pairs: 10, moves: 16, xp: 160, chapter: "机关教学", mechanisms: { teleport: { routes: [{ source: 1, swap: [4, 7] }, { source: 10, swap: [12, 15] }, { source: 18, swap: [0, 3] }] } }, note: "先看清星标连线，再决定何时触发阵眼。" },
  { id: 13, name: "幻形初现", columns: 4, pairs: 10, moves: 18, xp: 170, chapter: "机关教学", mechanisms: { disguise: { cards: [{ index: 2, as: "bird" }] } }, note: "伪装牌首次会显现假象，第二次翻开才显出真身。" },
  { id: 14, name: "镜湖疑云", columns: 4, pairs: 10, moves: 17, xp: 180, chapter: "机关教学", mechanisms: { disguise: { cards: [{ index: 0, as: "koi" }, { index: 6, as: "fox" }, { index: 13, as: "ape" }] } }, note: "记住伪装牌的位置，别把第一次看到的图案当成真相。" },
  { id: 15, name: "百兽幻踪", columns: 4, pairs: 10, moves: 16, xp: 190, chapter: "机关教学", mechanisms: { disguise: { cards: [{ index: 1, as: "bird" }, { index: 5, as: "turtle" }, { index: 14, as: "koi" }, { index: 18, as: "fox" }] } }, note: "多个假象会同时出现，第二次翻开才是可靠线索。" },
  { id: 16, name: "雾锁朱印", columns: 6, pairs: 18, moves: 31, xp: 210, chapter: "组合试炼", mechanisms: { fog: { indexes: [2, 33], unlock: "adjacent-match" }, seal: { indexes: [5, 30] } }, note: "迷雾与封印同时出现：先创造相邻配对，再规划二次翻开。" },
  { id: 17, name: "灵台叠禁", columns: 6, pairs: 18, moves: 29, xp: 230, chapter: "组合试炼", mechanisms: { fog: { indexes: [1, 10, 25] }, seal: { indexes: [6, 20, 35] } }, note: "更多封锁会压缩路线，谨慎保存已翻开的关键信息。" },
  { id: 18, name: "星雾封关", columns: 6, pairs: 18, moves: 28, xp: 250, chapter: "组合试炼", mechanisms: { fog: { indexes: [0, 35] }, seal: { indexes: [5, 30] }, teleport: { routes: [{ source: 10, swap: [14, 17] }, { source: 25, swap: [18, 21] }] } }, note: "迷雾、封印与传送阵交织，先观察预告，再控制触发时机。" }
];

const CHALLENGE_TEMPLATES = [
  { id: "mist-star", name: "周天迷阵", columns: 5, rows: 5, pairs: 12, moves: 15, xp: 260, blockedIndexes: [12], tools: { mirror: 0, tracker: 1, breaker: 1 }, mechanisms: { fog: 3, teleport: 2 }, note: "极难试炼：中心石位不可翻开；迷雾需相邻消除，两个星标传送阵按固定位置换位。" },
  { id: "seal-orbit", name: "封星回廊", columns: 6, rows: 6, pairs: 18, moves: 23, xp: 300, tools: { mirror: 0, tracker: 1, breaker: 0 }, mechanisms: { seal: 6, teleport: 3 }, note: "极难试炼：六张封印牌与三座固定传送阵同时生效，容错极低。" },
  { id: "mist-seal", name: "雾海天关", columns: 6, rows: 6, pairs: 18, moves: 24, xp: 320, tools: { mirror: 0, tracker: 1, breaker: 1 }, mechanisms: { fog: 4, seal: 4, teleport: 2 }, note: "极难试炼：迷雾、封印与传送阵交错，只有精准记忆与触发时机能通关。" }
];

const TUTORIALS = {
  memory: { kicker: "初入山门", title: "记住灵兽的踪影", description: "连续翻开两张相同灵兽牌即可消除。图案不同会短暂停留后盖回，每一回合都会消耗一步。", demo: "<div class=\"demo-card is-open\">青狐</div><span class=\"demo-link\">+</span><div class=\"demo-card is-open\">青狐</div><span class=\"demo-result\">消除</span>" },
  fog: { kicker: "机关初现", title: "迷雾需要相邻灵息驱散", description: "被迷雾覆盖的牌暂时无法翻开。消除一对相邻的灵兽牌后，迷雾才会解除；破禁符也可以直接化开迷雾。", demo: "<div class=\"demo-card is-fog\">迷雾</div><span class=\"demo-arrow\">←</span><div class=\"demo-card is-open\">相邻一对</div><span class=\"demo-result\">解封</span>" },
  seal: { kicker: "机关初现", title: "封印牌需要二次翻开", description: "封印牌第一次翻开只会解除封印，即使图案相同也不会立即消除。记住它的位置，之后再次翻开才会显示真实灵兽。", demo: "<div class=\"demo-card is-seal\">封印</div><span class=\"demo-arrow\">→</span><div class=\"demo-card is-open\">真实灵兽</div><span class=\"demo-result\">二次翻开</span>" },
  teleport: { kicker: "机关初现", title: "传送阵按星标固定换位", description: "翻开阵眼后，棋盘上带星标的两张未翻牌会交换位置。先观察预告关系，再决定何时触发阵眼。", demo: "<div class=\"demo-card is-portal\">阵眼</div><span class=\"demo-arrow\">→</span><div class=\"demo-card is-star\">星标</div><span class=\"demo-card is-star\">星标</span>" },
  disguise: { kicker: "机关初现", title: "伪装牌先显假象，再露真身", description: "伪装牌第一次翻开显示的是假灵兽，本回合结束后才算识破。第二次翻开才会显示真实牌面并参与配对。", demo: "<div class=\"demo-card is-mask\">假象</div><span class=\"demo-arrow\">→</span><div class=\"demo-card is-open\">真身</div><span class=\"demo-result\">识破</span>" },
  combo: { kicker: "组合试炼", title: "多重机关需要规划触发顺序", description: "这一阶段会同时出现迷雾、封印和传送阵。先保证可解封的相邻配对，再利用已知信息控制阵眼，避免浪费有限步数。", demo: "<div class=\"demo-card is-fog\">雾</div><span class=\"demo-card is-seal\">印</span><span class=\"demo-card is-portal\">阵</span><span class=\"demo-result\">规划</span>" }
};

const state = {
  progress: loadProgress(), level: null, cards: [], open: [], matched: 0, moves: 0, mistakes: 0, toolsUsed: 0,
  locked: false, fogUnlocked: false, tools: { mirror: 1, tracker: 1, breaker: 0 }
};
const TOOL_LABELS = { mirror: "显露全部", tracker: "指向行列", breaker: "解除迷雾" };
const el = {
  screens: document.querySelectorAll(".screen"), homeLevel: document.querySelector("#homeLevel"), homeXpFill: document.querySelector("#homeXpFill"), homeXpText: document.querySelector("#homeXpText"), currentStage: document.querySelector("#currentStage"), mainlineProgress: document.querySelector("#mainlineProgress"), streakLine: document.querySelector("#streakLine"), weeklyLabel: document.querySelector("#weeklyLabel"), levelMini: document.querySelector("#levelMini"), levelList: document.querySelector("#levelList"), playChapter: document.querySelector("#playChapter"), playName: document.querySelector("#playName"), movesValue: document.querySelector("#movesValue"), mistakesValue: document.querySelector("#mistakesValue"), objectiveText: document.querySelector("#objectiveText"), pairProgress: document.querySelector("#pairProgress"), mechanismNote: document.querySelector("#mechanismNote"), gameBoard: document.querySelector("#gameBoard"), mirrorTool: document.querySelector("#mirrorTool"), trackerTool: document.querySelector("#trackerTool"), breakerTool: document.querySelector("#breakerTool"), tutorialModal: document.querySelector("#tutorialModal"), tutorialKicker: document.querySelector("#tutorialKicker"), tutorialTitle: document.querySelector("#tutorialTitle"), tutorialDescription: document.querySelector("#tutorialDescription"), tutorialDemo: document.querySelector("#tutorialDemo"), tutorialStartButton: document.querySelector("#tutorialStartButton"), resultModal: document.querySelector("#resultModal"), resultKicker: document.querySelector("#resultKicker"), resultTitle: document.querySelector("#resultTitle"), resultDescription: document.querySelector("#resultDescription"), resultMoves: document.querySelector("#resultMoves"), resultMistakes: document.querySelector("#resultMistakes"), resultTools: document.querySelector("#resultTools"), resultStars: document.querySelector("#resultStars"), resultRecord: document.querySelector("#resultRecord"), xpGain: document.querySelector("#xpGain"), replayButton: document.querySelector("#replayButton"), reviewButton: document.querySelector("#reviewButton"), soundToggle: document.querySelector("#soundToggle"), playSoundToggle: document.querySelector("#playSoundToggle")
};

function loadProgress() { try { return { xp: 0, completed: {}, tutorials: {}, soundEnabled: true, lastRuns: {}, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; } catch { return { xp: 0, completed: {}, tutorials: {}, soundEnabled: true, lastRuns: {} }; } }
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); }
let audioContext;
const SOUND_NOTES = { flip: [[440, 0]], match: [[523, 0], [659, .09]], miss: [[196, 0]], tool: [[587, 0], [784, .08]], unlock: [[392, 0], [523, .1]], teleport: [[349, 0], [698, .08]], win: [[523, 0], [659, .1], [784, .2]], fail: [[262, 0], [196, .12]] };
function playPaperFlip(context) {
  const duration = .09; const length = Math.floor(context.sampleRate * duration); const buffer = context.createBuffer(1, length, context.sampleRate); const samples = buffer.getChannelData(0);
  for (let index = 0; index < length; index += 1) { const fade = 1 - index / length; samples[index] = (Math.random() * 2 - 1) * fade * fade; }
  const source = context.createBufferSource(); const filter = context.createBiquadFilter(); const gain = context.createGain(); const start = context.currentTime;
  filter.type = "bandpass"; filter.frequency.setValueAtTime(1450, start); filter.frequency.exponentialRampToValueAtTime(720, start + duration); filter.Q.value = .7;
  gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(.055, start + .008); gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  source.buffer = buffer; source.connect(filter).connect(gain).connect(context.destination); source.start(start); source.stop(start + duration);
}
function playSound(name) {
  if (!state.progress.soundEnabled || !SOUND_NOTES[name]) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume();
    if (name === "flip") { playPaperFlip(audioContext); return; }
    SOUND_NOTES[name].forEach(([frequency, offset]) => {
      const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); const start = audioContext.currentTime + offset;
      oscillator.type = name === "miss" || name === "fail" ? "triangle" : "sine"; oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(.045, start + .012); gain.gain.exponentialRampToValueAtTime(.0001, start + .12);
      oscillator.connect(gain).connect(audioContext.destination); oscillator.start(start); oscillator.stop(start + .13);
    });
  } catch { /* Audio is optional and must never interrupt play. */ }
}
function renderSoundButtons() {
  const enabled = state.progress.soundEnabled; [el.soundToggle, el.playSoundToggle].forEach((button) => {
    button.textContent = enabled ? "♬" : "×"; button.setAttribute("aria-label", enabled ? "关闭音效" : "开启音效"); button.title = enabled ? "关闭音效" : "开启音效";
  });
}
function toggleSound() { state.progress.soundEnabled = !state.progress.soundEnabled; saveProgress(); renderSoundButtons(); if (state.progress.soundEnabled) playSound("tool"); }
function playerLevel() { return 1 + Math.floor(state.progress.xp / 100); }
function xpInLevel() { return state.progress.xp % 100; }
function showScreen(id) { el.screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id)); window.scrollTo(0, 0); }
function nextLevel() { return LEVELS.find((level) => !state.progress.completed[level.id]) || null; }
function weekSeed() { const now = new Date(); const start = new Date(now.getFullYear(), 0, 1); const week = Math.floor((now - start) / 604800000); return `${now.getFullYear()}-W${week}`; }
function hashSeed(value) { return [...String(value)].reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 2166136261) >>> 0; }
function seededRandom(seed) { let value = hashSeed(seed); return () => { value |= 0; value = (value + 0x6D2B79F5) | 0; let t = Math.imul(value ^ value >>> 15, 1 | value); t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function seededShuffle(items, seed) { const clone = [...items]; const random = seededRandom(seed); for (let index = clone.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(random() * (index + 1)); [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]]; } return clone; }
function createRunSeed(level) { const entropy = globalThis.crypto?.getRandomValues ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0] : Math.floor(Math.random() * 0xFFFFFFFF); return `${level.id}-${Date.now().toString(36)}-${entropy.toString(36)}`; }
function hasAdjacentPairs(cards, columns) { return cards.some((card, index) => card && [index + 1, index + columns].some((otherIndex) => { const other = cards[otherIndex]; return other && card.id === other.id && (otherIndex === index + columns || Math.floor(otherIndex / columns) === Math.floor(index / columns)); })); }
function createBalancedCards(deck, level, seed) {
  const slotCount = level.columns * (level.rows || Math.ceil(deck.length / level.columns)); let fallback = [];
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const cards = placeCards(seededShuffle(deck, `${seed}:cards:${attempt}`), slotCount, level.blockedIndexes || []);
    if (!hasAdjacentPairs(cards, level.columns)) return cards;
    fallback = cards;
  }
  return fallback;
}
function randomizeMechanisms(template, cards, seed) {
  if (!template) return undefined;
  const slots = seededShuffle(cards.map((card, index) => card ? index : null).filter(Number.isInteger), `${seed}:mechanisms`);
  const usedSlots = new Set(); const affectedBeasts = new Set(); let cursor = 0;
  const take = (amount) => {
    const picked = [];
    while (picked.length < amount && cursor < slots.length) {
      const index = slots[cursor++]; const card = cards[index];
      if (usedSlots.has(index) || affectedBeasts.has(card.id)) continue;
      usedSlots.add(index); affectedBeasts.add(card.id); picked.push(index);
    }
    return picked;
  };
  const mechanisms = {};
  if (template.fog) mechanisms.fog = { indexes: take(template.fog.indexes.length), unlock: template.fog.unlock };
  if (template.seal) mechanisms.seal = { indexes: take(template.seal.indexes.length) };
  if (template.teleport) mechanisms.teleport = { routes: template.teleport.routes.map(() => { const [source, ...swap] = take(3); return { source, swap }; }) };
  if (template.disguise) {
    const random = seededRandom(`${seed}:disguises`);
    mechanisms.disguise = { cards: take(template.disguise.cards.length).map((index) => {
      const choices = BEASTS.filter((beast) => beast.id !== cards[index].id);
      return { index, as: choices[Math.floor(random() * choices.length)].id };
    }) };
  }
  const expected = (template.fog?.indexes.length || 0) + (template.seal?.indexes.length || 0) + (template.teleport?.routes.length || 0) * 3 + (template.disguise?.cards.length || 0);
  const indexes = [ ...(mechanisms.fog?.indexes || []), ...(mechanisms.seal?.indexes || []), ...(mechanisms.teleport?.routes || []).flatMap((route) => [route.source, ...route.swap]), ...(mechanisms.disguise?.cards || []).map((card) => card.index) ];
  if (indexes.length !== expected || indexes.some((index) => !Number.isInteger(index) || !cards[index]) || new Set(indexes).size !== indexes.length || new Set(indexes.map((index) => cards[index].id)).size !== indexes.length) throw new Error("本局机关随机生成失败，请重新开始关卡。");
  return mechanisms;
}
function createGeneratedLevel(template, seed) {
  const slots = Array.from({ length: template.columns * template.rows }, (_, index) => index).filter((index) => !template.blockedIndexes?.includes(index));
  const positions = seededShuffle(slots, `${seed}:${template.id}:positions`); let cursor = 0; const take = (amount) => positions.slice(cursor, cursor += amount);
  const mechanisms = {};
  if (template.mechanisms.fog) mechanisms.fog = { indexes: take(template.mechanisms.fog), unlock: "adjacent-match" };
  if (template.mechanisms.seal) mechanisms.seal = { indexes: take(template.mechanisms.seal) };
  if (template.mechanisms.teleport) mechanisms.teleport = { routes: Array.from({ length: template.mechanisms.teleport }, () => { const [source, first, second] = take(3); return { source, swap: [first, second] }; }) };
  return validateGeneratedLevel({ id: `challenge-${template.id}-${seed}`, name: template.name, chapter: "本周挑战 · 极难", columns: template.columns, rows: template.rows, pairs: template.pairs, moves: template.moves, xp: template.xp, tools: template.tools, blockedIndexes: template.blockedIndexes || [], mechanisms, note: template.note, seed, generated: true });
}
function validateGeneratedLevel(level) {
  const slotCount = level.columns * level.rows; const blocked = new Set(level.blockedIndexes); const activeSlots = slotCount - blocked.size;
  if (activeSlots !== level.pairs * 2) throw new Error("挑战模板的有效格子数必须等于配对牌总数。");
  const mechanismSlots = [ ...(level.mechanisms.fog?.indexes || []), ...(level.mechanisms.seal?.indexes || []), ...(level.mechanisms.teleport?.routes || []).flatMap((route) => [route.source, ...route.swap]) ];
  if (mechanismSlots.some((index) => !Number.isInteger(index) || index < 0 || index >= slotCount || blocked.has(index))) throw new Error("挑战模板包含无效机关位置。");
  if (new Set(mechanismSlots).size !== mechanismSlots.length) throw new Error("挑战模板的机关位置不能重叠。");
  return level;
}
function currentChallenge() { const seed = weekSeed(); const template = CHALLENGE_TEMPLATES[hashSeed(seed) % CHALLENGE_TEMPLATES.length]; return createGeneratedLevel(template, seed); }

function renderProfile() {
  const level = playerLevel(); const xp = xpInLevel(); const completed = LEVELS.filter((item) => state.progress.completed[item.id]).length;
  el.homeLevel.textContent = `Lv. ${level}`; el.levelMini.textContent = `Lv. ${level}`; el.homeXpFill.style.width = `${xp}%`; el.homeXpText.textContent = `${xp} / 100 XP`;
  el.mainlineProgress.textContent = `${completed} / ${LEVELS.length} 已通关`;
  const upcoming = nextLevel(); el.currentStage.textContent = upcoming ? `第 ${upcoming.id} 关 · ${upcoming.name}` : "主线完成 · 进入本周挑战";
  const challenge = currentChallenge(); el.weeklyLabel.textContent = `${challenge.name} · ${challenge.seed}`;
  el.streakLine.textContent = completed === LEVELS.length ? "主线试炼已完成，每周挑战会产出新的可复盘迷阵。" : "教学关首次通关可获得一次经验。";
}

function renderLevels() {
  el.levelList.innerHTML = LEVELS.map((level) => {
    const complete = state.progress.completed[level.id]; const unlocked = level.id === 1 || Boolean(state.progress.completed[level.id - 1]);
    const summary = level.mechanisms?.fog ? "迷雾机关 · 相邻消除" : level.mechanisms?.seal ? "封印机关 · 二次翻开" : level.mechanisms?.teleport ? "传送机关 · 固定换位" : level.mechanisms?.disguise ? "伪装机关 · 二次显真" : `${level.pairs} 对灵兽 · ${level.moves} 步`;
    return `<button class="level-card ${complete ? "is-complete" : ""}" data-level="${level.id}" type="button" ${unlocked ? "" : "disabled"}><span class="level-number">${complete ? "✓" : level.id}</span><span><strong>${level.name}</strong><small>${summary}</small></span><span class="level-stars">${complete ? stars(complete.stars) : unlocked ? "进入 →" : "未解锁"}</span></button>`;
  }).join("") + `<button class="level-card challenge-card" data-challenge="weekly" type="button"><span class="level-number">☽</span><span><strong>本周挑战</strong><small>${currentChallenge().name} · 固定种子</small></span><span class="level-stars">进入 →</span></button>`;
}

function startLevel(levelOrId, options = {}) {
  const source = typeof levelOrId === "object" ? levelOrId : LEVELS.find((item) => item.id === levelOrId); const template = source?.template || source; if (!template) return;
  const runSeed = options.seed || (template.generated ? template.seed : createRunSeed(template));
  const selected = seededShuffle(BEASTS, `${runSeed}:beasts`).slice(0, template.pairs);
  const deck = selected.flatMap((beast) => [{ ...beast, uid: `${beast.id}-a`, matched: false }, { ...beast, uid: `${beast.id}-b`, matched: false }]);
  const cards = createBalancedCards(deck, template, runSeed);
  const level = { ...template, seed: runSeed, mechanisms: randomizeMechanisms(template.mechanisms, cards, runSeed), template };
  hideTutorial();
  state.level = level; state.open = []; state.matched = 0; state.moves = level.moves; state.mistakes = 0; state.toolsUsed = 0; state.locked = false;
  state.progress.lastRuns = { ...state.progress.lastRuns, [level.id]: { seed: runSeed, updatedAt: Date.now() } }; saveProgress();
  state.fogUnlocked = !level.mechanisms?.fog; state.tools = level.tools ? { ...level.tools } : { mirror: 1, tracker: 1, breaker: level.mechanisms?.fog ? 1 : 0 };
  state.cards = cards;
  level.mechanisms?.fog?.indexes.forEach((index) => { if (state.cards[index]) state.cards[index].fogged = true; });
  level.mechanisms?.seal?.indexes.forEach((index) => { if (state.cards[index]) state.cards[index].sealed = true; });
  level.mechanisms?.teleport?.routes.forEach((route) => {
    if (state.cards[route.source]) state.cards[route.source].teleportRoute = route;
    route.swap.forEach((index) => { if (state.cards[index]) state.cards[index].teleportTarget = true; });
  });
  level.mechanisms?.disguise?.cards.forEach((entry) => { if (state.cards[entry.index]) { state.cards[entry.index].disguiseId = entry.as; state.cards[entry.index].disguised = true; } });
  el.playChapter.textContent = level.generated ? `${level.chapter} · ${level.seed}` : `第 ${level.id} 关 · ${level.chapter}`; el.playName.textContent = level.name; el.objectiveText.textContent = `找出全部 ${level.pairs} 对灵兽`; el.mechanismNote.textContent = level.note;
  showScreen("playScreen"); renderBoard(); renderHud(); showTutorial(level);
}
function placeCards(deck, slotCount, blockedIndexes) { let cursor = 0; return Array.from({ length: slotCount }, (_, index) => blockedIndexes.includes(index) ? null : deck[cursor++]); }
function startWeeklyChallenge() { startLevel(currentChallenge()); }
function tutorialKeyFor(level) { if (level.generated) return null; if (level.id === 1) return "memory"; if (level.id === 6) return "fog"; if (level.id === 7) return "seal"; if (level.id === 10) return "teleport"; if (level.id === 13) return "disguise"; if (level.id === 16) return "combo"; return null; }
function showTutorial(level) {
  const key = tutorialKeyFor(level); const tutorial = key && TUTORIALS[key];
  if (!tutorial || state.progress.tutorials?.[key]) return false;
  state.locked = true; el.tutorialKicker.textContent = tutorial.kicker; el.tutorialTitle.textContent = tutorial.title; el.tutorialDescription.textContent = tutorial.description; el.tutorialDemo.innerHTML = tutorial.demo;
  el.tutorialModal.classList.add("is-visible"); el.tutorialModal.setAttribute("aria-hidden", "false"); return true;
}
function hideTutorial() { el.tutorialModal.classList.remove("is-visible"); el.tutorialModal.setAttribute("aria-hidden", "true"); }

function renderBoard() {
  el.gameBoard.style.setProperty("--columns", state.level.columns);
  el.gameBoard.classList.toggle("is-dense", state.level.columns >= 5);
  el.gameBoard.innerHTML = state.cards.map((card, index) => {
    if (!card) return `<span class="board-obstacle" aria-label="不可翻开的机关石位"></span>`;
    const open = state.open.includes(card.uid); const fogged = card.fogged && !state.fogUnlocked;
    const sealed = card.sealed && !card.sealSeen; const teleport = Boolean(card.teleportRoute && !card.teleportTriggered); const target = Boolean(card.teleportTarget); const disguised = card.disguised && !card.disguiseSeen; const display = (card.disguiseOpenedThisTurn || disguised) ? BEASTS.find((beast) => beast.id === card.disguiseId) || card : card;
    const art = display.asset ? `<img class="beast-art" src="${display.asset}" alt="" onerror="this.hidden=true">` : "";
    return `<button class="card ${open ? "is-face-up" : ""} ${card.matched ? "is-matched" : ""} ${fogged ? "is-fogged" : ""} ${sealed ? "is-sealed" : ""} ${teleport ? "is-teleport" : ""} ${target ? "is-teleport-target" : ""} ${disguised ? "is-disguised" : ""}" data-index="${index}" type="button" ${card.matched ? "disabled" : ""} aria-label="${open ? display.name : fogged ? "被迷雾封锁的灵兽牌" : sealed ? "被封印的灵兽牌" : teleport ? "传送阵眼" : target ? "传送目标牌" : disguised ? "伪装灵兽牌" : "未翻开灵兽牌"}"><span class="card-inner"><span class="card-face card-back"></span><span class="card-face card-front">${art}<span class="beast-icon ${display.asset ? "is-fallback" : ""}">${display.icon}</span><span class="beast-name">${display.name}</span></span></span></button>`;
  }).join("");
}

function renderHud() { el.movesValue.textContent = state.moves; el.mistakesValue.textContent = state.mistakes; el.pairProgress.textContent = `${state.matched} / ${state.level.pairs}`; setTool(el.mirrorTool, state.tools.mirror); setTool(el.trackerTool, state.tools.tracker); setTool(el.breakerTool, state.tools.breaker); }
function setTool(button, amount) { button.disabled = amount <= 0; button.querySelector("small").textContent = amount > 0 ? TOOL_LABELS[button.id.replace("Tool", "")] : "已用完"; }

el.gameBoard.addEventListener("click", (event) => { const cardEl = event.target.closest(".card"); if (cardEl) flipCard(Number(cardEl.dataset.index)); });

function flipCard(index) {
  const card = state.cards[index];
  if (state.locked || card.matched || state.open.includes(card.uid) || (card.fogged && !state.fogUnlocked) || state.open.length >= 2) return;
  if (card.sealed && !card.sealSeen) { card.sealSeen = true; card.sealOpenedThisTurn = true; el.mechanismNote.textContent = "封印已松动：这张牌需要再次翻开才能消除。"; }
  if (card.disguised && !card.disguiseSeen) { card.disguiseSeen = true; card.disguiseOpenedThisTurn = true; el.mechanismNote.textContent = "伪装显现：记住这个假象，下一次翻开才会露出真身。"; }
  state.open.push(card.uid); playSound("flip"); renderBoard();
  if (card.teleportRoute && !card.teleportTriggered) activateTeleport(card);
  if (state.open.length === 2) resolvePair();
}

function activateTeleport(source) {
  const route = source.teleportRoute; const [firstIndex, secondIndex] = route.swap;
  const first = state.cards[firstIndex]; const second = state.cards[secondIndex];
  source.teleportTriggered = true;
  if (!first || !second || first.matched || second.matched || state.open.includes(first.uid) || state.open.includes(second.uid)) {
    el.mechanismNote.textContent = "阵眼已亮起，但目标牌已离场，传送阵没有发生换位。"; renderBoard(); return;
  }
  first.teleportTarget = false; second.teleportTarget = false;
  [state.cards[firstIndex], state.cards[secondIndex]] = [state.cards[secondIndex], state.cards[firstIndex]];
  playSound("teleport"); el.mechanismNote.textContent = `传送阵启动：第 ${firstIndex + 1} 格与第 ${secondIndex + 1} 格已交换。`;
  renderBoard();
}

function isAdjacent(indexA, indexB) {
  const columns = state.level.columns; const rowA = Math.floor(indexA / columns); const rowB = Math.floor(indexB / columns);
  return Math.abs(rowA - rowB) + Math.abs((indexA % columns) - (indexB % columns)) === 1;
}

function resolvePair() {
  state.locked = true; state.moves -= 1;
  const [firstUid, secondUid] = state.open; const first = state.cards.find((card) => card?.uid === firstUid); const second = state.cards.find((card) => card?.uid === secondUid);
  const sealOpenedThisTurn = first.sealOpenedThisTurn || second.sealOpenedThisTurn; const disguiseOpenedThisTurn = first.disguiseOpenedThisTurn || second.disguiseOpenedThisTurn; const needsAnotherTurn = sealOpenedThisTurn || disguiseOpenedThisTurn;
  if (first.id === second.id && !needsAnotherTurn) {
    first.matched = true; second.matched = true; state.matched += 1; playSound("match");
    const positions = [state.cards.indexOf(first), state.cards.indexOf(second)];
    if (!state.fogUnlocked && isAdjacent(...positions)) { state.fogUnlocked = true; playSound("unlock"); el.mechanismNote.textContent = "相邻灵兽灵息相合，迷雾已解除。"; }
    else if (!state.fogUnlocked) { el.mechanismNote.textContent = "配对成功，但需消除一对相邻灵兽牌才能驱散迷雾。"; }
    window.setTimeout(() => { state.open = []; state.locked = false; renderBoard(); renderHud(); if (state.matched === state.level.pairs) finishLevel(); else if (state.moves <= 0) finishLevel(true); }, 420);
  } else {
    if (!needsAnotherTurn) { state.mistakes += 1; playSound("miss"); }
    if (sealOpenedThisTurn && first.id === second.id) el.mechanismNote.textContent = "图案相同，但封印牌需要在之后再次翻开才能消除。";
    if (disguiseOpenedThisTurn) el.mechanismNote.textContent = "伪装牌已被识破，下一次翻开才会显示真实灵兽。";
    window.setTimeout(() => { first.sealOpenedThisTurn = false; second.sealOpenedThisTurn = false; first.disguiseOpenedThisTurn = false; second.disguiseOpenedThisTurn = false; state.open = []; state.locked = false; renderBoard(); renderHud(); if (state.moves <= 0) finishLevel(true); }, 820);
  }
  renderHud();
}

function useMirror() {
  if (state.locked || !state.tools.mirror) return; state.tools.mirror = 0; state.toolsUsed += 1; state.locked = true; playSound("tool"); el.gameBoard.querySelectorAll(".card:not(.is-matched)").forEach((card) => card.classList.add("is-peek")); renderHud();
  window.setTimeout(() => { el.gameBoard.querySelectorAll(".card").forEach((card) => card.classList.remove("is-peek")); state.locked = false; }, 1500);
}
function useTracker() {
  if (state.locked || !state.tools.tracker) return;
  const unmatched = state.cards.filter(Boolean).filter((card) => !card.matched && !(card.fogged && !state.fogUnlocked)); const target = unmatched[Math.floor(Math.random() * unmatched.length)]; const partner = unmatched.find((card) => card.id === target.id && card.uid !== target.uid);
  if (!partner) return;
  state.tools.tracker = 0; state.toolsUsed += 1; playSound("tool"); const targetIndex = state.cards.indexOf(target); const partnerIndex = state.cards.indexOf(partner); const targetRow = Math.floor(targetIndex / state.level.columns); const partnerRow = Math.floor(partnerIndex / state.level.columns); const targetColumn = targetIndex % state.level.columns; const partnerColumn = partnerIndex % state.level.columns;
  el.mechanismNote.textContent = targetRow === partnerRow ? "寻踪香标记了一张牌：它的同伴藏在同一行。" : targetColumn === partnerColumn ? "寻踪香标记了一张牌：它的同伴藏在同一列。" : `寻踪香标记了一张牌：同伴位于第 ${partnerRow + 1} 行或第 ${partnerColumn + 1} 列。`;
  el.gameBoard.querySelector(`[data-index="${targetIndex}"]`).classList.add("is-hint"); renderHud();
  window.setTimeout(() => el.gameBoard.querySelectorAll(".is-hint").forEach((card) => card.classList.remove("is-hint")), 1500);
}
function useBreaker() { if (state.locked || !state.tools.breaker || state.fogUnlocked) return; state.tools.breaker = 0; state.toolsUsed += 1; state.fogUnlocked = true; playSound("unlock"); el.mechanismNote.textContent = "破禁符化开迷雾，封锁的灵兽牌可以翻开了。"; renderBoard(); renderHud(); }

function finishLevel(failed = false) {
  state.locked = true; playSound(failed ? "fail" : "win"); const level = state.level; const earned = failed || state.progress.completed[level.id] ? 0 : level.xp; const highEfficiency = state.moves >= Math.ceil(level.moves * .48) && state.mistakes <= Math.floor(level.pairs * .4) && state.toolsUsed === 0; const steadyClear = state.moves >= Math.ceil(level.moves * .2) && state.mistakes <= level.pairs; const starCount = failed ? 0 : highEfficiency ? 3 : steadyClear ? 2 : 1;
  const run = { stars: starCount, moves: Math.max(state.moves, 0), mistakes: state.mistakes, toolsUsed: state.toolsUsed }; const prior = state.progress.completed[level.id]; const priorBest = prior?.best || (prior ? { stars: prior.stars, moves: -1, mistakes: Infinity, toolsUsed: Infinity } : null); const improved = !priorBest || isBetterRun(run, priorBest);
  if (!failed) { state.progress.completed[level.id] = { ...prior, stars: Math.max(prior?.stars || 0, starCount), best: improved ? run : prior?.best || run }; if (earned) state.progress.xp += earned; saveProgress(); }
  const best = state.progress.completed[level.id]?.best;
  el.resultKicker.textContent = failed ? "步数耗尽" : "寻踪完成"; el.resultTitle.textContent = failed ? "灵息暂时消散" : "灵兽已归位"; el.resultDescription.textContent = failed ? "调整记忆路线后，再来一次试炼。" : `你在山门深处寻回了全部 ${level.pairs} 对灵兽。`; el.resultMoves.textContent = run.moves; el.resultMistakes.textContent = run.mistakes; el.resultTools.textContent = run.toolsUsed; el.resultStars.textContent = failed ? "☆☆☆" : stars(starCount); el.xpGain.textContent = earned ? `首次通关经验 +${earned}` : failed ? "本次未获得经验" : "教学关经验已领取";
  const weeklyRecord = level.generated && best ? `${improved && !failed ? "本周最佳已刷新" : `本周最佳：${stars(best.stars)} · ${best.moves} 步 · ${best.mistakes} 错误`} · ` : "";
  el.resultRecord.hidden = false; el.resultRecord.textContent = `${weeklyRecord}本局种子：${level.seed}`;
  el.replayButton.textContent = level.generated ? "重试本周" : "再来一局"; el.reviewButton.hidden = level.generated;
  document.querySelector("#nextButton").textContent = level.generated ? "再试本周 →" : level.id === LEVELS.length ? "本周挑战 →" : "下一关 →"; el.resultModal.classList.add("is-visible"); el.resultModal.setAttribute("aria-hidden", "false"); renderProfile();
}
function isBetterRun(current, best) { if (!best || current.stars !== best.stars) return current.stars > (best?.stars || 0); if (current.moves !== best.moves) return current.moves > best.moves; if (current.mistakes !== best.mistakes) return current.mistakes < best.mistakes; return current.toolsUsed < (best.toolsUsed || 0); }
function stars(amount) { return "★".repeat(amount) + "☆".repeat(3 - amount); }
function shuffle(items) { const clone = [...items]; for (let i = clone.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [clone[i], clone[j]] = [clone[j], clone[i]]; } return clone; }

document.querySelector("#continueButton").addEventListener("click", () => { const next = nextLevel(); if (next) startLevel(next); else startWeeklyChallenge(); });
document.querySelector("#mainlineButton").addEventListener("click", () => { renderLevels(); showScreen("levelScreen"); });
document.querySelector("#weeklyButton").addEventListener("click", startWeeklyChallenge);
document.querySelector("#levelBackButton").addEventListener("click", () => { renderProfile(); showScreen("homeScreen"); });
document.querySelector("#playBackButton").addEventListener("click", () => { hideTutorial(); state.locked = false; renderLevels(); showScreen("levelScreen"); });
el.levelList.addEventListener("click", (event) => { const button = event.target.closest("[data-level], [data-challenge]"); if (!button || button.disabled) return; if (button.dataset.challenge) startWeeklyChallenge(); else startLevel(Number(button.dataset.level)); });
el.replayButton.addEventListener("click", () => { el.resultModal.classList.remove("is-visible"); startLevel(state.level.template); });
el.reviewButton.addEventListener("click", () => { el.resultModal.classList.remove("is-visible"); startLevel(state.level.template, { seed: state.level.seed }); });
document.querySelector("#nextButton").addEventListener("click", () => { el.resultModal.classList.remove("is-visible"); if (state.level.generated || state.level.id === LEVELS.length) startWeeklyChallenge(); else { const next = LEVELS.find((level) => level.id === state.level.id + 1); if (next) startLevel(next); else startWeeklyChallenge(); } });
el.tutorialStartButton.addEventListener("click", () => { const key = tutorialKeyFor(state.level); if (key) { state.progress.tutorials = { ...state.progress.tutorials, [key]: true }; saveProgress(); } hideTutorial(); state.locked = false; });
el.mirrorTool.addEventListener("click", useMirror); el.trackerTool.addEventListener("click", useTracker); el.breakerTool.addEventListener("click", useBreaker);
el.soundToggle.addEventListener("click", toggleSound); el.playSoundToggle.addEventListener("click", toggleSound);
document.querySelector("#resetButton").addEventListener("click", () => { if (!window.confirm("确定重置等级与教学关进度吗？")) return; state.progress = { xp: 0, completed: {}, tutorials: {}, soundEnabled: state.progress.soundEnabled, lastRuns: {} }; saveProgress(); renderProfile(); renderSoundButtons(); });
renderProfile(); renderSoundButtons();
