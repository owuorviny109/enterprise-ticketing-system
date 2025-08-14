const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
