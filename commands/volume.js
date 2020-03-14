const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!bot.servers[message.guild.id] || !bot.servers[message.guild.id].queue || !bot.servers[message.guild.id].queue[0]) return bot.sendErrEmbed(new Discord.RichEmbed, 'Треков не обнаружено', true, message);
        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return bot.sendErrEmbed(new Discord.RichEmbed, 'Вы не можете управлять музыкой с другого канала', true, message);
        if (!args[0]) return bot.sendErrEmbed(new Discord.RichEmbed, 'Укажите громкость', true, message);

        let volume = bot.toNum(args[0]);
        if (!volume || volume < 0) return bot.sendErrEmbed(new Discord.RichEmbed, 'Укажите громкость от 0 до ∞', true, message);

        bot.servers[message.guild.id].dispatcher.setVolume(volume / 100);

        message.channel.send(new Discord.RichEmbed().setColor('#8F00FF').setTitle(`🎵 Вы установили громкость музыки на ${volume}`))

    } catch (e) {
        bot.logsErr(e)
    }
}
module.exports.help = {
    name: 'volume',
    aliases: ['звук', 'громкость', 'чикибамбони'],
    description: 'Изменить громкость музыки',
    usages: { '!volume громкость': 'Увеличивает громкость' },
    category: 'Музыка'
};