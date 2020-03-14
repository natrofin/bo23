const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            usr = kUser ? kUser.user : message.author,
            warnEmbed = new Discord.RichEmbed()
                .setColor('FE5B7A')
                .setThumbnail(usr.avatarURL)
                .setTitle(`Информация о ${usr.tag}`)
                .addField('ID:', `**${usr.id}**`, true)
                .addField('Имя пользователя:', `**${usr.username}**`, true)
                .addField('Дискриминатор:', `**${usr.discriminator}**`, true)
                .addField('Бот?', `**${usr.bot ? 'Да' : 'Нет'}**`, true)
                .addField('Создание аккаунта:', `**${usr.createdAt}**`)
                .setTimestamp()

        await message.channel.send(warnEmbed).catch(err => { bot.logsErr(err) })

    } catch (err) {
        bot.logsErr(err)
    }
}

module.exports.help = {
    name: 'userinfo',
    aliases: ['я', 'он'],
    description: 'Выдаст информацию о пользователе',
    usages: { '!userinfo': 'Покажет информацию о вас', '!userinfo @user#0001': 'Покажет информацию о @user#0001' },
    category: 'Информация'
}