const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicText = document.getElementById('musicText');
const quoteText = document.getElementById('quoteText');
const mainTulipStage = document.getElementById('mainTulipStage');

let isPlaying = false;

// 1. Аялгуу асаах / унтраах
musicToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPlaying) {
    bgMusic.pause();
    musicText.textContent = 'Аялгуу зогссон';
  } else {
    bgMusic.play().catch(err => console.log(err));
    musicText.textContent = 'Аялгуу эгшиглэж байна';
  }
  isPlaying = !isPlaying;
});

// 2. Романтик үгсийн цуглуулга
const romanticQuotes = [
  "Чамтай өнгөрүүлсэн хором бүр миний хувьд эрдэнэ 💎",
  "Чи бол миний амьдралын хамгийн гоё бэлэг 🎁💙",
  "Миний нандин хайр 🌷✨",
  "Үргэлж инээмсэглэж яваарай 🌸",
  "Зөндөө их хайртай шүү! ❤️",
  "Миний л найз охин🙆🏼‍♀️",
  "Чамтай байхад яг л үлгэрт гардаг хайрыг мэдэрдэг 😍🌟",
  "Үүрд,үргэлж,хамтдаа",
  "Хоолоо идсэн үү? 😋💖",
  "Өлсөж байна уу? Миний хайраар хооллоорой 🍲💙",
  "Чи бол миний амьдралын хамгийн том аз жаргал 🌈💞",
  "Сайхан мөөмтэй охин шүү 😘🍑",
  "Чиний нүд бол миний ертөнцийг харах цонх 🪟💖",
  "Чиний уруул бол миний хамгийн дуртай амт 😋💋",
  "Ёстой л миний зүрхний эзэн 💓",
  "Амьдралынхаа хамгийн сайхан дурсамжийг чамтай хамт бүтээж байна 🥰",
  "Би чамд хайртай гэдгээ өдөр бүр сануулж байхыг хүсэж байна 💌",
  "Валентины өдөр ч, бусад өдөр ч би чамд хайртай 💘",
  "Гэртээ ирэхэд чамайг тэвэрч авахыг хүсэж байна 🤗💖",
  "Дэлхий дээрх хамгийн сайхан охин бол чи 💕",
  "Ер нь чамайг бодохоор л миний зүрх зогсохоо мэдэхгүй цохилох юм😄💙"
];

// Төв цэцэг дээр дарахад доод талын үг өөрчлөгдөх & цэцэг цацрах
mainTulipStage.addEventListener('click', (e) => {
  e.stopPropagation();
  const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
  quoteText.textContent = randomQuote;
  
  createBurst(e.clientX, e.clientY);
});

// 3. Дэлгэцийн хаана ч дархад цэнхэр алтанзул цэцэг + үг гарч ирэх логик
document.body.addEventListener('click', (e) => {
  if (e.target.closest('#musicToggle') || e.target.closest('#letterBtn') || e.target.closest('.modal-card')) {
    return;
  }

  const x = e.clientX;
  const y = e.clientY;

  createFloatingItem(x, y);
});

function createFloatingItem(x, y) {
  const item = document.createElement('div');
  item.classList.add('floating-element');

  const randomText = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];

  // Эможи биш, жинхэнэ векторын цэнхэр алтанзул цэцэг + текст
  item.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 6px #3b82f6);">
      <path d="M32 30 C32 45 30 58 30 62" stroke="#4adb8f" stroke-width="4" stroke-linecap="round"/>
      <path d="M20 22 C12 12 24 6 32 18 C26 26 22 28 20 22 Z" fill="#2563eb"/>
      <path d="M44 22 C52 12 40 6 32 18 C38 26 42 28 44 22 Z" fill="#1d4ed8"/>
      <path d="M22 24 C28 36 36 36 42 24 C46 14 38 8 32 12 C26 8 18 14 22 24 Z" fill="#3b82f6"/>
    </svg>
    <span>${randomText}</span>
  `;

  item.style.left = `${x - 70}px`;
  item.style.top = `${y - 20}px`;

  document.body.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 3200);
}

function createBurst(x, y) {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 140;
      const offsetY = (Math.random() - 0.5) * 140;
      createFloatingItem(x + offsetX, y + offsetY);
    }, i * 90);
  }
}

// 4. Захидал нээх / хаах цонхны үйлдэл
const letterBtn = document.getElementById('letterBtn');
const letterModal = document.getElementById('letterModal');
const closeModalBtn = document.getElementById('closeModalBtn');

if (letterBtn && letterModal && closeModalBtn) {
  letterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    letterModal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    letterModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === letterModal) {
      letterModal.style.display = 'none';
    }
  });
}
// Автоматаар цас хаялуулах код
function createSnowflakes() {
  const snowContainer = document.querySelector('.snow-container');
  if (!snowContainer) return;

  const snowflakeCount = 45; // Цасны ширхгийн тоо

  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Цасны хэмжээ, байрлал, хурдыг санамсаргүйгээр сонгох
    const size = Math.random() * 4 + 2; // 2px - 6px хүртэлх хэмжээтэй
    const left = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 3; // 3 сек - 8 сек хүртэл унах хурд
    const delay = Math.random() * 5; // Ялгаатай хугацаанд эхлэх

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}px`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;

    snowContainer.appendChild(snowflake);
  }
}

// Хуудас ачаалагдахад цасыг ажиллуулах
window.addEventListener('load', createSnowflakes);