// Ziyarətçi məlumatlarını al
async function getVisitorInfo() {
  try {
    // IP ünvanı
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Brauzer məlumatı
    const userAgent = navigator.userAgent;
    const browser = getBrowserName(userAgent);
    const os = getOSName(userAgent);

    // Operator məlumatı (IP-dən)
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    const operator = geoData.org || 'Bilinmir';
    const country = geoData.country_name || 'Bilinmir';
    const city = geoData.city || 'Bilinmir';

    // Saat/Tarix
    const now = new Date();
    const time = now.toLocaleTimeString('az-AZ');
    const date = now.toLocaleDateString('az-AZ');
    const day = getDayName(now.getDay());
    const month = getMonthName(now.getMonth());

    return {
      ip,
      browser,
      os,
      operator,
      country,
      city,
      time,
      date,
      day,
      month,
      year: now.getFullYear()
    };
  } catch (error) {
    console.error('Ziyarətçi məlumatları alınarkən xəta:', error);
    return null;
  }
}

function getBrowserName(userAgent) {
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  if (userAgent.indexOf('Safari') > -1) return 'Safari';
  if (userAgent.indexOf('Edge') > -1) return 'Edge';
  if (userAgent.indexOf('Opera') > -1) return 'Opera';
  return 'Bilinmir';
}

function getOSName(userAgent) {
  if (userAgent.indexOf('Windows') > -1) return 'Windows';
  if (userAgent.indexOf('Mac') > -1) return 'macOS';
  if (userAgent.indexOf('Linux') > -1) return 'Linux';
  if (userAgent.indexOf('Android') > -1) return 'Android';
  if (userAgent.indexOf('iPhone') > -1) return 'iOS';
  return 'Bilinmir';
}

function getDayName(dayIndex) {
  const days = ['Bazar', 'Bazar ertəsi', 'Çərşənbə', 'Çərşənbə axşamı', 'Cümə', 'Cümə axşamı', 'Şənbə'];
  return days[dayIndex];
}

function getMonthName(monthIndex) {
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
  return months[monthIndex];
}

// Ziyarətçi məlumatlarını göstər
async function displayVisitorInfo() {
  const infoContainer = document.getElementById('visitor-info');
  if (!infoContainer) return;

  infoContainer.innerHTML = `<p>${t('loading')}</p>`;

  const info = await getVisitorInfo();
  if (!info) {
    infoContainer.innerHTML = `<p>${t('error')}</p>`;
    return;
  }

  infoContainer.innerHTML = `
    <div class="visitor-info-card">
      <div class="info-grid">
        <div class="info-item">
          <span class="label">${t('ip')}:</span>
          <span class="value">${info.ip}</span>
        </div>
        <div class="info-item">
          <span class="label">${t('browser')}:</span>
          <span class="value">${info.browser}</span>
        </div>
        <div class="info-item">
          <span class="label">${t('operator')}:</span>
          <span class="value">${info.operator}</span>
        </div>
        <div class="info-item">
          <span class="label">Ülkə:</span>
          <span class="value">${info.country}</span>
        </div>
        <div class="info-item">
          <span class="label">Şəhər:</span>
          <span class="value">${info.city}</span>
        </div>
        <div class="info-item">
          <span class="label">${t('time')}:</span>
          <span class="value" id="live-time">${info.time}</span>
        </div>
        <div class="info-item">
          <span class="label">${t('date')}:</span>
          <span class="value">${info.date}</span>
        </div>
        <div class="info-item">
          <span class="label">Gün:</span>
          <span class="value">${info.day}</span>
        </div>
        <div class="info-item">
          <span class="label">Ay:</span>
          <span class="value">${info.month}</span>
        </div>
        <div class="info-item">
          <span class="label">İl:</span>
          <span class="value">${info.year}</span>
        </div>
      </div>
    </div>
  `;

  // Saat real-time güncelle
  updateLiveTime();
}

function updateLiveTime() {
  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString('az-AZ');
    const liveTimeEl = document.getElementById('live-time');
    if (liveTimeEl) {
      liveTimeEl.textContent = time;
    }
  }, 1000);
}

// Sayfayı yükle
document.addEventListener('DOMContentLoaded', displayVisitorInfo);

