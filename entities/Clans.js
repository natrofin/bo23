module.exports = {
    name: 'Clans',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        ownerid: {
            type: 'varchar'
        },
        name: {
            type: 'varchar'
        },
        description: {
            type: 'text',
            default: "Клан без описания"
        },
        messages: {
            type: 'int',
            default: 0
        },
        xp: {
            type: 'int',
            default: 0
        },
        level: {
            type: 'int',
            default: 1
        },
        coins: {
            type: 'int',
            default: 0
        },
        members: {
            type: 'int',
            default: 16
        },
    },
};