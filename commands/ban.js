const Discord = module.require('discord.js');
const ms = module.require('ms')
const fs = module.require('fs')
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let bans = bot.bans,
            date = args[1] ? (ms(args.slice(1, 3).join(' ')) || ms(args.slice(1, 2).join(' '))) : undefined,
            kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            reason = args.slice(2).join(' '),
            banembed = new Discord.RichEmbed()
                .setColor('FF8A14')
                .setTitle('Блокировка')

        if (!kUser || kUser.id === message.guild.me.id) {
            bot.sendErrEmbed(banembed, 'Пользователь не найден | Укажите пользователя через @')
            return message.channel.send(banembed)
        } else if (!kUser.bannable) {
            bot.sendErrEmbed(banembed, `Пользователя ${kUser.user.tag} невозможно забанить`)
            return message.channel.send(banembed)
        };
        if (!reason) reason = 'Не указана';
        if (date)
            bans[`${kUser.id}_${message.guild.id}`] = {
                time: Date.now() + date,
            }
        banembed.addField(`**Администратор ${message.author.tag} заблокировал ${kUser.user.tag}**`, `**Время блокировки: ${date ? ms(date, { long: true }) : 'Навсегда'}**\n**Причина: ${reason}**`)
        bot.addMark(true,'🔨',bot.dbUser,message)
        await message.channel.send(banembed).catch(err => { bot.logsErr(err) })
        await kUser.send(banembed).catch(err => { bot.logsErr(err) })
        await message.guild.ban(kUser).catch(err => { bot.logsErr(err) })



    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'ban',
    aliases: ['бан', 'темпбан', 'tempban', 'забанить', 'заблокировать'],
    description: 'Забанить участника сервера',
    category: 'Модерирование',
    usages: { '!ban @user#0001 1h': 'Забанить участника на 1 час', '!ban @user#0001': 'Забанить участника навсегда' }
}; 