require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_ADMIN_SDK, 'base64').toString('utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'tasknest-backend.appspot.com'
});

const bucket = admin.storage().bucket();
module.exports = bucket;
