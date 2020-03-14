const Discord = module.require('discord.js');
const request = module.require('request-promise');
const isgd = require('isgd');
module.exports.run = async (bot, message, args) => {
    try {
        let errEmbed = new Discord.RichEmbed()
        let website = args[0];
        if(!website){
            bot.sendErrEmbed(errEmbed, "Необходимо указать сайт!");
            return message.channel.send(errEmbed)
        }
        var my_msg = await message.channel.send(new Discord.RichEmbed().setTitle('Делаем запрос, ожидайте'))
        isgd.shorten(website, async function(res){
            let shEmbed = new Discord.RichEmbed()
            .setTitle(res)
            .setColor('RANDOM');
            await my_msg.edit(shEmbed)
        });


    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'shorten',
    aliases: ['sh','ыр', 'сократитьссылку', 'дерьмоанессылка'],
    description: 'Сократить ссылку',
    usages: { '!sh google.com': 'сокращает ссылку google.com' },
    category: 'Развлечения'
}; 