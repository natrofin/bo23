const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        let clanName = 'Нету';
        let clanid = bot.dbUser.clanid;
        if (clanid === -1) {
            clanName = 'Нету'
        } else {
            let clan = await bot.clansRep.findOne({ id: clanid });
            clanName = clan.name;
        }
        let partner = bot.users.get(bot.dbUser.partner)
        let profileembed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURL)
            .setColor(bot.colors.AQUAMARINE)
            .setTitle(`**${message.author.username}**`)
            .addField('**💰 Баланс**', `**${bot.locale(bot.localeUser.coins)} $**`, true)
            .addField('**🔰 Лвл**', `**${bot.locale(bot.dbUser.lvl)}**`, true)
            .addField('**🚩 Варны**', `**${bot.localeUser.warns}**`)
            .addField('**⚔ Клан**', `**${clanName}**`, true)
            .addField('**💑 Партнер**', `**${partner ? partner.tag : 'Нету'}**`, true)
            .addField('**🍌 Бананов**', `**${bot.locale(bot.dbUser.coins)}**`)
            .addField('**⛏️ Работа**', `**${bot.works[bot.dbUser.worklvl].name}**`, true)
            .addField('**💵 Рубли **', `**${bot.dbUser.rubles} ₽**`,true)
            .addField('**🏅 Достижения**', `**${bot.dbUser.marks}**`)
            .setFooter(message.author.tag, message.author.avatarURL)
        await message.channel.send(profileembed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'profile',
    aliases: ['p', 'профиль', 'п'],
    description: 'Посмотреть ваш профиль',
    usages: { '!profile @user#0001': 'Покажет ваш профиль' },
    category: "Экономика"
}; 