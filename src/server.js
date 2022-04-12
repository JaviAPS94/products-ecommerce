const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080;

app.use('/api/products', routes);

app.listen(PORT, () => console.log(`SERVER LISTEN ON PORT ${PORT}`));