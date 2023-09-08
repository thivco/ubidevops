'use strict';
 
const express = require('express');
 
// Constants (inoples)
const PORT = 8080;
const HOST = '0.0.0.0';
 
// App (lication)
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});