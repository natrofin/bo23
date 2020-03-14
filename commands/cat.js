const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (bot, message, args) => {
    var { body } = await sa.get(`http://aws.random.cat//meow`)
    var cat = new Discord.RichEmbed()
        .setColor('#fadbc8')
        .setImage(body.file)
    message.channel.send(cat)
}
exports.help = {
    name: 'cat',
    aliases: ["кошка", 'кот'],
    description: 'Получить рандомную фотку котика',
    usages: { '!cat': 'Выдает вам самого милого котика' },
    category: 'Развлечения'
}