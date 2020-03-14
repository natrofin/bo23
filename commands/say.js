const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        let botmessage = args.join(' ');
        if (!botmessage) return;
        if (message.member.hasPermission('MANAGE_MESSAGES')) message.delete().catch();
        await message.channel.send(botmessage);

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'say',
    aliases: ['сказать', 'скажи', 'сей', 'сау', 'скажиплиз'],
    description: 'Отправить сообщение от имени бота',
    usages: { '!say Сообщение': 'Бот скажет: Сообщение' },
    category: 'Модерирование'
}; 