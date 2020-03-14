const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let addUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            sum = bot.toNum(args[1]),
            addEmbed = new Discord.RichEmbed()
                .setColor('80EB52')
                .setTitle('Изменение')
        if (!args[1]) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 сумма`)
            return message.channel.send(addEmbed)
        }
        if (!addUser || !sum) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 сумма`)
            return message.channel.send(addEmbed)
        }
        let user = await bot.localeRep.findOne({ userid: addUser.id, guildid: message.guild.id });
        user.coins = sum;
        addEmbed.addField(`${message.author.tag} установил ${addUser.user.tag} баланс в ${bot.locale(sum)} $`, `**Баланс ${addUser.user.tag} составляет: ${bot.locale(user.coins)} $**`)
        await bot.localeRep.save(user)
        message.channel.send(addEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'set',
    aliases: ['установить', 'сет',],
    description: 'Изменение баланса (На вашем сервере)',
    usages: { '!set @user0001 1006': 'Баланс @user0001 будет 1.006$' },
    category: 'Модерирование',
}; 