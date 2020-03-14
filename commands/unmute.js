const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let mutes = bot.mutes,
            kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            reason = args.slice(1).join(' '),
            muteEmbed = new Discord.RichEmbed()
                .setColor('FF8A14')
                .setTitle('Блокировка чата')

        if (!kUser || kUser.id === message.guild.me.id) {
            bot.sendErrEmbed(muteEmbed, 'Пользователь не найден | Укажите пользователя через @')
            return message.channel.send(muteEmbed)
        };
        let muteRole = message.guild.roles.get(bot.guild.muterole)
        if (!muteRole) {
            bot.sendErrEmbed(muteEmbed, 'Роль не найдена')
            return message.channel.send(muteEmbed)

        }
        if (!kUser.roles.has(muteRole.id)) {
            bot.sendErrEmbed(muteEmbed, 'Пользователь уже может писать')
            return message.channel.send(muteEmbed)
        }
        if (!reason) reason = 'Не указана';

        muteEmbed.addField(`**Администратор ${message.author.tag} снял запрет писать сообщения ${kUser.user.tag}**`, `**Причина: ${reason}**`)
        delete mutes[`${kUser.id}_${message.guild.id}`]
        kUser.removeRole(muteRole)
        await message.channel.send(muteEmbed).catch(err => { bot.logsErr(err) })
        await kUser.send(muteEmbed).catch(err => { bot.logsErr(err) })




    } catch (err) {
        bot.logsErr(err)
    }
}

module.exports.help = {
    name: 'unmute',
    aliases: ['untempmute', 'размут', 'размьют', 'снятьмут', 'воскреситьчтобыслетеласосальня'],
    description: 'Снимает с участника запрет писать сообщения',
    usages: { '!unmute @user#0001': 'Снимает запрет писать сообщения с @user#0001' },
    category: 'Модерирование'
}