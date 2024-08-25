const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Импортируем cors
const app = express();
const scheduleRoutes = require('./routes/scheduleRoutes');

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api', scheduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
