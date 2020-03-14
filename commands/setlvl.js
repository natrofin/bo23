const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let addUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            sum = bot.toNum(args[1]),
            addEmbed = new Discord.RichEmbed()
                .setColor('80EB52')
                .setTitle('Изменение уровня')
        if (!args[1]) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 уровень`)
            return message.channel.send(addEmbed)
        }
        if (!addUser || !sum) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 уровня`)
            return message.channel.send(addEmbed)
        }
        let user = await bot.usersRep.findOne({ userid: addUser.id });
        user.lvl = sum;
        addEmbed.addField(`${message.author.tag} изменил уровень ${addUser.user.tag}`, `**Уровень ${addUser.user.tag} составляет: ${bot.locale(user.lvl)}**`)
        await bot.usersRep.save(user);
        message.channel.send(addEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'setlevel',
    aliases: ['setlvl', 'slvl', 'установитьуровень', 'сетлвл'],
    description: 'Изменение уровня',
    usages: { '!setlvl @user0001 12': 'Баланс @user0001 будет 12' },
    category: 'Модерирование',
}; 