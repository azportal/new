// API İntegrasiyası - Bütün xarici API-lər

// YouTube API
async function getYouTubeVideos(query) {
  try {
    const apiKey = 'AIzaSyD_demo_key'; // Demo key
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=20&key=${apiKey}`
    );
    const data = await response.json();
    return (data.items || []).map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('YouTube API xətası:', error);
    return [];
  }
}

// Play Store API (Alternatif)
async function getPlayStoreApps(query) {
  try {
    // Play Store-dan məlumat çəkmə (scraping)
    const response = await fetch(`https://play.google.com/store/search?q=${query}`);
    // Bu sadə bir demo, gerçek implementasyon için scraping gerekir
    return [];
  } catch (error) {
    console.error('Play Store API xətası:', error);
    return [];
  }
}

// App Store API
async function getAppStoreApps(query) {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=software&limit=20`
    );
    const data = await response.json();
    return (data.results || []).map(item => ({
      id: item.trackId,
      title: item.trackName,
      description: item.description,
      image: item.artworkUrl100,
      link: item.trackViewUrl,
      price: item.price
    }));
  } catch (error) {
    console.error('App Store API xətası:', error);
    return [];
  }
}

// GitHub API - Open Source Proyeler
async function getGitHubProjects(query) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=20`
    );
    const data = await response.json();
    return (data.items || []).map(item => ({
      id: item.id,
      title: item.name,
      description: item.description,
      link: item.html_url,
      stars: item.stargazers_count,
      language: item.language
    }));
  } catch (error) {
    console.error('GitHub API xətası:', error);
    return [];
  }
}

// NPM API - JavaScript Paketləri
async function getNPMPackages(query) {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${query}&size=20`
    );
    const data = await response.json();
    return (data.objects || []).map(item => ({
      id: item.package.name,
      title: item.package.name,
      description: item.package.description,
      link: item.package.links.npm,
      version: item.package.version
    }));
  } catch (error) {
    console.error('NPM API xətası:', error);
    return [];
  }
}

// PyPI API - Python Paketləri
async function getPyPIPackages(query) {
  try {
    const response = await fetch(
      `https://pypi.org/pypi/${query}/json`
    );
    const data = await response.json();
    return [{
      id: data.info.name,
      title: data.info.name,
      description: data.info.summary,
      link: data.info.project_url,
      version: data.info.version
    }];
  } catch (error) {
    console.error('PyPI API xətası:', error);
    return [];
  }
}

// CoinGecko API - Kriptovalyuta
async function getCryptoData(limit = 20) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false`
    );
    const data = await response.json();
    return data.map(coin => ({
      id: coin.id,
      title: coin.name,
      description: `${coin.symbol.toUpperCase()} - $${coin.current_price}`,
      link: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h
    }));
  } catch (error) {
    console.error('CoinGecko API xətası:', error);
    return [];
  }
}

// OMDB API - Filmler
async function getMovies(query) {
  try {
    const apiKey = 'demo_key'; // Demo key
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&type=movie&apikey=${apiKey}`
    );
    const data = await response.json();
    return (data.Search || []).map(item => ({
      id: item.imdbID,
      title: item.Title,
      description: item.Year,
      image: item.Poster,
      link: `https://www.imdb.com/title/${item.imdbID}`,
      year: item.Year
    }));
  } catch (error) {
    console.error('OMDB API xətası:', error);
    return [];
  }
}

// Spotify API - Musiqi
async function getSpotifyTracks(query) {
  try {
    // Spotify OAuth token lazımdır
    const token = localStorage.getItem('spotify_token');
    if (!token) return [];

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    return (data.tracks?.items || []).map(item => ({
      id: item.id,
      title: item.name,
      description: item.artists[0].name,
      image: item.album.images[0]?.url,
      link: item.external_urls.spotify,
      duration: item.duration_ms
    }));
  } catch (error) {
    console.error('Spotify API xətası:', error);
    return [];
  }
}

// NewsAPI - Xəbərlər
async function getNewsFromAPI(query = 'technology') {
  try {
    const apiKey = 'demo_key'; // Demo key
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
    );
    const data = await response.json();
    return (data.articles || []).map(item => ({
      id: item.url,
      title: item.title,
      description: item.description,
      image: item.urlToImage,
      link: item.url,
      source: item.source.name,
      date: item.publishedAt
    }));
  } catch (error) {
    console.error('NewsAPI xətası:', error);
    return [];
  }
}

// REST Countries API - Ülkə məlumatları
async function getCountryInfo(countryCode) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const data = await response.json();
    return data[0] || {};
  } catch (error) {
    console.error('REST Countries API xətası:', error);
    return {};
  }
}

// Unsplash API - Şəkillər
async function getImages(query) {
  try {
    const apiKey = 'demo_key'; // Demo key
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${apiKey}`
    );
    const data = await response.json();
    return (data.results || []).map(item => ({
      id: item.id,
      title: item.alt_description,
      description: item.description,
      image: item.urls.regular,
      link: item.links.html,
      author: item.user.name
    }));
  } catch (error) {
    console.error('Unsplash API xətası:', error);
    return [];
  }
}

// Pexels API - Şəkillər
async function getPexelsImages(query) {
  try {
    const apiKey = 'demo_key'; // Demo key
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=20`,
      {
        headers: {
          'Authorization': apiKey
        }
      }
    );
    const data = await response.json();
    return (data.photos || []).map(item => ({
      id: item.id,
      title: item.photographer,
      description: item.alt,
      image: item.src.medium,
      link: item.url,
      photographer: item.photographer
    }));
  } catch (error) {
    console.error('Pexels API xətası:', error);
    return [];
  }
}

// TVMaze API - TV Şouları
async function getTVShows(query) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    const data = await response.json();
    return (data || []).map(item => ({
      id: item.show.id,
      title: item.show.name,
      description: item.show.summary?.replace(/<[^>]*>/g, ''),
      image: item.show.image?.medium,
      link: item.show.url,
      status: item.show.status
    }));
  } catch (error) {
    console.error('TVMaze API xətası:', error);
    return [];
  }
}

// OpenLibrary API - Kitablar
async function getBooks(query) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${query}&limit=20`
    );
    const data = await response.json();
    return (data.docs || []).map(item => ({
      id: item.key,
      title: item.title,
      description: item.author_name?.[0] || 'Unknown',
      image: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : '',
      link: `https://openlibrary.org${item.key}`,
      year: item.first_publish_year
    }));
  } catch (error) {
    console.error('OpenLibrary API xətası:', error);
    return [];
  }
}

// Global API Çağırış Fonksiyonu
async function callAPI(apiType, query) {
  switch(apiType) {
    case 'youtube':
      return await getYouTubeVideos(query);
    case 'playstore':
      return await getPlayStoreApps(query);
    case 'appstore':
      return await getAppStoreApps(query);
    case 'github':
      return await getGitHubProjects(query);
    case 'npm':
      return await getNPMPackages(query);
    case 'pypi':
      return await getPyPIPackages(query);
    case 'crypto':
      return await getCryptoData();
    case 'movies':
      return await getMovies(query);
    case 'spotify':
      return await getSpotifyTracks(query);
    case 'news':
      return await getNewsFromAPI(query);
    case 'country':
      return await getCountryInfo(query);
    case 'images':
      return await getImages(query);
    case 'pexels':
      return await getPexelsImages(query);
    case 'tvshows':
      return await getTVShows(query);
    case 'books':
      return await getBooks(query);
    default:
      return [];
  }
}

// Sayfayı yükle
document.addEventListener('DOMContentLoaded', () => {
  console.log('API İntegrasiyası hazır');
});

