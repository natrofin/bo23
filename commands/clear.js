const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        let clearmsgs = bot.toNum(args[0])
        let clearembed = new Discord.RichEmbed()
            .setColor('FFC194')
        if (!clearmsgs) {
            clearmsgs = 5
            message.channel.bulkDelete(Math.floor(clearmsgs)).then(async () => {
                clearembed.setTitle(`Успешно отчищенно **${clearmsgs}** сообщений `)
                await message.channel.send(clearembed)

            }).catch(async err => {
                if (err.message == 'You can only bulk delete messages that are under 14 days old.') {
                    bot.sendErrEmbed(clearembed, `В диапозоне **${clearmsgs}** есть сообщения старше 14 дней`)
                    return await message.channel.send(clearembed)
                }
            });
        } else {
            if (clearmsgs > 100 || clearmsgs < 1) {
                bot.sendErrEmbed(clearembed, `Укажите число меньше 100 и больше 1`)
                return await message.channel.send(clearembed)
            }
            if (clearmsgs == 1) clearmsgs = 2
            message.channel.bulkDelete(Math.floor(clearmsgs)).then(async () => {
                clearmsgs = 1
                clearembed.setTitle(`Успешно отчищенно **${clearmsgs}** сообщений `)
                await message.channel.send(clearembed)

            }).catch(async err => {
                if (err.message == 'You can only bulk delete messages that are under 14 days old.') {
                    bot.sendErrEmbed(clearembed, `В диапозоне **${clearmsgs}** есть сообщения старше 14 дней`)
                    return await message.channel.send(clearembed)
                }
            });
        }

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'clear',
    aliases: ['сдуфк', 'clr', 'отчистка', 'чистить', 'чистиговновилкой'],
    description: 'Отчистить чат',
    category: 'Модерирование',
    usages: { '!clear 40': 'Отчистит 40 сообщений в чате' }
}; 