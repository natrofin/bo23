const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {

        let num1 = 1, num2 = 100;
        if (args[0]) {
            let editNum = bot.toNum(args[0])
            if (editNum)
                num2 = editNum
        }
        if (args[1]) {
            let editNum1 = bot.toNum(args[0])
            let editNum2 = bot.toNum(args[1])
            if (editNum1)
                num1 = editNum1
            if (editNum2)
                num2 = editNum2
        }
        const embed = new Discord.RichEmbed()
            .setColor("#70FF0D")
            .setTitle(`Рандомное число: ${Math.floor(Math.random() * (num2 - num1)) + num1}`)
        message.channel.send(embed)
    } catch (err) {
        bot.logsErr(err)
    }
};



module.exports.help = {
    name: 'roll',
    aliases: ['рол', 'ролл', 'рандом', 'число', 'решитьспор', 'заролить', 'хахахядединсайд'],
    description: 'Генерирует рандомное число',
    usages: { '!roll': 'Выдаст число от 1 до 100', '!roll 50': 'Выдаст число от 1 до 50', '!roll 40 5000': 'Выдаст число от 40 до 5000' },
    category: "Развлечения"
}; 