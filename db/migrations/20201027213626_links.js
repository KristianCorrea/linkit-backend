
exports.up = function(knex) {
    return knex.schema
        .createTable('shortUrl', function (table) {
            table.string('shortID', 320).notNullable().unique();
            table.string('url').notNullable();
            table.integer('visits').defaultTo(0);
            table.string('createdBy')
        })
        .createTable('visitors', function (table){
            table.string('shortID').notNullable().references('shortID').inTable('shortUrl')
            table.string('visitedBy').notNullable()
            table.timestamps(false, true);
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('visitors')
        .dropTableIfExists('shortUrl')
};
