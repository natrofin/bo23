const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let addUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            sum = bot.toNum(args[1]),
            addEmbed = new Discord.RichEmbed()
                .setColor('80EB52')
                .setTitle('Добавление')
        if (!args[1]) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 сумма`)
            return message.channel.send(addEmbed)
        }
        let b = 3;
        let a = 5;
        if (!addUser || !sum) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 сумма`)
            return message.channel.send(addEmbed)
        }

        let user = await bot.localeRep.findOne({ userid: addUser.id, guildid: message.guild.id });
        user.coins += sum;
        addEmbed.addField(`${message.author.tag} добавил ${addUser.user.tag} ${bot.locale(sum)} $`, `**Баланс ${addUser.user.tag} составляет: ${bot.locale(user.coins)} $**`)
        await bot.localeRep.save(user)
        message.channel.send(addEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'add',
    aliases: ['добавить', 'доб',],
    description: 'Изменение баланса (На вашем сервере)',
    usages: { '!add @user#0001 1000': 'Добавить 1.000$' },
    category: 'Модерирование',
}; 