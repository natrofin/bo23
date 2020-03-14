const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {

        let inviteLink;
        await bot.generateInvite(["ADMINISTRATOR"]).then(link => {
            inviteLink = link;
        });

        let inviteEmbed = new Discord.RichEmbed()
            .setColor('A8FF4D')
            .addField(`__**${bot.user.username}**__`, `**🌐 | Серверов: ${bot.guilds.size.toLocaleString()}\n👥 | Пользователей: ${bot.users.size.toLocaleString()}**\n**🗨 | Каналов: ${bot.channels.size.toLocaleString()}**\n**⚙ | Кол-во команд: ${bot.commands.size.toLocaleString()}**\n\n***[Пригласить бота](${inviteLink})\n\n[Официальный сервер ✅](${bot.OFFGUILD})***`)
        message.channel.send(inviteEmbed)
        let user = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(true, '🔑', user, message);
        bot.usersRep.save(user);



    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'invite',
    aliases: ['пригласить', 'addbot', 'приглашение'],
    description: 'Пригласить бота на свой сервер',
    usages: { '!invite': 'Получить ссылку приглашение' },
    category: "Информация о боте"
}; 