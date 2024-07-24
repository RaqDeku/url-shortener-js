/**
 * Database Class responsible for interacting
 * with the mysql database.
 */
class UrlStore {
  constructor({ dbPool }) {
    this.store = dbPool;
  }

  async #createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS urls (
            id INT AUTO_INCREMENT PRIMARY KEY,
            shortUrl VARCHAR(255) NOT NULL,
            originalUrl VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    return await this.store.execute(query);
  }

  async insertUrls(shortUrl, longUrl) {
    await this.#createTable();

    const query = `
    INSERT INTO urls (shortUrl, originalUrl)
    VALUES (?, ?)
    `;
    return await this.store.query(query, [shortUrl, longUrl]);
  }

  async getUrl(shortUrl) {
    const query = `
    SELECT * FROM 
    urls WHERE shortUrl = ?
    `;
    const [rows] = await this.store.query(query, [shortUrl]);
    return rows[0];
  }
}

export default UrlStore;
