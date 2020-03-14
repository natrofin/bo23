const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        let server = bot.servers[message.guild.id];
        if (!server || !server.dispatcher) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Нет треков в очереди!', true, message);
        if (!server.queue[0]) {
            return message.react('❌')
        }
        server.dispatcher.end();
        bot.addMark(true, '⏩', bot.dbUser, message);
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'skip',
    aliases: ['s', 'ы', 'скип', 'скипнуть'],
    description: 'Пропустить трек',
    usages: { '!skip': 'Пропустить трек' },
    category: 'Музыка'
}; 