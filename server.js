const express = require('express')
var cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { nanoid } = require('nanoid')
const requestIp = require('request-ip')

const db = require('./urlModels')
const DB = require('./db/dbconfig')

var app = express()
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json("Server is up and running.")
})

app.get('/userLinks', (req, res) => {
    const clientIp = requestIp.getClientIp(req)

    db.findUserUrls(clientIp)
        .then((urls)=>{
                res.status(200).json(urls)
        })
})

app.get('/:shortID/visitors', (req, res) => {
    const shortID = req.params.shortID
    db.findVisitors(shortID)
        .then((visitors) => {
            res.status(200).json(visitors)
        })
})

app.get('/:shortID', (req, res) => { //End point to redirect visitor to full URL
    let clientIp = requestIp.getClientIp(req) // Gets ip of visitor
    if (clientIp.includes("::ffff:")) {
        clientIp = clientIp.substring(7, clientIp.length) //rids of the ::ffff:
    }
    const shortID = req.params.shortID
    db.findShortUrl(shortID)
        .then((shortURL) => {
            if (shortURL.length == 0){
                res.status(404).json("URL not found")
            } else {
                DB('shortUrl').where({ shortID: shortURL[0].shortID }).update({visits: shortURL[0].visits+1}).then(); //Increments visits by 1 every visit
                DB('visitors').insert({ shortID: shortURL[0].shortID, visitedBy: clientIp }).then() //logs visitors ip
                res.redirect(shortURL[0].url)
            }
            
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

app.post('/', (req, res) => {
    const url = req.body.url;
    const shortID = nanoid(5)
    const createdBy = requestIp.getClientIp(req)
    db.createShortUrl({url, shortID, createdBy})
        .then((shortURL) => {
            res.status(200).json(shortURL)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    
})

PORT = 5000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})