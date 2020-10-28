const DB = require('./db/dbconfig')

module.exports = {
    createShortUrl,
    findShortUrl
}

function createShortUrl(shortUrl){
    return DB('shortUrl')
        .insert(shortUrl)
        .returning('*')
}

function findShortUrl(shortID){
    return DB('shortUrl').where({ shortID });
}