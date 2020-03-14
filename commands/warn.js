const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            reason = args.slice(1).join(' '),
            warnEmbed = new Discord.RichEmbed()
                .setColor('FE5B7A')
                .setTitle('Предупреждение')

        if (!kUser || kUser.id === message.guild.me.id) {
            bot.sendErrEmbed(warnEmbed, 'Пользователь не найден | Укажите пользователя через @')
            return message.channel.send(warnEmbed)
        };

        let dbUser = await bot.localeRep.findOne({ userid: kUser.id, guildid: message.guild.id })
        if (!dbUser) {
            dbUser = { userid: kUser.id, guildid: message.guild.id };
            await bot.localeRep.save(dbUser);
        };

        dbUser.warns++;
        if (!reason) reason = 'Не указана';
        warnEmbed.addField(`**Администратор ${message.author.tag}**`, `**Выдал предупреждение ${kUser.user.tag} (${dbUser.warns}/5) ${dbUser.warns >= 5 ? '__Заблокирован!__' : ''}**\n**Причина: ${reason}**`)
        if (dbUser.warns >= 5) {
            dbUser.warns = 0;
            kUser.ban()
                .catch(async e => { if (e.message.includes('Missing Permissions') == true) await message.channel.send(new Discord.RichEmbed().setColor('000000').setTitle('Ошибка блокировки (Недостаточно прав)')) })
        }
        bot.localeRep.save(dbUser);
        await message.channel.send(warnEmbed).catch(err => { bot.logsErr(err) })
        await kUser.send(warnEmbed).catch(err => { bot.logsErr(err) })




    } catch (err) {
        bot.logsErr(err)
    }
}

module.exports.help = {
    name: 'warn',
    aliases: ['варн', 'пред', 'предупреждение', 'пиупиу'],
    description: 'Выдает участнику предупреждение. При получении 5 предупреждений участник получает бан',
    usages: { '!warn @user#0001 причина': 'Выдаст предупреждение @user#0001' },
    category: 'Модерирование'
}