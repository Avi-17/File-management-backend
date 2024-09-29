const prisma = require('../config/db');

const getFiles = async (req, res) => {
  const files = await prisma.file.findMany({
    where: { userAccess: { some: { userId: req.userId } } },
  });
  res.json(files);
};

const uploadFile = async (req, res) => {
  const { fileName, filePath, accessLevelId } = req.body;

  // Validate access level
  const accessLevel = await prisma.accessLevel.findUnique({
    where: { id: accessLevelId },
  });

  if (!accessLevel) {
    return res.status(400).json({ message: 'Invalid access level ID.' });
  }

  // Create the file and associate with user access and access level
  await prisma.file.create({
    data: {
      fileName,
      filePath,
      userAccess: {
        create: {
          userId: req.userId,         // User ID from token
          accessLevelId: accessLevelId // Valid access level
        },
      },
    },
  });

  res.status(201).json({ message: 'File uploaded successfully' });
};

const deleteFileById = async (req, res) => {
  const { fileId } = req.params;
  await prisma.file.delete({ where: { id: fileId } });
  res.status(200).json({ message: 'File deleted successfully' });
};

const getAccessLevels = async (req, res) => {
  const accessLevels = await prisma.accessLevel.findMany();
  res.json(accessLevels);
};

module.exports = { getFiles, uploadFile, deleteFileById, getAccessLevels };
