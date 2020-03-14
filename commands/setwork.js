const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        let addUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            addEmbed = new Discord.RichEmbed()
                .setColor('65BDFF')
                .setTitle('Изменение работы');
        if (!args[1]) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 лвл`)
            return message.channel.send(addEmbed)
        }
        let sum = bot.toNum(args[1]);
        if (!addUser || !sum) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 лвл`)
            return message.channel.send(addEmbed)
        }
        if (sum > bot.works.length) {
            bot.sendErrEmbed(addEmbed, `Укажите число меньше ${bot.works.length}`)
            return message.channel.send(addEmbed)
        }
        let user = await bot.usersRep.findOne({ userid: addUser.id });
        user.worklvl = sum;
        addEmbed.addField(`${message.author.tag} изменил уровень работы ${addUser.user.tag}`, `**Теперь ${addUser.user.tag} работает ${bot.works[sum].name}**`)
        await bot.usersRep.save(user);
        message.channel.send(addEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'setwork',
    aliases: ['sw', 'установитьработу', 'изменитьработу', '+работа'],
    description: 'Устанавливает уровень работы пользователю (Только для создателей)',
    usages: { '!setwork @user#0001 3': 'Изменит уровень работы @user#0001 на 3 ' },
    category: 'Экономика',
    owneronly: true
}; 