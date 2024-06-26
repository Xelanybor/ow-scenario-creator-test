const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const distPath = path.resolve('');

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages', 'home.html'));
});

app.get('/scripts/:filename', (req, res) => {
  res.sendFile(path.resolve(distPath, 'scripts', req.params.filename));
});

app.get('/scenarios/:filename', (req, res) => {
  res.sendFile(path.resolve(distPath, 'scenarios', req.params.filename));
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve(distPath, 'bundle.js'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(distPath, 'favicon.ico'));
});

app.get('/images/heroes/:filename', (req, res) => {
  res.sendFile(path.resolve(distPath, 'images/heroes', req.params.filename));
});

app.get('/images/maps/:filename', (req, res) => {
  res.sendFile(path.resolve(distPath, 'images/maps', req.params.filename));
});

app.get('/styles/:filename', (req, res) => {
  res.sendFile(path.resolve(distPath, 'styles', req.params.filename));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});