const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.RichEmbed()
            .setAuthor("Показатели бота")
            .setColor("#a7f442")
            .setThumbnail('https://discordemoji.com/assets/emoji/3619_discord_online.png')
            .setTimestamp()
            .addField("**⭕ | Использование памяти**", `**${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB**`, true)
            .addField("**🕑 | Uptime**", `**${duration}**`, true)
            .addField("**👥 | Пользователей**", `**${bot.users.size.toLocaleString()}**`, true)
            .addField("**🌐 | Серверов**", `**${bot.guilds.size.toLocaleString()}**`, true)
            .addField("**🗨 | Каналов**", `**${bot.channels.size.toLocaleString()}**`, true)
            .addField("**⚙ | Кол-во команд**", `**${bot.commands.size.toLocaleString()}**`, true)
            .addField("**💡 | Discord.js**", `**v${version}**`, true)
            .setFooter("Автор команды: 3ефирка❤");

        message.channel.send(embed);
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'botstats',
    aliases: ['bs', 'статистика', 'ботстат'],
    description: 'Статистика бота',
    usages: { '!botstats': `Покажет статистику бота` },
    category: 'Информация о боте'
}