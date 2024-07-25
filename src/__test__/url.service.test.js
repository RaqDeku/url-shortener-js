const assert = require("node:assert");
const urlStore = require("./db/mock.db.js");
const sinon = require("sinon");
const UrlService = require("../services/url.service.js");

describe("URl service class", () => {
  const host = "localhost:5000";
  let urlService;

  beforeEach(() => {
    urlService = new UrlService({ urlStore });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("shortenOriginalUrl", () => {
    it("should shorten original url and store in database", async () => {
      const requestData = {
        originalUrl: "https://github.com/RaqDeku/url-shortener-js",
      };
      const shortUrl = "abCde";

      urlService.hashLetters.generate = sinon.stub().returns(shortUrl);

      const shortenedUrl = await urlService.shortenOriginalUrl(
        requestData,
        host
      );

      assert.strictEqual(shortenedUrl, `${host}/${shortUrl}`);
    });
  });

  describe("getOriginalUrls", () => {
    it("should get original url from the database given a valid short url", async () => {
      const requestData = { shortUrl: "localhost:5000/abCde " };
      const shortUrl = "abCde";
      const originalUrl = "https://github.com/RaqDeku/url-shortener-js";

      urlStore.getUrl = sinon
        .stub()
        .withArgs(shortUrl)
        .resolves({ originalUrl });

      const result = await urlService.getOriginalUrl(requestData);

      assert.strictEqual(result, originalUrl);
    });

    it("should throw an error if the short URL is not found", async () => {
      const requestData = { shortUrl: "localhost:5000/abCde" };
      const shortUrl = "abCde";

      urlStore.getUrl = sinon.stub().withArgs(shortUrl).resolves(null);

      await assert.rejects(
        async () => {
          await urlService.getOriginalUrl(requestData);
        },
        { message: "Url not found" }
      );
    });
  });
});
