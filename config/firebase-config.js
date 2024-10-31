var admin = require("firebase-admin");

var serviceAccount = require("./tasknest-backend-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'tasknest-backend.appspot.com'
});

const bucket = admin.storage().bucket();
module.exports = bucket;