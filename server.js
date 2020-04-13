const express = require('express');
const path = require('path');

const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, 'src/UI')));

const PORT = 4000 || process.env.PORT;

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));