const express = require('express')
var cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { nanoid } = require('nanoid')

const db = require('./urlModels')

var app = express()
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json("Server is up and running.")
})


app.get('/:shortID', (req, res) => {
    const shortID = req.params.shortID
    db.findShortUrl(shortID)
        .then((shortURL) => {
            if (shortURL.length == 0){
                res.status(404).json("URL not found")
            } else {
                console.log(shortURL[0].url)
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
    db.createShortUrl({url, shortID})
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