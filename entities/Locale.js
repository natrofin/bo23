module.exports = {
    name: 'Locale',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userid: {
            type: 'varchar'
        },
        guildid: {
            type: 'varchar'
        },
        warns: {
            type: 'int',
            default: 0
        },
        coins: {
            type: 'int',
            default: 0
        }
    },
};
