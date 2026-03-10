// Günlük xəbərləri al (oxu.az-dan)
async function getNews() {
  try {
    // RSS feed-dən xəbərləri al
    const rssUrl = 'https://oxu.az/feed';
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items.slice(0, 10).map(item => ({
        title: item.title,
        description: item.description ? item.description.substring(0, 150) + '...' : '',
        link: item.link,
        pubDate: new Date(item.pubDate).toLocaleDateString('az-AZ'),
        image: item.image || 'https://via.placeholder.com/300x200?text=Xəbər'
      }));
    }
    return [];
  } catch (error) {
    console.error('Xəbərlər alınarkən xəta:', error);
    return [];
  }
}

// Xəbərləri göstər
async function displayNews() {
  const newsContainer = document.getElementById('news-content');
  if (!newsContainer) return;

  newsContainer.innerHTML = `<p>${t('loading')}</p>`;

  const news = await getNews();
  if (news.length === 0) {
    newsContainer.innerHTML = `<p>${t('no_data')}</p>`;
    return;
  }

  newsContainer.innerHTML = `
    <div class="news-grid">
      ${news.map(item => `
        <div class="news-card">
          <img src="${item.image}" alt="${item.title}" class="news-image" onerror="this.src='https://via.placeholder.com/300x200?text=Xəbər'">
          <div class="news-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="news-footer">
              <span class="news-date">${item.pubDate}</span>
              <a href="${item.link}" target="_blank" class="read-more">${t('read_more')}</a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Sayfayı yükle
document.addEventListener('DOMContentLoaded', displayNews);

// Hər 1 saatda güncəllə
setInterval(displayNews, 60 * 60 * 1000);

