//Завершено

const Discord = require('discord.js')
const sa = require('superagent')

exports.run = async (bot, message, args) => {
    var { body } = await sa.get(`https://randomfox.ca/floof/`)
    var fox = new Discord.RichEmbed()
        .setColor('#fadbc8')
        .setImage(body.image)
    message.channel.send(fox)
}
exports.help = {
    name: 'fox',
    aliases: ["лиса", "лис", "лисичка", 'лисенок', 'лисонька', 'лисы', 'лисеночки'],
    description: 'Получить рандомную фотку лисы',
    usages: { '!fox': 'Выдает вам самую красивую лисичку' },
    category: 'Развлечения'
}