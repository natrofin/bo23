const config = require('../config.json');
module.exports = {
    name: 'Guilds',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        guildid: {
            type: 'varchar'
        },
        autorole: {
            type: 'text',
            default: 0
        },
        blockinvites: {
            type: 'tinyint',
            default: 0
        },
        muterole: {
            type: 'text',
            default: 0
        },
        cmdchannel: {
            type: 'text',
            default: 0
        },
        botcount: {
            type: 'text',
            default: 0
        },
        userscount: {
            type: 'text',
            default: 0
        },
        voiceonline: {
            type: 'text',
            default: 0
        },
        joinleave: {
            type: 'text',
            default: 0,
        },
        GuildwelcomeMessage: {
            type: 'text',
            default: 'Привет %username%'
        },
        LeavewelcomeMessage: {
            type: 'text',
            default: 'Пака %username%'
        },
        reportChannel: {
            type: 'text',
            default: 0
        },
        shop: {
            type: 'text',
            default: ''
        },
        privateChannel: {
            type: 'text',
            default: '0'
        },
        voicemute: {
            type: 'text',
            default: 0
        },
        verifymessage: {
            type: 'text',
            default: '0'
        },
        prefix: {
            type: 'text',
            default: config.prefix
        }
    },
};