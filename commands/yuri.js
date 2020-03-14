const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
    try {
        if (message.channel.nsfw == false) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Использование 18+ команд только в nsfw чатах', true, message);
        if (bot.dbUser.coins < 25)
            return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас недостаточно бананов! 🍌 Для этого действия требуется 10 бананов', true, message);
        bot.dbUser.coins -= 25;
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/yuri");
        const embed = new Discord.RichEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username}`)
            .setImage(body.url)
        message.channel.send(embed)
    } catch (err) {
        bot.logsErr(err)
    }
};



module.exports.help = {
    name: 'yuri',
    aliases: ['юри', 'лесбиянки', 'лесби'],
    description: 'Покажет картинки 18+ (Стоимость 25 бананов)',
    usages: { '!yuri': 'NSFW NSWF NSFW' },
    category: "18+"
}; 