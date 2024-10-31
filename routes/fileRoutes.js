const express = require('express');
const { createFile, getFileById, getAllFiles, deleteFileById } = require('../controllers/fileController');
const {readAFile, updateFile} = require('../controllers/crud');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


//create, retrieve, delete files
router.post('/files', authMiddleware, createFile);
router.get('/files/:id', authMiddleware, getFileById);
router.get('/allFiles', authMiddleware, getAllFiles);
router.delete('/files/:id', authMiddleware, deleteFileById);


//to perform read, write, update operations on the files
router.get('/files/:id/read', authMiddleware, readAFile);
router.put('/files/:id', authMiddleware, updateFile)

module.exports = router;