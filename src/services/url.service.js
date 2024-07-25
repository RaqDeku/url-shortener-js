const hashClass = require("./utils/hash.letters.js");

/**
 * The Service class which encodes and decodes
 * the urls
 */
class UrlService {
  constructor({ urlStore }) {
    this.database = urlStore;
    this.hashLetters = hashClass;
  }

  async shortenOriginalUrl(requestData, host) {
    const originalUrl = requestData.originalUrl;

    const shortenedUrl = this.hashLetters.generate();

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

module.exports = UrlService;
