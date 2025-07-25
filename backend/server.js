const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const summaryRoute = require('./routes/summary');
const computerRoute = require('./routes/computer'); // ⬅️ Add this
const cpuRoute = require('./routes/cpu');
const switchRoute = require('./routes/switch');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Routes
app.use('/api/summary', summaryRoute);
app.use('/api/computers', computerRoute); // ⬅️ Add this
app.use('/api/cpus', cpuRoute); 
app.use('/api/switches', switchRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
