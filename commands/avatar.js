const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        
        let usr = message.mentions.users.first() ? message.mentions.users.first() : message.author;
        let embed = new Discord.RichEmbed().setColor('9D4DFF')
            .setTitle(`Аватар ${usr.username}!`)
            .setImage(usr.avatarURL);
        await message.channel.send(embed)
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'avatar',
    aliases: ['аватар'],
    description: 'Получить аватар пользователя',
    usages: { '!avatar': 'Получает ваш аватар', '!avatar @user#0001': 'Аватар @user#0001' },
    category: 'Информация'
}
