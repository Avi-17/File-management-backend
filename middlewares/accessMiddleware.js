const prisma = require('../config/db');

const accessMiddleware = async (req, res, next) => {
  const { userId } = req;
  const { fileId } = req.params;

  const access = await prisma.userAccess.findFirst({
    where: { userId, fileId, accessLevel: { levelName: 'GRANTED' } },
  });

  if (!access) {
    return res.status(403).json({ message: 'Access denied.' });
  }

  next();
};

module.exports = accessMiddleware;
