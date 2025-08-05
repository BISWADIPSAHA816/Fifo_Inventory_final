const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventoryRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();
// const app = express();
const app = require('./app'); // or your express app
module.exports = app;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use('/', inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
