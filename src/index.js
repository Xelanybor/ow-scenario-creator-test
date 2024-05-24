const express = require('express');
const path = require('path');

// __dirname = path.resolve();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages', 'home.html'));
});

app.get('/scripts/:filename', (req, res) => {
  res.sendFile(path.resolve('build/scripts', req.params.filename));
});

app.get('/scenarios/:filename', (req, res) => {
  res.sendFile(path.resolve('build/scenarios', req.params.filename));
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve('build/bundle.js'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});