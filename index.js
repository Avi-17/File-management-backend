const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


