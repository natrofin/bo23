const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let blockEmbed = new Discord.RichEmbed()
            .setColor('FF4EFF')
            .setTitle('Антиреклама')
        let vkl;
        let bin = bot.guild.blockinvites
        if (bin == 0) {
            vkl = 'включили'
            bot.guild.blockinvites = 1;
        } else {
            vkl = 'выключили'
            bot.guild.blockinvites = 0;
        }
        blockEmbed.addField(message.author.tag, `Вы ${vkl} блокировку приглашений`);

        message.channel.send(blockEmbed);
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'blockinvites',
    aliases: ['bi', 'блокировкаприглашений', 'бп', 'антиреклама', 'antiinvite'],
    description: 'Удаляет приглашения на другой сервер и выдает мут',
    usages: { '!blockinvites': 'Включение отключение' },
    category: 'Модерирование'
}
