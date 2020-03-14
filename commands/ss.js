const Discord = module.require('discord.js');
const request = module.require('request-promise');
module.exports.run = async (bot, message, args) => {
    try {
        let errEmbed = new Discord.RichEmbed()
        let website = args[0];
        if(!website){
            bot.sendErrEmbed(errEmbed, "Необходимо указать сайт!");
            return message.channel.send(errEmbed)
        }
        var my_msg = await message.channel.send(new Discord.RichEmbed().setTitle('Делаем запрос, ожидайте'))
        try{
            let headers = {website: website}
            let res = await  request('http://magmachain.herokuapp.com/api/v1', {headers: headers, json: true});
            if(res.snapshot == undefined || res.website == undefined){
                bot.sendErrEmbed(errEmbed, "Похоже что сервис не работает, попробуйте через пару минут");
                return my_msg.edit(errEmbed);
            }
            let ssEmbed = new Discord.RichEmbed()
            .setTitle(res.website)
            .setImage(res.snapshot)
            .setColor('RANDOM');
            await my_msg.edit(ssEmbed)
        }catch(e){
            bot.sendErrEmbed(errEmbed, "Похоже что сервис не работает, попробуйте через пару минут");
            return my_msg.edit(errEmbed);
        }

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'ss',
    aliases: ['ыы', 'скриншот', 'сайт'],
    description: 'Сделать снимок сайта',
    usages: { '!ss google.com': 'покажет страницу сайта google.com' },
    category: 'Развлечения'
}; 