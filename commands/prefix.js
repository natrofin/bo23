const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let prefix = args.join(' ').replace(/ /g,''),
            prefixEmbed = new Discord.RichEmbed()
                .setColor('58E88F')
        if (!prefix || prefix.length == 0 || prefix.length > 3) return bot.sendErrEmbed(new Discord.RichEmbed(), `**Укажите префикс (Не более 3 символов)**`, true, message);
        bot.guild.prefix = prefix;
        prefixEmbed.setTitle(`Ваш префикс изменен на ${prefix}`);
        return message.channel.send(prefixEmbed);

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'prefix',
    aliases: ['customprefix', 'px', 'префикс', 'сас'],
    description: 'Изменить префикс бота',
    category: 'Модерирование',
    usages: { '!prefix @': 'Изменит префикс бота на @' }
}; 