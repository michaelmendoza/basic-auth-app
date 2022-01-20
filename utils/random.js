/**
 * Returns a random value (uniform distribution) between min and max
 * @param min min value
 * @param max max value
 */
 const random = (min, max) => Math.random() * (max - min) + min;

 /**
   * Returns a random integer value (uniform distribution) between min and max
   * @param min min value
   * @param max max value
   */
 const randomInt = (min, max) => Math.round(Math.random() * (max - min) + min);
 
  /**
   * Generates a random hex string of specified length
   * @param {int} size size of hex 
   * @returns 
   */
 const randomHexString = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
 
  /**
   * Generates a random string (values 0-9, a-z) of specified length
   * @param {int} size size of hex 
   * @returns 
   */
 const randomString = size => [...Array(size)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
 
 module.exports = {
     random,
     randomInt,
     randomHexString,
     randomString
 }