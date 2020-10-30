const DB = require('./db/dbconfig')

module.exports = {
    createShortUrl,
    findShortUrl,
    findUserUrls
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

function findShortUrl(shortID){
    return DB('shortUrl').where({ shortID });
}