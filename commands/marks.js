const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        const marksEmbed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`${message.author.tag} Ваши достижения:`)
        let x = 0, y = 0;
        for (let key in bot.marks) {
            if (bot.dbUser.marks.includes(key)) {
                x++
            }
            y++
        }
        let gettedemoji = args.join(' ').replace(/ /g,'')
        if (!gettedemoji)
            marksEmbed.addField(message.author.tag, `**${bot.dbUser.marks}**`)
        else {
            let emoji = bot.marks[gettedemoji];
            if (!emoji) return bot.sendErrEmbed(new Discord.RichEmbed(), `Достижение не найдено`, true, message);
            if(!bot.dbUser.marks.includes(emoji)) return bot.sendErrEmbed(new Discord.RichEmbed(), `У вас нет этого достижения`, true, message);
            marksEmbed.addField(`${gettedemoji} ${emoji.name}`,`**${emoji.description}**`)

        }
        marksEmbed.setFooter(`Разблокировано ${x} достижений из ${y}. Для подробностей !mark [достижение]`)
        message.channel.send(marksEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'marks',
    aliases: ['achievement', 'марки', 'достижения', 'achievements', 'mark'],
    description: 'Покажет ваши достижения',
    usages: { '!marks': 'Покажет все ваши достижения', '!mark 🔰': 'Покажет информацию о достижении 🔰' },
    category: "Развлечения"
}; 