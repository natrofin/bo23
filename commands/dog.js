//Завершено

const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (bot, message, args) => {
    var { body } = await sa.get(`https://random.dog/woof.json`)
    var dog = new Discord.RichEmbed()
        .setColor('#fadbc8')
        .setImage(body.url)
    message.channel.send(dog)
}
exports.help = {
    name: 'dog',
    aliases: ["собака", 'пес', 'щенок'],
    description: 'Получить рандомную фотку собаки',
    usages: { '!dog': 'Выдает вам самую крутую собачку' },
    category: 'Развлечения'
}