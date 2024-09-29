const express = require('express');
const { getFiles, uploadFile, deleteFileById, getAccessLevels } = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const accessMiddleware = require('../middlewares/accessMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/files', getFiles);
router.get('/access-levels', getAccessLevels); 
router.post('/files', uploadFile);
router.delete('/files/:fileId', accessMiddleware, deleteFileById);

module.exports = router;
