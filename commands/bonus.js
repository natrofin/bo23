const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    try {
        let bonusembed = new Discord.RichEmbed()
            .setColor('FFDC4C')
            .setTitle('Бонус')
        if (bot.dbUser.bonustime > Date.now()) {
            return bot.sendErrEmbed(bonusembed, `Вы можете получить бонус снова через ${ms((bot.dbUser.bonustime - Date.now()))}`, true, message)
        }
        bot.dbUser.coins += bot.bonus
        bot.localeUser.coins += bot.bonus;
        bot.dbUser.bonustime = Date.now() + 1000 * 60 * bot.bonusInterval;
        bonusembed.addField(message.author.tag, `**Вы получили ${bot.locale(bot.bonus)} $**`)
        bot.addMark(true,'📈',bot.dbUser,message)
        return message.channel.send(bonusembed);
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'bonus',
    aliases: ['b', 'бонус', '$','timely'],
    description: 'Добавляет вам деньги раз в 12 часов',
    usages: { '!bonus': `Добавит вам бонусные деньги` },
    category: 'Экономика'
}