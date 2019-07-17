const express = require('express')
const axios = require('axios')
const app = express()

let articles;
async function getArticles() {
  const response = await axios.get('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
  articles = response.data.articles;
}

function middleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next();
}

getArticles()
app.use(middleware)
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.json({ message: 'hello world' })
})

app.get('/articles', function (req, res) {
  res.json({ articles })
})

app.post('/articles/new', function(req, res) {
  articles.unshift(req.body)
  res.sendStatus(200)
})

app.get('/articles/:id', function (req, res) {
  const { id } = req.params;
  res.json({ article: articles[id] })
})

app.listen(8080, () => console.log(`Example app listening on port 8080!`))