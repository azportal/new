import { db, collection, getDocs, query, orderBy } from './firebase-config.js';

// 80+ Bölmə
const categories = [
  // OYUNLAR (9)
  { id: 1, name: "Oyun Yüklə", icon: "🎮", desc: "Ən yeni oyunları yükləyin", category: "games", apiType: "games" },
  { id: 2, name: "PC Oyunlar", icon: "💻", desc: "Komputer oyunları", category: "games", apiType: "games" },
  { id: 3, name: "Mobil Oyunlar", icon: "📱", desc: "Android oyunları", category: "games", apiType: "playstore" },
  { id: 4, name: "Konsol Oyunlar", icon: "🕹️", desc: "PlayStation, Xbox", category: "games", apiType: "games" },
  { id: 5, name: "Retro Oyunlar", icon: "👾", desc: "Klassik oyunlar", category: "games", apiType: "games" },
  { id: 6, name: "Online Oyunlar", icon: "🌐", desc: "Çoxlu oyunçu oyunları", category: "games", apiType: "games" },
  { id: 7, name: "Oyun Modları", icon: "⚙️", desc: "Oyun modifikasiyaları", category: "games", apiType: "games" },
  { id: 8, name: "Oyun Treylerləri", icon: "🎬", desc: "Oyun videoları", category: "games", apiType: "youtube" },
  { id: 9, name: "Oyun Xəbərləri", icon: "📰", desc: "Oyun haqqında xəbərlər", category: "games", apiType: "news" },

  // TEXNOLOGİYA (9)
  { id: 10, name: "Texnologiya Xəbərləri", icon: "📡", desc: "Texnologiya xəbərləri", category: "tech", apiType: "news" },
  { id: 11, name: "Smartfonlar", icon: "📲", desc: "Telefon modellləri", category: "tech", apiType: "news" },
  { id: 12, name: "Planşetlər", icon: "📱", desc: "Tablet cihazları", category: "tech", apiType: "news" },
  { id: 13, name: "Noutbuklar", icon: "💻", desc: "Laptop kompüterləri", category: "tech", apiType: "news" },
  { id: 14, name: "Komputer Hissələri", icon: "🔧", desc: "PC komponentləri", category: "tech", apiType: "news" },
  { id: 15, name: "Prosessorlar", icon: "⚡", desc: "CPU prosessorları", category: "tech", apiType: "news" },
  { id: 16, name: "Video Kartlar", icon: "🎨", desc: "GPU kartları", category: "tech", apiType: "news" },
  { id: 17, name: "Monitorlar", icon: "🖥️", desc: "Ekran monitorları", category: "tech", apiType: "news" },
  { id: 18, name: "Gaming Aksesuarları", icon: "🎧", desc: "Oyun aksesuarları", category: "tech", apiType: "news" },

  // PROQRAMLAŞDIRMA (9)
  { id: 19, name: "Web Proqramlaşdırma", icon: "🌐", desc: "Web development", category: "programming", apiType: "github" },
  { id: 20, name: "Mobil Proqramlaşdırma", icon: "📱", desc: "Mobil app development", category: "programming", apiType: "github" },
  { id: 21, name: "Python", icon: "🐍", desc: "Python proqramlaşdırması", category: "programming", apiType: "github" },
  { id: 22, name: "JavaScript", icon: "⚙️", desc: "JavaScript kodlaması", category: "programming", apiType: "github" },
  { id: 23, name: "PHP", icon: "🔵", desc: "PHP backend", category: "programming", apiType: "github" },
  { id: 24, name: "Java", icon: "☕", desc: "Java proqramlaşdırması", category: "programming", apiType: "github" },
  { id: 25, name: "C++", icon: "📝", desc: "C++ kodlaması", category: "programming", apiType: "github" },
  { id: 26, name: "API İnkişafı", icon: "🔌", desc: "API development", category: "programming", apiType: "github" },
  { id: 27, name: "Open Source", icon: "🔓", desc: "Açıq mənbə layihələri", category: "programming", apiType: "github" },

  // SÜNİ İNTELLEKT (6)
  { id: 28, name: "AI Alətləri", icon: "🤖", desc: "Süni intellekt alətləri", category: "ai", apiType: "news" },
  { id: 29, name: "Machine Learning", icon: "🧠", desc: "Maşın öyrənməsi", category: "ai", apiType: "github" },
  { id: 30, name: "Deep Learning", icon: "🔬", desc: "Dərin öyrənmə", category: "ai", apiType: "github" },
  { id: 31, name: "AI Xəbərləri", icon: "📰", desc: "AI haqqında xəbərlər", category: "ai", apiType: "news" },
  { id: 32, name: "AI Proqramları", icon: "💾", desc: "AI proqramları", category: "ai", apiType: "github" },
  { id: 33, name: "AI Botlar", icon: "🤖", desc: "Chatbot və botlar", category: "ai", apiType: "github" },

  // SOSİAL ŞƏBƏKƏLƏR (7)
  { id: 34, name: "Instagram", icon: "📸", desc: "Instagram trikləri", category: "social", apiType: "news" },
  { id: 35, name: "TikTok", icon: "🎵", desc: "TikTok videoları", category: "social", apiType: "youtube" },
  { id: 36, name: "YouTube", icon: "📺", desc: "YouTube kanalları", category: "social", apiType: "youtube" },
  { id: 37, name: "Facebook", icon: "👥", desc: "Facebook məlumatları", category: "social", apiType: "news" },
  { id: 38, name: "Telegram", icon: "✈️", desc: "Telegram botları", category: "social", apiType: "news" },
  { id: 39, name: "WhatsApp", icon: "💬", desc: "WhatsApp trikləri", category: "social", apiType: "news" },
  { id: 40, name: "Sosial Media Trikləri", icon: "⭐", desc: "Sosial media ipuçları", category: "social", apiType: "news" },

  // BİZNES (9)
  { id: 41, name: "Sahibkarlıq", icon: "💼", desc: "Biznes məlumatları", category: "business", apiType: "news" },
  { id: 42, name: "Startaplar", icon: "🚀", desc: "Startup layihələri", category: "business", apiType: "news" },
  { id: 43, name: "Marketinq", icon: "📊", desc: "Marketinq strategiyaları", category: "business", apiType: "news" },
  { id: 44, name: "Digital Marketinq", icon: "💻", desc: "Rəqəmsal marketinq", category: "business", apiType: "news" },
  { id: 45, name: "SMM", icon: "📱", desc: "Sosial media marketinq", category: "business", apiType: "news" },
  { id: 46, name: "Freelance", icon: "💰", desc: "Freelance işləri", category: "business", apiType: "news" },
  { id: 47, name: "Online Pul Qazanmaq", icon: "💵", desc: "Pul qazanma yolları", category: "business", apiType: "news" },
  { id: 48, name: "E-commerce", icon: "🛒", desc: "Elektron ticarət", category: "business", apiType: "news" },
  { id: 49, name: "Dropshipping", icon: "📦", desc: "Dropshipping biznes", category: "business", apiType: "news" },

  // KRİPTO (7)
  { id: 50, name: "Kriptovalyuta Xəbərləri", icon: "📈", desc: "Kripto xəbərləri", category: "crypto", apiType: "news" },
  { id: 51, name: "Bitcoin", icon: "₿", desc: "Bitcoin məlumatları", category: "crypto", apiType: "crypto" },
  { id: 52, name: "Altcoinlər", icon: "💎", desc: "Digər kriptolar", category: "crypto", apiType: "crypto" },
  { id: 53, name: "Blockchain", icon: "⛓️", desc: "Blockchain texnologiyası", category: "crypto", apiType: "news" },
  { id: 54, name: "NFT", icon: "🎨", desc: "NFT və dijital sənət", category: "crypto", apiType: "news" },
  { id: 55, name: "Web3", icon: "🌐", desc: "Web3 texnologiyası", category: "crypto", apiType: "news" },
  { id: 56, name: "Kripto Analiz", icon: "📊", desc: "Kripto analizi", category: "crypto", apiType: "news" },

  // TƏHSİL (6)
  { id: 57, name: "Online Kurslar", icon: "📚", desc: "Onlayn kurslar", category: "education", apiType: "news" },
  { id: 58, name: "Universitetlər", icon: "🎓", desc: "Universitetlər", category: "education", apiType: "news" },
  { id: 59, name: "Tələbə Həyatı", icon: "👨‍🎓", desc: "Tələbə məlumatları", category: "education", apiType: "news" },
  { id: 60, name: "Dərs Materialları", icon: "📖", desc: "Dərs materialları", category: "education", apiType: "news" },
  { id: 61, name: "İmtahan Hazırlığı", icon: "✏️", desc: "İmtahan hazırlığı", category: "education", apiType: "news" },
  { id: 62, name: "Dil Öyrənmə", icon: "🗣️", desc: "Dil öyrənmə", category: "education", apiType: "news" },

  // ELM (6)
  { id: 63, name: "Riyaziyyat", icon: "🔢", desc: "Riyaziyyat dərsi", category: "science", apiType: "news" },
  { id: 64, name: "Fizika", icon: "⚛️", desc: "Fizika elmləri", category: "science", apiType: "news" },
  { id: 65, name: "Kimya", icon: "🧪", desc: "Kimya elmləri", category: "science", apiType: "news" },
  { id: 66, name: "Biologiya", icon: "🧬", desc: "Biologiya elmləri", category: "science", apiType: "news" },
  { id: 67, name: "Astronomiya", icon: "🌌", desc: "Astronomiya", category: "science", apiType: "news" },
  { id: 68, name: "Kosmos", icon: "🚀", desc: "Kosmos araşdırması", category: "science", apiType: "news" },

  // SAĞLAMLIQ (6)
  { id: 69, name: "Tibbi Məlumatlar", icon: "⚕️", desc: "Sağlıq məlumatları", category: "health", apiType: "news" },
  { id: 70, name: "Fitness", icon: "💪", desc: "Fitness məşqləri", category: "health", apiType: "youtube" },
  { id: 71, name: "Bodybuilding", icon: "🏋️", desc: "Bodybuilding", category: "health", apiType: "youtube" },
  { id: 72, name: "Dieta və Qidalanma", icon: "🥗", desc: "Dieta planları", category: "health", apiType: "news" },
  { id: 73, name: "Meditasiya", icon: "🧘", desc: "Meditasiya", category: "health", apiType: "youtube" },
  { id: 74, name: "Yoga", icon: "🧘‍♀️", desc: "Yoga məşqləri", category: "health", apiType: "youtube" },

  // İDMAN (5)
  { id: 75, name: "Futbol", icon: "⚽", desc: "Futbol xəbərləri", category: "sports", apiType: "news" },
  { id: 76, name: "Basketbol", icon: "🏀", desc: "Basketbol", category: "sports", apiType: "news" },
  { id: 77, name: "UFC / MMA", icon: "🥊", desc: "UFC döyüşləri", category: "sports", apiType: "news" },
  { id: 78, name: "E-sport", icon: "🎮", desc: "E-sport turnirləri", category: "sports", apiType: "youtube" },
  { id: 79, name: "İdman Xəbərləri", icon: "📰", desc: "İdman xəbərləri", category: "sports", apiType: "news" },

  // ƏYLƏNCƏ (5)
  { id: 80, name: "Memlər", icon: "😂", desc: "Komik memlər", category: "entertainment", apiType: "youtube" }
];

// Saytı yükle
document.addEventListener('DOMContentLoaded', () => {
  loadCategoriesFromFirebase();
  setupMobileMenu();
  loadTrendingData();
  loadAds();
});

// Firebase-dən bölmələri yüklə
async function loadCategoriesFromFirebase() {
  try {
    const snapshot = await getDocs(collection(db, 'categories'));
    if (snapshot.docs.length > 0) {
      const firebaseCategories = snapshot.docs.map(doc => doc.data());
      categories.push(...firebaseCategories);
    }
    displayCategories();
  } catch (error) {
    console.log('Firebase-dən yüklənə bilmədi, lokal məlumatlar istifadə olunur');
    displayCategories();
  }
}

// Bölmələri göstər
function displayCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  
  grid.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="openCategory(${cat.id})">
      <div style="font-size: 2rem; margin-bottom: 10px;">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.desc}</p>
    </div>
  `).join('');
}

// Bölməni aç
function openCategory(id) {
  window.location.href = `category.html?id=${id}`;
}

// Bölmə filtrə
function filterCategory(filter) {
  const grid = document.getElementById('categories-grid');
  const buttons = document.querySelectorAll('.cat-tab');
  
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  if (filter === 'all') {
    displayCategories();
  } else {
    const filtered = categories.filter(cat => cat.category === filter);
    grid.innerHTML = filtered.map(cat => `
      <div class="category-card" onclick="openCategory(${cat.id})">
        <div style="font-size: 2rem; margin-bottom: 10px;">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.desc}</p>
      </div>
    `).join('');
  }
}

// Global axtarış
function globalSearch() {
  const search = document.getElementById('global-search').value.toLowerCase();
  const grid = document.getElementById('categories-grid');
  
  const filtered = categories.filter(cat => 
    cat.name.toLowerCase().includes(search) || 
    cat.desc.toLowerCase().includes(search)
  );
  
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Nəticə tapılmadı</p>';
    return;
  }
  
  grid.innerHTML = filtered.map(cat => `
    <div class="category-card" onclick="openCategory(${cat.id})">
      <div style="font-size: 2rem; margin-bottom: 10px;">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.desc}</p>
    </div>
  `).join('');
}

// Trend məlumatları yüklə
async function loadTrendingData() {
  const trendingContainer = document.getElementById('trending-content');
  if (!trendingContainer) return;
  
  trendingContainer.innerHTML = '<p>Yüklənir...</p>';
  
  try {
    const cryptoData = await callAPI('crypto', '');
    const newsData = await callAPI('news', 'trending');
    
    const combined = [...(cryptoData || []).slice(0, 5), ...(newsData || []).slice(0, 5)];
    
    trendingContainer.innerHTML = combined.map(item => `
      <div class="trending-card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Daha çox</a>
      </div>
    `).join('');
  } catch (error) {
    console.error('Trend məlumatları yüklənərkən xəta:', error);
    trendingContainer.innerHTML = '<p>Xəta baş verdi</p>';
  }
}

// Reklamları yüklə
function loadAds() {
  const adsTop = document.getElementById('ads-top');
  const adsMiddle = document.getElementById('ads-middle');
  const adsBottom = document.getElementById('ads-bottom');
  
  const adsTopCode = localStorage.getItem('ads-top');
  const adsMiddleCode = localStorage.getItem('ads-middle');
  const adsBottomCode = localStorage.getItem('ads-bottom');
  
  if (adsTopCode) adsTop.innerHTML = adsTopCode;
  if (adsMiddleCode) adsMiddle.innerHTML = adsMiddleCode;
  if (adsBottomCode) adsBottom.innerHTML = adsBottomCode;
}

// Mobil menyu
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

// Global funksiyalar
window.openCategory = openCategory;
window.filterCategory = filterCategory;
window.globalSearch = globalSearch;

