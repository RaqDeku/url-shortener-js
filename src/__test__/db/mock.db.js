class UrlStore {
  constructor() {
    this.store = [];
  }

  insertUrls(shortUrl, longUrl) {
    this.store.push({ id: Math.floor(Math.random() * 100), shortUrl, longUrl });
    return;
  }

  getUrl(shortUrl) {
    return this.store.find((item) => item.shortUrl === shortUrl);
  }
}

const urlStore = new UrlStore();

module.exports = urlStore;
