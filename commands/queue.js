const Discord = module.require('discord.js');
const YTDL = require('ytdl-core');
module.exports.run = async (bot, message, args) => {
    try {
        var server = bot.servers[message.guild.id];

        if (!server || !server.queue|| !server.queue[0] || !server.dispatcher) return bot.sendErrEmbed(new Discord.RichEmbed, 'Нет треков в очереди', true, message);
        let i = 0, embed = new Discord.RichEmbed().setColor('#8F00FF').setTitle('🎵 Очередь треков');

        for (let i = 0; i < server.queue.length; i++) {
            let info = await YTDL.getInfo(server.queue[i].url);
            await embed.addField(server.queue[i].author, `**${info.title}**`, true);
        }

        await message.channel.send(embed);

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'queue',
    aliases: ['очередь', 'очередб',],
    description: 'Показать очередь',
    usages: { '!queue': 'Показать список песен в очереди' },
    category: 'Музыка',
}; 