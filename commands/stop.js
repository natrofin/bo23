const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!bot.servers[message.guild.id] || !bot.servers[message.guild.id].dispatcher) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Нет треков в очереди!', true, message);
        bot.servers[message.guild.id].dispatcher.end()
        bot.servers[message.guild.id].queue = []
        bot.servers[message.guild.id].dispatcher = ''
        message.channel.send(new Discord.RichEmbed().setColor('#8F00FF').setTitle('🎵 Музыка остановлена'))
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'stop',
    aliases: ['st', 'ые', 'стоп', 'стопнуть'],
    description: 'Выключить музыку',
    usages: { '!stop': 'Стопнуть музыку' },
    category: 'Музыка'
}; 