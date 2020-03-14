const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
    try {
        let user = kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!user) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите пользователя', true, message);
        if (bot.dbUser.coins < 15)
            return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас недостаточно бананов! 🍌 Для этого действия требуется 10 бананов', true, message);
        bot.dbUser.coins -= 15;
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/slap");
        const embed = new Discord.RichEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} ударил(а) ${message.mentions.users.first().username}`)
            .setImage(body.url)
        message.channel.send(embed)
    } catch (err) {
        bot.logsErr(err)
    }
};



module.exports.help = {
    name: 'slap',
    aliases: ['шлепнуть', 'ударить', 'слапнуть'],
    description: 'Ударить пользователя (Стоимость 15 бананов)',
    usages: { '!slap @user#0001': 'Ударит @user#0001 ♥' },
    category: "Развлечения"
}; 