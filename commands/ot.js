const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        let rUser = message.guild.member(message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.get(args[0]));
        let embed = new Discord.RichEmbed()
            .setTitle(`Ответ разработчика`)
            .setColor('RANDOM');
        if (!args[0] || !rUser) { bot.sendErrEmbed(embed, 'Пользователь не ответил на приглашение!', true, message); }
        let ot = args.slice(1).join(" ");
        embed.setDescription(`**${ot}**`);
        await rUser.send(embed);
        embed.setDescription(`**Сообщение доставлено ${rUser.user.tag}**`);
        await message.channel.send(embed);
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'reply',
    description: 'Команда для разработчиков для ответа вам',
    aliases: ['ot', 'ответить'],
    owneronly: true,
    category: "Разработка",
    usages: { '!ot #user0001 text': 'Отправит #user0001 в личные сообщения text' },
}; 