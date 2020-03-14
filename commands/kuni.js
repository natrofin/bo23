const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
    try {
        if (message.channel.nsfw == false) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Использование 18+ команд только в nsfw чатах', true, message);
        let user = kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!user) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите пользователя', true, message);
        if (bot.dbUser.coins < 100)
            return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас недостаточно бананов! 🍌 Для этого действия требуется 10 бананов', true, message);
        bot.dbUser.coins -= 100;
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/kuni");
        const embed = new Discord.RichEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} 😏 ${user.user.tag}`)
            .setImage(body.url)
        message.channel.send(embed)
    } catch (err) {
        bot.logsErr(err)
    }
};



module.exports.help = {
    name: 'kuni',
    aliases: ['куни'],
    description: 'Сделает куни пользователю (Стоимость 100 бананов) ',
    usages: { '!kuni': 'NSFW NSWF NSFW' },
    category: "18+"
}; 