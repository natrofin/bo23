const Discord = module.require('discord.js');
const Minesweeper = require('discord.js-minesweeper');


module.exports.run = async (bot, message, args) => {
    try {
        if (bot.dbUser.coins < 5)
            return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас недостаточно бананов! 🍌 Для игры требуется 5 бананов', true, message);
        let rows = 10, columns = 10, mines = Math.floor(Math.random() * (((rows * columns) / 2 - 1) - (rows > columns ? rows : columns))) + (rows > columns ? rows : columns);
        if (args[0] && bot.toNum(args[0]))
            if (bot.toNum(args[0]) <= 12 && bot.toNum(args[0]) >= 3)
                rows = bot.toNum(args[0])
            else return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите высоту от 3 до 12', true, message);
        if (args[1] && bot.toNum(args[1]))
            if (bot.toNum(args[1]) <= 12 && bot.toNum(args[1]) >= 3)
                columns = bot.toNum(args[1])
            else return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите ширину от 3 до 12', true, message);
        if (args[2] && bot.toNum(args[2]))
            if (bot.toNum(args[2]) <= Math.floor((rows * columns) / 2 - 1) && bot.toNum(args[2]) >= 1)
                mines = bot.toNum(args[2])
            else return bot.sendErrEmbed(new Discord.RichEmbed(), `Укажите количество мин от 1 до ${Math.floor((rows * columns) / 2 - 1)}`, true, message);

        const minesweeper = new Minesweeper({ rows, columns, mines });
        const matrix = minesweeper.start()
        if (matrix == null) {
            return bot.sendErrEmbed(new Discord.RichEmbed(), `Произошла неизвестная ошибка`, true, message);
        }
        message.channel.send(`**${message.author} Ваша игра готова! Поле ${rows}x${columns} мин ${mines}**\n` + matrix);
        bot.dbUser.coins -= 5;
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'minesweeper',
    aliases: ['ms', 'сапер', 'минер'],
    description: 'Поиграть в игру "Сапер", стоимость 5 бананов',
    usages: { '!ms': 'Запускает игру сапер.Поле 10x10 мин Рандом', '!ms 8 6 15': 'Запускает игру сапер. Поле 8x6 мин 15', 'Синтаксис': '!ms {высота} {ширина} {мины}' },
    category: "Развлечения"
}; 