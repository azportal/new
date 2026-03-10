import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from './firebase-config.js';

// Bölmələr (80+)
const categories = [
  // OYUNLAR
  { id: 1, name: "Oyun Yüklə", icon: "🎮", desc: "Ən yeni oyunları yükləyin" },
  { id: 2, name: "PC Oyunlar", icon: "💻", desc: "Komputer oyunları" },
  { id: 3, name: "Mobil Oyunlar", icon: "📱", desc: "Android oyunları" },
  { id: 4, name: "Konsol Oyunlar", icon: "🕹️", desc: "PlayStation, Xbox" },
  { id: 5, name: "Retro Oyunlar", icon: "👾", desc: "Klassik oyunlar" },
  { id: 6, name: "Online Oyunlar", icon: "🌐", desc: "Çoxlu oyunçu oyunları" },
  { id: 7, name: "Oyun Modları", icon: "⚙️", desc: "Oyun modifikasiyaları" },
  { id: 8, name: "Oyun Treylerləri", icon: "🎬", desc: "Oyun videoları" },
  { id: 9, name: "Oyun Xəbərləri", icon: "📰", desc: "Oyun haqqında xəbərlər" },
  
  // TEXNOLOGİYA
  { id: 10, name: "Texnologiya Xəbərləri", icon: "📡", desc: "Texnologiya xəbərləri" },
  { id: 11, name: "Smartfonlar", icon: "📲", desc: "Telefon modellləri" },
  { id: 12, name: "Planşetlər", icon: "📱", desc: "Tablet cihazları" },
  { id: 13, name: "Noutbuklar", icon: "💻", desc: "Laptop kompüterləri" },
  { id: 14, name: "Komputer Hissələri", icon: "🔧", desc: "PC komponentləri" },
  { id: 15, name: "Prosessorlar", icon: "⚡", desc: "CPU prosessorları" },
  { id: 16, name: "Video Kartlar", icon: "🎨", desc: "GPU kartları" },
  { id: 17, name: "Monitorlar", icon: "🖥️", desc: "Ekran monitorları" },
  { id: 18, name: "Gaming Aksesuarları", icon: "🎧", desc: "Oyun aksesuarları" },
  
  // PROQRAMLAŞDIRMA
  { id: 19, name: "Web Proqramlaşdırma", icon: "🌐", desc: "Web development" },
  { id: 20, name: "Mobil Proqramlaşdırma", icon: "📱", desc: "Mobil app development" },
  { id: 21, name: "Python", icon: "🐍", desc: "Python proqramlaşdırması" },
  { id: 22, name: "JavaScript", icon: "⚙️", desc: "JavaScript kodlaması" },
  { id: 23, name: "PHP", icon: "🔵", desc: "PHP backend" },
  { id: 24, name: "Java", icon: "☕", desc: "Java proqramlaşdırması" },
  { id: 25, name: "C++", icon: "📝", desc: "C++ kodlaması" },
  { id: 26, name: "API İnkişafı", icon: "🔌", desc: "API development" },
  { id: 27, name: "Open Source", icon: "🔓", desc: "Açıq mənbə layihələri" },
  
  // SÜNİ İNTELLEKT
  { id: 28, name: "AI Alətləri", icon: "🤖", desc: "Süni intellekt alətləri" },
  { id: 29, name: "Machine Learning", icon: "🧠", desc: "Maşın öyrənməsi" },
  { id: 30, name: "Deep Learning", icon: "🔬", desc: "Dərin öyrənmə" },
  { id: 31, name: "AI Xəbərləri", icon: "📰", desc: "AI haqqında xəbərlər" },
  { id: 32, name: "AI Proqramları", icon: "💾", desc: "AI proqramları" },
  { id: 33, name: "AI Botlar", icon: "🤖", desc: "Chatbot və botlar" },
  
  // SOSİAL ŞƏBƏKƏLƏR
  { id: 34, name: "Instagram", icon: "📸", desc: "Instagram trikləri" },
  { id: 35, name: "TikTok", icon: "🎵", desc: "TikTok videoları" },
  { id: 36, name: "YouTube", icon: "📺", desc: "YouTube kanalları" },
  { id: 37, name: "Facebook", icon: "👥", desc: "Facebook məlumatları" },
  { id: 38, name: "Telegram", icon: "✈️", desc: "Telegram botları" },
  { id: 39, name: "WhatsApp", icon: "💬", desc: "WhatsApp trikləri" },
  { id: 40, name: "Sosial Media Trikləri", icon: "⭐", desc: "Sosial media ipuçları" },
  
  // BİZNES
  { id: 41, name: "Sahibkarlıq", icon: "💼", desc: "Biznes məlumatları" },
  { id: 42, name: "Startaplar", icon: "🚀", desc: "Startup layihələri" },
  { id: 43, name: "Marketinq", icon: "📊", desc: "Marketinq strategiyaları" },
  { id: 44, name: "Digital Marketinq", icon: "💻", desc: "Rəqəmsal marketinq" },
  { id: 45, name: "SMM", icon: "📱", desc: "Sosial media marketinq" },
  { id: 46, name: "Freelance", icon: "💰", desc: "Freelance işləri" },
  { id: 47, name: "Online Pul Qazanmaq", icon: "💵", desc: "Pul qazanma yolları" },
  { id: 48, name: "E-commerce", icon: "🛒", desc: "Elektron ticarət" },
  { id: 49, name: "Dropshipping", icon: "📦", desc: "Dropshipping biznes" },
  
  // KRİPTO
  { id: 50, name: "Kriptovalyuta Xəbərləri", icon: "📈", desc: "Kripto xəbərləri" },
  { id: 51, name: "Bitcoin", icon: "₿", desc: "Bitcoin məlumatları" },
  { id: 52, name: "Altcoinlər", icon: "💎", desc: "Digər kriptolar" },
  { id: 53, name: "Blockchain", icon: "⛓️", desc: "Blockchain texnologiyası" },
  { id: 54, name: "NFT", icon: "🎨", desc: "NFT və dijital sənət" },
  { id: 55, name: "Web3", icon: "🌐", desc: "Web3 texnologiyası" },
  { id: 56, name: "Kripto Analiz", icon: "📊", desc: "Kripto analizi" },
  
  // TƏHSİL
  { id: 57, name: "Online Kurslar", icon: "📚", desc: "Onlayn kurslar" },
  { id: 58, name: "Universitetlər", icon: "🎓", desc: "Universitetlər" },
  { id: 59, name: "Tələbə Həyatı", icon: "👨‍🎓", desc: "Tələbə məlumatları" },
  { id: 60, name: "Dərs Materialları", icon: "📖", desc: "Dərs materialları" },
  { id: 61, name: "İmtahan Hazırlığı", icon: "✏️", desc: "İmtahan hazırlığı" },
  { id: 62, name: "Dil Öyrənmə", icon: "🗣️", desc: "Dil öyrənmə" },
  
  // ELM
  { id: 63, name: "Riyaziyyat", icon: "🔢", desc: "Riyaziyyat dərsi" },
  { id: 64, name: "Fizika", icon: "⚛️", desc: "Fizika elmləri" },
  { id: 65, name: "Kimya", icon: "🧪", desc: "Kimya elmləri" },
  { id: 66, name: "Biologiya", icon: "🧬", desc: "Biologiya elmləri" },
  { id: 67, name: "Astronomiya", icon: "🌌", desc: "Astronomiya" },
  { id: 68, name: "Kosmos", icon: "🚀", desc: "Kosmos araşdırması" },
  
  // SAĞLAMLIQ
  { id: 69, name: "Tibbi Məlumatlar", icon: "⚕️", desc: "Sağlıq məlumatları" },
  { id: 70, name: "Fitness", icon: "💪", desc: "Fitness məşqləri" },
  { id: 71, name: "Bodybuilding", icon: "🏋️", desc: "Bodybuilding" },
  { id: 72, name: "Dieta və Qidalanma", icon: "🥗", desc: "Dieta planları" },
  { id: 73, name: "Meditasiya", icon: "🧘", desc: "Meditasiya" },
  { id: 74, name: "Yoga", icon: "🧘‍♀️", desc: "Yoga məşqləri" },
  
  // İDMAN
  { id: 75, name: "Futbol", icon: "⚽", desc: "Futbol xəbərləri" },
  { id: 76, name: "Basketbol", icon: "🏀", desc: "Basketbol" },
  { id: 77, name: "UFC / MMA", icon: "🥊", desc: "UFC döyüşləri" },
  { id: 78, name: "E-sport", icon: "🎮", desc: "E-sport turnirləri" },
  { id: 79, name: "İdman Xəbərləri", icon: "📰", desc: "İdman xəbərləri" },
  
  // ƏYLƏNCƏ
  { id: 80, name: "Memlər", icon: "😂", desc: "Komik memlər" }
];

// Saytı yüklə
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadComments();
  loadOrders();
  setupForms();
  setupMobileMenu();
});

// Bölmələri göstər
function loadCategories() {
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="viewCategory(${cat.id})">
      <div style="font-size: 2rem; margin-bottom: 10px;">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.desc}</p>
    </div>
  `).join('');
}

// Bölməni aç
function viewCategory(id) {
  const cat = categories.find(c => c.id === id);
  alert(`${cat.name}\n\n${cat.desc}`);
}

// Axtarış
function searchCategories() {
  const search = document.getElementById('search').value.toLowerCase();
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
    <div class="category-card" onclick="viewCategory(${cat.id})">
      <div style="font-size: 2rem; margin-bottom: 10px;">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.desc}</p>
    </div>
  `).join('');
}

// Şərhlər yüklə
async function loadComments() {
  const list = document.getElementById('comments-list');
  try {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      list.innerHTML = '<p style="text-align: center;">Hələ şərh yoxdur</p>';
      return;
    }
    
    list.innerHTML = snapshot.docs.map(doc => {
      const data = doc.data();
      return `
        <div class="comment-item">
          <strong>${data.name}</strong>
          <small>${new Date(data.timestamp).toLocaleDateString('az-AZ')}</small>
          <p>${data.text}</p>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Şərhlər yüklənərkən xəta:', error);
  }
}

// Sifarişləri yüklə
async function loadOrders() {
  const list = document.getElementById('orders-list');
  try {
    const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      list.innerHTML = '<p style="text-align: center;">Hələ sifariş yoxdur</p>';
      return;
    }
    
    list.innerHTML = snapshot.docs.map(doc => {
      const data = doc.data();
      return `
        <div class="order-item">
          <h4>${data.name}</h4>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <p><strong>Sifariş:</strong> ${data.message}</p>
          <small>${new Date(data.timestamp).toLocaleDateString('az-AZ')}</small>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Sifarişlər yüklənərkən xəta:', error);
  }
}

// Formları qur
function setupForms() {
  // Şərh formu
  document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('comment-name').value;
    const email = document.getElementById('comment-email').value;
    const text = document.getElementById('comment-text').value;
    
    try {
      await addDoc(collection(db, 'comments'), {
        name,
        email,
        text,
        timestamp: new Date().toISOString()
      });
      
      document.getElementById('comment-form').reset();
      alert('Şərhiniz göndərildi!');
      loadComments();
    } catch (error) {
      alert('Xəta: ' + error.message);
    }
  });
  
  // Sifariş formu
  document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputs = document.querySelectorAll('#order-form input, #order-form textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const message = inputs[3].value;
    
    try {
      await addDoc(collection(db, 'orders'), {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      });
      
      document.getElementById('order-form').reset();
      alert('Sifarişiniz göndərildi!');
      loadOrders();
    } catch (error) {
      alert('Xəta: ' + error.message);
    }
  });
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
