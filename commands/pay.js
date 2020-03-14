const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        let usr = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let payEmbed = new Discord.RichEmbed().setColor('61EB44')
            .setTitle('Платеж')
        if (!usr) {
            bot.sendErrEmbed(payEmbed, `Используйте: ${bot.command} #user0001 сумма`)
            return message.channel.send(payEmbed)
        }
        if (!args[1]) {
            bot.sendErrEmbed(payEmbed, `Используйте: ${bot.command} #user0001 сумма`)
            return message.channel.send(payEmbed)
        }
        let num = bot.toNum(args[1])
        if (usr.id == message.author.id) return;
        if (!num) {
            bot.sendErrEmbed(payEmbed, `Используйте: ${bot.command} #user0001 сумма`)
            return message.channel.send(payEmbed)
        } else if (num > bot.localeUser.coins) {
            bot.sendErrEmbed(payEmbed, `У вас недостаточно денег! Ваш баланс: ${bot.locale(bot.localeUser.coins)}`)
            return message.channel.send(payEmbed)
        }
        let dbUser = await bot.localeRep.findOne({ userid: usr.id, guildid: message.guild.id });
        if (!dbUser) {
            dbUser = { userid: usr.id, guildid: message.guild.id };
            await bot.localeRep.save(dbUser);
        }

        bot.localeUser.coins -= num
        dbUser.coins += num
        await bot.localeRep.save(dbUser)
        let user = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(num>=1000000, '👼', user, message);
        bot.usersRep.save(user);
        
        payEmbed.addField(message.author.tag, `**Вы передали ${usr.user.tag} ${bot.locale(num)} $! Ваш баланс ${bot.locale(bot.localeUser.coins)}**`);
        message.channel.send(payEmbed)
        
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'pay',
    aliases: ['передать', 'платеж', 'отдать', 'перекинуть', 'заплатить'],
    description: 'Передать деньги другому пользователю',
    usages: { '!pay @user#0001 3000': 'Передаст #user0001 3.000$' },
    category: 'Экономика'
}
