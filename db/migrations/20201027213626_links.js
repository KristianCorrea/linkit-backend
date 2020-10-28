
exports.up = function(knex) {
    return knex.schema
        .createTable('shortUrl', function (table) {
            table.increments();
            table.string('shortID', 320).notNullable().unique();
            table.string('url').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('shortUrl')
};
