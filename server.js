const express = require('express');
const app = express();

app.use(express.static('build'));

const port = process.env.PORT || 8080;

app.listen(port,() => console.log('App is running'));