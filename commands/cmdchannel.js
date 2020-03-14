const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
        let cmdchannelEmbed = new Discord.RichEmbed()
            .setColor('7FFFD4')
            .setTitle('Канал для команд')
        if (!args[0]) {
            bot.sendErrEmbed(cmdchannelEmbed, 'Укажите канал')
            return message.channel.send(cmdchannelEmbed)
        }
        let channel = message.mentions.channels.first() || message.guild.channels.get(bot.toNum(args[0]));
        if (!channel) {
            bot.sendErrEmbed(cmdchannelEmbed, 'Укажите канал')
            return message.channel.send(cmdchannelEmbed)
        }

        bot.guild.cmdchannel = channel.id;

        cmdchannelEmbed.addField(message.author.tag, `**Канал ${channel} установлен как канал для команд**`);

        message.channel.send(cmdchannelEmbed);
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'cmdchannel',
    aliases: ['cch', 'коммандыйканал', 'каналдлякоманд', 'кмдканал'],
    description: 'Устанавливает использвание команд в 1 из каналов',
    usages: { '!cmdchannel #channel': 'Команды будет разрешено использовать только в канале #channel' },
    category: 'Модерирование'
}
