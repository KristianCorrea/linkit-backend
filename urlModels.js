const DB = require('./db/dbconfig')

module.exports = {
    createShortUrl,
    findShortUrl,
    findUserUrls,
    findVisitors
}

function createShortUrl(shortUrl){
    return DB('shortUrl')
        .insert(shortUrl)
        .returning('*')
}

function findUserUrls(ipAddress){
    return DB('shortUrl')
        .where({ createdBy: ipAddress })
}

function findVisitors(shortID){
    return DB('visitors')
        .where({ shortID: shortID })
}

function findShortUrl(shortID){
    return DB('shortUrl').where({ shortID });
}