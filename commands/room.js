const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        //message.channel.send(new Discord.RichEmbed().setImage('https://i.fiery.me/5CSve.png').setTitle('Напишите в следущен сообщении айди категории').setDescription('Если у вас нет кнопки `Copy ID` или `Скопировать ID` перейдите в настройки пользователя -> Внешний вид -> Режим разработчика, Включите эту опцию').setColor('RANDOM'));
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Мне нужно право `Управление каналами` для выполнения этой команды!');
        let category = await message.guild.createChannel('Приватные каналы', { type: 'category' });
        let creation_channel = await message.guild.createChannel('Создать канал', { type: 'voice', parent: category });
        await creation_channel.setUserLimit(2);
        bot.guild.privateChannel = creation_channel.id;
        await bot.guildsRep.save(bot.guild);
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'rooms',
    aliases: ['room', 'комнаты', 'privaterooms', 'приватныекомнаты', 'voicerooms','voiceroom'],
    description: 'Создает канал для создания приватных комнат',
    usages: { '!rooms': 'Создаст канал для создания приватных комнат' },
    category: 'Модерирование'
}; 