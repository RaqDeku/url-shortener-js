/**
 * A Class for hashing with a method which
 * generates a random string of letters
 */
class HashLetters {
  constructor() {}

  generate(length = 4) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}

const hash = new HashLetters();

module.exports = hash;
