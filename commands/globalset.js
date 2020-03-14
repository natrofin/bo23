const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        let addUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            addEmbed = new Discord.RichEmbed()
                .setColor('80EB52')
                .setTitle('Изменение бананов');
        if (!args[1]) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 сумма`)
            return message.channel.send(addEmbed)
        }
        let sum = bot.toNum(args[1]);
        if (!addUser || !sum) {
            bot.sendErrEmbed(addEmbed, `Используйте ${bot.command} @user#0001 сумма`)
            return message.channel.send(addEmbed)
        }
        let user = await bot.usersRep.findOne({ userid: addUser.id });
        user.coins = sum;
        addEmbed.addField(`${message.author.tag} изменил количество бананов ${addUser.user.tag}`, `**Баланс ${addUser.user.tag} составляет: ${bot.locale(user.coins)} 🍌**`)
        await bot.usersRep.save(user);
        message.channel.send(addEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'globalset',
    aliases: ['gset', 'глобалустановить', 'установитьглобал', 'густановить', 'густ', 'setbananas', 'setban', 'установитьбананы'],
    description: 'Изменение количества бананов',
    usages: { '!gset @user#0001 1050': 'Изменит количество бананов @user#0001 на 1.050 ' },
    category: 'Модерирование',
    owneronly: true
}; 