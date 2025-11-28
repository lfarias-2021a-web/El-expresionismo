const defaultConfig = {
  main_title: "Un Viaje Por El Expresionismo",
  subtitle: "Adentrándote en las sombras del alma humana, donde el arte se convierte en un grito visceral contra la realidad. Descubre el movimiento que cambió para siempre la forma de ver, sentir y crear.",
  music_title: "Música Expresionista",
  dance_title: "Danza Expresionista",
  cinema_title: "Cine Expresionista",
  theater_title: "Teatro Expresionista",
  painting_title: "Pintura Expresionista",
  games_title: "Juegos Interactivos",
  background_color: "#000000",
  surface_color: "#0a0a0a",
  text_color: "#e0e0e0",
  primary_action_color: "#660000",
  accent_color: "#cc0000",
  font_family: "Cinzel",
  font_size: 16
};

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  event.target.classList.add('active');
}

function openLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('Abriendo enlace...');
}

// === Puzzle ===
let puzzleState = [], emptyIndex = 8;
const puzzleGrid = document.getElementById('puzzleGrid');
const puzzleWin = document.getElementById('puzzleWin');

function initPuzzle() {
  puzzleState = [1,2,3,4,5,6,7,8,0];
  emptyIndex = 8;
  shufflePuzzle();
  renderPuzzle();
}

function shufflePuzzle() {
  for (let i = 0; i < 100; i++) {
    const moves = getValidMoves();
    const rand = Math.floor(Math.random() * moves.length);
    swap(emptyIndex, moves[rand]);
  }
}

function getValidMoves() {
  const row = Math.floor(emptyIndex / 3), col = emptyIndex % 3;
  const moves = [];
  if (row > 0) moves.push(emptyIndex - 3);
  if (row < 2) moves.push(emptyIndex + 3);
  if (col > 0) moves.push(emptyIndex - 1);
  if (col < 2) moves.push(emptyIndex + 1);
  return moves;
}

function swap(i1, i2) {
  [puzzleState[i1], puzzleState[i2]] = [puzzleState[i2], puzzleState[i1]];
  emptyIndex = puzzleState.indexOf(0);
}

function renderPuzzle() {
  puzzleGrid.innerHTML = '';
  puzzleState.forEach((num, i) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    if (num === 0) {
      piece.classList.add('empty');
    } else {
      piece.textContent = num;
      piece.onclick = () => movePiece(i);
    }
    puzzleGrid.appendChild(piece);
  });
}

function movePiece(i) {
  const moves = getValidMoves();
  if (moves.includes(i)) {
    swap(i, emptyIndex);
    renderPuzzle();
    checkWin();
  }
}

function checkWin() {
  if (puzzleState.every((val, i) => val === (i === 8 ? 0 : i + 1))) {
    puzzleWin.style.display = 'block';
    showToast('¡Ganaste el rompecabezas!');
  }
}

function resetPuzzle() {
  puzzleWin.style.display = 'none';
  initPuzzle();
  showToast('Puzzle reiniciado');
}

// === Quiz ===
const quizQuestions = [
  { q: "¿Quién fundó Die Brücke?", a: ["Ernst Ludwig Kirchner", "Wassily Kandinsky", "Edvard Munch"], c: 0 },
  { q: "¿En qué año se estrenó 'El Gabinete del Dr. Caligari'?", a: ["1918", "1920", "1922"], c: 1 },
  { q: "¿Qué compositor desarrolló la técnica dodecafónica?", a: ["Alban Berg", "Arnold Schönberg", "Anton Webern"], c: 1 },
  { q: "¿Cuál es el título de la ópera expresionista de Alban Berg?", a: ["Pierrot Lunaire", "Wozzeck", "Lulu"], c: 1 },
  { q: "¿Qué película de Fritz Lang es una distopía futurista?", a: ["Nosferatu", "Metrópolis", "M"], c: 1 },
  { q: "¿Qué grupo lideró Wassily Kandinsky?", a: ["Die Brücke", "Der Blaue Reiter", "Bauhaus"], c: 1 },
  { q: "¿Quién es considerada la madre de la danza expresionista?", a: ["Mary Wigman", "Pina Bausch", "Isadora Duncan"], c: 0 },
  { q: "¿Qué técnica usó Schönberg en 'Pierrot Lunaire'?", a: ["Sprechgesang", "Dodecafonía", "Atonalidad"], c: 0 },
  { q: "¿En qué año terminó el expresionismo por el nazismo?", a: ["1929", "1933", "1945"], c: 1 },
  { q: "¿Qué obra de Kurt Jooss es antibélica?", a: ["La Mesa Verde", "El Lago de los Cisnes", "Giselle"], c: 0 }
];

let currentQuestion = 0, score = 0;
const quizContainer = document.getElementById('quizContainer');

function initQuiz() {
  currentQuestion = 0; score = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  quizContainer.innerHTML = `
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.a.map((ans, i) => `
        <div class="quiz-option" onclick="selectAnswer(${i})">${ans}</div>
      `).join('')}
    </div>
    <div id="feedback" class="quiz-feedback" style="display:none;"></div>
  `;
}

function selectAnswer(selected) {
  const q = quizQuestions[currentQuestion];
  const feedback = document.getElementById('feedback');
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.onclick = null;
    if (i === q.c) opt.classList.add('correct');
    if (i === selected && i !== q.c) opt.classList.add('incorrect');
  });
  feedback.style.display = 'block';
  feedback.className = 'quiz-feedback ' + (selected === q.c ? 'correct' : 'incorrect');
  feedback.textContent = selected === q.c ? '¡Correcto!' : `Incorrecto. Respuesta: ${q.a[q.c]}`;
  if (selected === q.c) score++;
  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    renderQuestion();
    document.getElementById('nextBtn').style.display = 'none';
  } else {
    quizContainer.innerHTML = `<div style="text-align:center; color:#cc0000; font-size:1.5em;">¡Fin del quiz! Puntuación: ${score}/${quizQuestions.length}</div>`;
    document.getElementById('restartBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'none';
  }
}

function restartQuiz() {
  initQuiz();
  document.getElementById('restartBtn').style.display = 'none';
}

// === Memoria ===
const memorySymbols = ['[Skull]', '[Dagger]', '[Eye]', '[Heart]', '[Moon]', '[Star]', '[Cross]', '[Flame]'];
let memoryCards = [], flipped = [], lock = false, moves = 0, matches = 0;
const memoryGrid = document.getElementById('memoryGrid');

function initMemoryGame() {
  memoryCards = [...memorySymbols, ...memorySymbols];
  shuffleArray(memoryCards);
  flipped = []; lock = false; moves = 0; matches = 0;
  updateStats();
  renderMemory();
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderMemory() {
  memoryGrid.innerHTML = '';
  memoryCards.forEach((sym, i) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = i;
    card.onclick = () => flipMemoryCard(i);
    card.innerHTML = `
      <div class="card-back">?</div>
      <div class="card-front" style="display: none;">${sym}</div>
    `;
    memoryGrid.appendChild(card);
  });
}

function flipMemoryCard(i) {
  if (lock || flipped.length === 2) return;
  const card = memoryGrid.children[i];
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  card.querySelector('.card-front').style.display = 'flex';
  card.querySelector('.card-back').style.display = 'none';
  flipped.push(i);
  if (flipped.length === 2) {
    moves++;
    updateStats();
    lock = true;
    setTimeout(checkMemoryMatch, 1000);
  }
}

function checkMemoryMatch() {
  const [i1, i2] = flipped;
  const c1 = memoryGrid.children[i1], c2 = memoryGrid.children[i2];
  if (memoryCards[i1] === memoryCards[i2]) {
    c1.classList.add('matched'); c2.classList.add('matched');
    matches++;
    updateStats();
    if (matches === 8) showToast('¡Ganaste el juego de memoria!');
  } else {
    c1.classList.remove('flipped'); c2.classList.remove('flipped');
    c1.querySelector('.card-front').style.display = 'none';
    c2.querySelector('.card-front').style.display = 'none';
    c1.querySelector('.card-back').style.display = 'flex';
    c2.querySelector('.card-back').style.display = 'flex';
  }
  flipped = []; lock = false;
}

function updateStats() {
  document.getElementById('moves').textContent = moves;
  document.getElementById('matches').textContent = matches;
}

function resetMemoryGame() {
  initMemoryGame();
  showToast('Juego de memoria reiniciado');
}

// === Toast ===
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// === Galería de Imágenes Reales ===
const imageFolders = {
  'angustia existencial': 'imagenes/angustia existencial/',
  'formas angulares': 'imagenes/formas angulares/',
  'sombras del alma': 'imagenes/sombras del alma/'
};

const imageNames = {
  'angustia existencial': Array.from({length: 9}, (_, i) => `${i+1}.jpg`),
  'formas angulares': Array.from({length: 12}, (_, i) => `${i+1}.jpg`),
  'sombras del alma': Array.from({length: 9}, (_, i) => `${i+1}.jpg`)
};

function loadRealImages(folderKey, clickedItem) {
  const container = document.getElementById('realImageContainer');
  const folder = imageFolders[folderKey];
  const names = imageNames[folderKey];

  if (!folder || !names || names.length === 0) {
    container.innerHTML = '<p style="color: #cc0000; text-align: center;">Carpeta no encontrada o sin imágenes.</p>';
    return;
  }

  container.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = `Galería: ${clickedItem.querySelector('.gallery-caption').textContent}`;
  title.style.cssText = 'color: #cc0000; margin: 30px 0 20px; font-family: Cinzel, serif; text-align: center; font-size: 2em;';
  container.appendChild(title);

  const gallery = document.createElement("div");
  gallery.className = 'real-image-gallery';

  names.forEach(name => {
    const item = document.createElement('div');
    item.className = 'real-image-item';

    const img = document.createElement('img');
    img.src = `${folder}${name}`;
    img.alt = name;
    img.loading = 'lazy';
    img.style.cssText = 'width:100%; height:200px; object-fit:cover; border-radius:6px;';

    img.onerror = () => {
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzAwMDAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2ZmNjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBub3RlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
      img.alt = 'No encontrada';
    };

    const caption = document.createElement('div');
    caption.className = 'real-image-caption';
    caption.textContent = name.replace('.jpg', '');

    item.appendChild(img);
    item.appendChild(caption);
    gallery.appendChild(item);
  });

  container.appendChild(gallery);
  container.scrollIntoView({ behavior: 'smooth' });
  showToast(`Mostrando ${names.length} imágenes de ${folderKey}`);
}

// === Inicialización ===
window.onload = () => {
  initPuzzle();
  initQuiz();
  initMemoryGame();
};