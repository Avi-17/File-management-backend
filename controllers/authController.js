const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../config/db');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 8);

  await prisma.user.create({
    data: { username, passwordHash },
  });

  res.status(201).json({ message: 'User created successfully' });
};

module.exports = { login, signup };
