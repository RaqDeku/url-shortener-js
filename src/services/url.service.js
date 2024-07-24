import generateShortUrl from "./utils/hash.letters.js";

/**
 * The URL service class responsible
 */
class UrlService {
  constructor({ urlStore }) {
    this.database = urlStore;
  }

  async shortenOriginalUrl(requestData, host) {
    const originalUrl = requestData.originalUrl;

    const shortenedUrl = generateShortUrl();

    await this.database.insertUrls(shortenedUrl, originalUrl);

    return `${host}/${shortenedUrl}`;
  }

  async getOriginalUrl(requestData) {
    const shortenedUrl = requestData.shortUrl;

    const shortUrl = shortenedUrl.split("/")[1];

    const urlItem = await this.database.getUrl(shortUrl);

    if (!urlItem) {
      throw new Error("Url not found");
    }

    return urlItem.originalUrl;
  }
}

export default UrlService;
