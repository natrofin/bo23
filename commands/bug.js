const Discord = module.require('discord.js');
const request = module.require('request-promise');
module.exports.run = async (bot, message, args) => {
    try {

        let bug = args.join(' ')
        let bugEmbed = new Discord.RichEmbed()
            .setColor('EB40FF')
            .setTitle('Ваш баг отправлен в службу поддержки')
        if (!bug) {
            bot.sendErrEmbed(bugEmbed, 'Укажите описание бага')
            return message.channel.send(bugEmbed)
        }
        if (bug.length > 1920) return;
        message.delete()
        let bugText = `
**Новый баг от __${message.author.tag}__ [${message.author.id}]**

**Описание бага:**
${bug}`
        for (let i = 0; i < global.owners.length; i++) {
            let owner = await bot.users.get(global.owners[i]);
            await owner.send(bugText);
        }
        await message.channel.send(bugEmbed)
        let user = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(true,'🆘',user,message)
        bot.usersRep.save(user);

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'bug',
    aliases: ['баг', 'чтоетозабред', 'сломалбота.com'],
    description: 'Зарепортить баг в боте',
    usages: { '!bug ошбибка': 'Отправит ошибку создателям бота' },
    category: 'Разработка'
}; 