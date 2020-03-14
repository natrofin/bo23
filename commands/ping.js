const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    try {
        let embed = new Discord.RichEmbed()
            .setColor('FFA947')
            .setTitle('🏓 Ping!')
        const msg = await message.channel.send(embed);
        embed.setTitle(`🏓 Pong! (Время отвравки: ${msg.createdTimestamp - message.createdTimestamp}ms. 💙 Ping: ${Math.round(bot.ping)}ms.)`)
        msg.edit(embed);
        let user = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(true, '⁉️', user, message);
        bot.usersRep.save(user);
        
    } catch (e) {
        bot.logsErr(e)
    }
}
module.exports.help = {
    name: 'ping',
    aliases: ['пинг'],
    description: 'Пинг бота',
    usages: { '!ping': `Покажет пинг бота` },
    category: 'Информация о боте'
};