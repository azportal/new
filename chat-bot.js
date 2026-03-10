// Chat Bot Cavabları (5 dildə)
const botResponses = {
  az: {
    hello: ['Salam! Necəsiniz?', 'Xoş gəlmisiniz!', 'Salam, sizə necə kömək edə bilərəm?'],
    help: ['Mən sizə bölmələr, reklam, xəbərlər haqqında kömək edə bilərəm.', 'Nə haqqında soruşmaq istəyirsiniz?'],
    categories: ['Bizim 80+ bölməmiz var. Oyunlar, Texnologiya, Proqramlaşdırma və daha çox.'],
    ads: ['Reklam qoymaq üçün admin panelə daxil olun.', 'Reklam paketlərimiz: Üst, Orta, Alt.'],
    thanks: ['Xoş olun!', 'Sizə kömək edə bilərsəm xoşbəxtəm.'],
    bye: ['Sağ olun! Yenidən görüşərik.', 'Hoşça qalın!'],
    games: ['Oyun bölməsində 100,000+ oyun tapa bilərsiniz.'],
    tech: ['Texnologiya bölməsində ən yeni texnologiyalar haqqında məlumat alabilərsiniz.'],
    news: ['Günlük xəbərləri oxu.az-dan çəkirik.'],
    weather: ['Hava məlumatı real-time olaraq göstərilir.'],
    default: ['Bunu anlamadım. Başqa bir şey soruşa bilərsiniz?']
  },
  tr: {
    hello: ['Merhaba! Nasılsınız?', 'Hoş geldiniz!', 'Merhaba, size nasıl yardımcı olabilirim?'],
    help: ['Size kategoriler, reklamlar, haberler hakkında yardımcı olabilirim.', 'Ne hakkında sormak istiyorsunuz?'],
    categories: ['80+ kategorimiz var. Oyunlar, Teknoloji, Programlama ve daha fazlası.'],
    ads: ['Reklam koymak için yönetici paneline girin.', 'Reklam paketlerimiz: Üst, Orta, Alt.'],
    thanks: ['Hoş olun!', 'Size yardımcı olabildiğim için mutluyum.'],
    bye: ['Teşekkürler! Tekrar görüşürüz.', 'Hoşça kalın!'],
    games: ['Oyun bölümünde 100,000+ oyun bulabilirsiniz.'],
    tech: ['Teknoloji bölümünde en yeni teknolojiler hakkında bilgi alabilirsiniz.'],
    news: ['Günlük haberleri oxu.az\'dan çekiyoruz.'],
    weather: ['Hava bilgisi gerçek zamanlı olarak gösterilir.'],
    default: ['Bunu anlamadım. Başka bir şey sorabilir misiniz?']
  },
  ru: {
    hello: ['Привет! Как дела?', 'Добро пожаловать!', 'Привет, чем я могу вам помочь?'],
    help: ['Я могу помочь вам с категориями, объявлениями, новостями.', 'О чем вы хотите спросить?'],
    categories: ['У нас есть 80+ категорий. Игры, Технология, Программирование и многое другое.'],
    ads: ['Чтобы разместить объявление, войдите в панель администратора.', 'Наши пакеты объявлений: Верхний, Средний, Нижний.'],
    thanks: ['Пожалуйста!', 'Я рад, что смог вам помочь.'],
    bye: ['Спасибо! До встречи.', 'До свидания!'],
    games: ['В разделе игр вы можете найти 100 000+ игр.'],
    tech: ['В разделе технологии вы можете получить информацию о новейших технологиях.'],
    news: ['Мы берем ежедневные новости из oxu.az.'],
    weather: ['Информация о погоде отображается в реальном времени.'],
    default: ['Я этого не понял. Можете спросить что-то еще?']
  },
  uk: {
    hello: ['Привіт! Як справи?', 'Ласкаво просимо!', 'Привіт, чим я можу вам допомогти?'],
    help: ['Я можу допомогти вам з категоріями, оголошеннями, новинами.', 'Про що ви хочете запитати?'],
    categories: ['У нас є 80+ категорій. Ігри, Технологія, Програмування та багато іншого.'],
    ads: ['Щоб розмістити оголошення, увійдіть на панель адміністратора.', 'Наші пакети оголошень: Верхній, Середній, Нижній.'],
    thanks: ['Будь ласка!', 'Я радий, що зміг вам допомогти.'],
    bye: ['Дякую! До зустрічі.', 'До побачення!'],
    games: ['У розділі ігор ви можете знайти 100 000+ ігор.'],
    tech: ['У розділі технологій ви можете отримати інформацію про новітні технології.'],
    news: ['Ми беремо щоденні новини з oxu.az.'],
    weather: ['Інформація про погоду відображається в реальному часі.'],
    default: ['Я цього не зрозумів. Можете запитати щось інше?']
  },
  ge: {
    hello: ['გამარჯობა! როგორ ხარ?', 'კეთილი იყო თქვენი მობრძანება!', 'გამარჯობა, როგორ შემიძლია დაგეხმაროთ?'],
    help: ['შემიძლია დაგეხმაროთ კატეგორიებით, განცხადებებით, ახალი ამბებით.', 'რის შესახებ გსურთ კითხვა?'],
    categories: ['80+ კატეგორია გვაქვს. თამაშები, ტექნოლოგია, პროგრამირება და სხვა.'],
    ads: ['განცხადების განთავსებისთვის შედით ადმინისტრატორის პანელში.', 'ჩვენი განცხადებების პაკეტები: ზედა, შუა, ქვედა.'],
    thanks: ['გთხოვთ!', 'მე ვარ ბედნიერი, რომ დაგეხმარე.'],
    bye: ['მადლობა! ხელახლა შეხვედრამდე.', 'ნახვამდის!'],
    games: ['თამაშების განყოფილებაში შეგიძლიათ იპოვოთ 100 000+ თამაში.'],
    tech: ['ტექნოლოგიის განყოფილებაში შეგიძლიათ მიიღოთ ინფორმაცია უახლესი ტექნოლოგიების შესახებ.'],
    news: ['ჩვენ ყოველდღიურ ახალი ამბებს ვიღებთ oxu.az-დან.'],
    weather: ['ამინდის ინფორმაცია რეალურ დროში ნაჩვენებია.'],
    default: ['ამას არ გავიგე. შეგიძლიათ სხვა რამე იკითხოთ?']
  }
};

// Chat Bot Ინიციალიზაცია
function initChatBot() {
  const chatContainer = document.getElementById('chat-bot');
  if (!chatContainer) return;

  chatContainer.innerHTML = `
    <div class="chat-bot-window">
      <div class="chat-header">
        <h3>🤖 ${t('chat_bot')}</h3>
        <button class="close-chat" onclick="closeChatBot()">✕</button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="bot-message">
          <p>${getBotResponse('hello')}</p>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" id="chat-input" placeholder="${t('search')}" onkeypress="handleChatInput(event)">
        <button onclick="sendChatMessage()">Göndər</button>
      </div>
    </div>
  `;
}

function getBotResponse(keyword) {
  const responses = botResponses[currentLanguage] || botResponses['az'];
  const responseArray = responses[keyword] || responses['default'];
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim().toLowerCase();
  
  if (!message) return;

  const messagesContainer = document.getElementById('chat-messages');
  
  // Kullanıcı mesajı
  messagesContainer.innerHTML += `
    <div class="user-message">
      <p>${input.value}</p>
    </div>
  `;

  // Bot cevabı
  let response = getBotResponse('default');
  
  if (message.includes('salam') || message.includes('hello') || message.includes('привет') || message.includes('привіт') || message.includes('გამარჯობა')) {
    response = getBotResponse('hello');
  } else if (message.includes('kateqoriya') || message.includes('kategori') || message.includes('категория') || message.includes('категорія') || message.includes('კატეგორია')) {
    response = getBotResponse('categories');
  } else if (message.includes('reklam') || message.includes('reklam') || message.includes('объявление') || message.includes('оголошення') || message.includes('განცხადება')) {
    response = getBotResponse('ads');
  } else if (message.includes('oyun') || message.includes('oyun') || message.includes('игра') || message.includes('гра') || message.includes('თამაში')) {
    response = getBotResponse('games');
  } else if (message.includes('texnologiya') || message.includes('teknoloji') || message.includes('технология') || message.includes('технологія') || message.includes('ტექნოლოგია')) {
    response = getBotResponse('tech');
  } else if (message.includes('xəbər') || message.includes('haber') || message.includes('новость') || message.includes('новина') || message.includes('ახალი ამბი')) {
    response = getBotResponse('news');
  } else if (message.includes('hava') || message.includes('hava') || message.includes('погода') || message.includes('погода') || message.includes('ამინდი')) {
    response = getBotResponse('weather');
  } else if (message.includes('təşəkkür') || message.includes('teşekkür') || message.includes('спасибо') || message.includes('дякую') || message.includes('მადლობა')) {
    response = getBotResponse('thanks');
  } else if (message.includes('hoşça') || message.includes('bye') || message.includes('до') || message.includes('до') || message.includes('ნახვამდის')) {
    response = getBotResponse('bye');
  }

  messagesContainer.innerHTML += `
    <div class="bot-message">
      <p>${response}</p>
    </div>
  `;

  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleChatInput(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function closeChatBot() {
  const chatBot = document.getElementById('chat-bot');
  if (chatBot) {
    chatBot.style.display = 'none';
  }
}

// Sayfayı yükle
document.addEventListener('DOMContentLoaded', initChatBot);

// Global funksiyalar
window.sendChatMessage = sendChatMessage;
window.handleChatInput = handleChatInput;
window.closeChatBot = closeChatBot;

