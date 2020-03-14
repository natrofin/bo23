const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
        let autoroleEmbed = new Discord.RichEmbed()
            .setColor('7FFFD4')
            .setTitle('Автороль')
        if (!args[0]) {
            bot.sendErrEmbed(autoroleEmbed, 'Укажите роль')
            return message.channel.send(autoroleEmbed)
        }
        let role = message.mentions.roles.first() || message.guild.roles.get(bot.toNum(args[0]));
        if (!role) {
            bot.sendErrEmbed(autoroleEmbed, 'Укажите роль')
            return message.channel.send(autoroleEmbed)
        }

        bot.guild.autorole = role.id;

        autoroleEmbed.addField(message.author.tag, `**Роль ${role} установлена как автороль**`);

        message.channel.send(autoroleEmbed);
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'autorole',
    aliases: ['автороль', 'arole', 'ароль', 'автоматическаяроль', 'рольпризаходе', 'joinrole'],
    description: 'Выдает выбранную роль при заходе на ваш сервер',
    usages: { '!autorole @RoLe123': 'При заходе на ваш сервер будет выдана роль RoLe123' },
    category: 'Модерирование'
}
