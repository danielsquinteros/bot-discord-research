require('dotenv').config();

const app = require('./app');

app.listen(3000);

console.log('Server is running port', 3000)