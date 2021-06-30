const app = require('express')(),
  server = require('http').Server(app),
  bp = require("body-parser")


require('ejs')
require('dotenv').config()

app.use(bp.json())
app.use(bp.urlencoded({extended: false}))
app.use(require('express').static(__dirname + '/public'))
app.set('view engine', 'ejs');


app.use(require('./routes/index'))

server.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.info("Listening on port: 5000")
})