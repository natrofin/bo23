const Discord = module.require('discord.js');
const { inspect } = module.require('util');
module.exports.run = async (bot, message, args) => {
    try {
        if (!args[0]) return message.channel.send('Я не вижу код. Я не маг, чтобы делать что-то из ничего.');
        try {
            const evaled = await eval(args.join(' '));
            await message.channel.send(inspect(evaled, {depth: 0, maxArrayLength: 50}).replace(bot.token, 'undefined'), {code: 'js'}).catch(() => {});
            if (!message.deleted) message.react('✅');
        }
        catch (error) {
            if (!message.deleted) message.react('❌');
            await message.channel.send(error, {code: 'js'}).catch(() => {});
        }
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'eval',
    description: 'выполняет команду через node и выводит результат, если он меньше 2000 символов.',
    aliases: ['>'],
    owneronly: true,
    category: "Разработка",
    usages: {'bоt.token': 'помогает избавить вас от лишних проблем. И от лишних серверов', "bot.users.forEach(u => u.send('У вас новый уровень на сервере!'))": 'включает режим MEE6'},
}; 