// next.config.js
const metadataBase = 'https://www.finprez.com';

module.exports = {
 reactStrictMode: true,
 images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
 },
 metadata: {
    metadataBase,
 },
};