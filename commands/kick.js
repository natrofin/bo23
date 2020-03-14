const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('KICK_MEMBERS')) return;
        let member = message.mentions.members.first() || message.guild.members.get(args[0]),
            reason = args.slice(1).join(' '),
            kickembed = new Discord.RichEmbed()
                .setColor('FF8A14')
                .setTitle('Кик');
        if (!member || member.id === message.guild.me.id) {
            bot.sendErrEmbed(kickembed, 'Пользователь не найден | Укажите пользователя через @')
            return message.channel.send(kickembed)
        } else if (!reason) reason = 'Не указана'
        banembed.addField(`**Администратор ${message.author.tag} кикнул ${member.user.tag}**`, `**Причина кика: ${reason}**`)
        await member.send(kickembed).catch(err => { bot.logsErr(err) })
        await message.channel.send(kickembed).catch(err => { bot.logsErr(err) })
        await member.kick(reason).catch(err => { bot.logsErr(err) })

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'kick',
    aliases: ['кик', 'кикнуть', 'закикать', 'кикуть', 'кицк'],
    description: 'Выгнать/Кикнуть участника с сервера',
    category: 'Модерирование',
    usages: { '!kick @user#0001 Причина': 'кикнуть участника user#0001 без причины', '!kick @user#0001 не оплатил налог': 'кикнуть участника user#0001 по причине `не оплатил налог`' }
}; 