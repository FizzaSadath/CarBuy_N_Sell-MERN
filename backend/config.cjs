// generateSecretKey.js or config.js

// const crypto = require('crypto');

// // Generate a random secret key
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey);
const secretKey = process.env.SECRET_KEY;

module.exports = {
  secretKey
};