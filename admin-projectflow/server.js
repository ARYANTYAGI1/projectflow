const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')
const _ = require('underscore-node')
const cons = require('consolidate')
const root = fs.realpathSync('.')
const app = express()

//configuring vendor based middlewares
app.use('/', express.static(__dirname + '/dist/'))
app.use('/src/assets', express.static(__dirname + '/src/assets/'))
app.use('/static', express.static(__dirname + '/dist/static/'))
app.use('/dist', express.static(__dirname + '/dist/'))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With, module')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next()
})

//rendering engine
app.set('views', './')
app.engine('html', cons.underscore)
app.set('view engine', 'html')

app.get('/*', function (req, res) {
    res.sendFile(path.join(root, 'dist/index.html'))
})

//SERVER LISTENING
var port = process.env.PORT ? process.env.PORT : 5002
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port //Route to Frontend to make socket connection
    console.log('Node server running at http://%s:%s. API in use: %s', host, port, app.get('env'))
});