const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        let user = await bot.usersRep.findOne({ userid: message.author.id }), works = bot.works;
        let hours = (user.workdate - Date.now()) / 1000 / 60 / 60, minutes = (user.workdate - Date.now()) / 1000 / 60, seconds = (user.workdate - Date.now()) / 1000;

        if (user.workdate > Date.now()) return bot.sendErrEmbed(new Discord.RichEmbed(), `**Вы уже поработали! Вы сможете работать снова через ${hours > 0 ? `${Math.floor(hours)} часов` : ''} ${minutes > 0 ? `${Math.floor(minutes - Math.floor(hours) * 60)} минут` : ''} ${seconds > 0 ? `${Math.floor(seconds - (Math.floor(minutes) * 60))} секунд` : ''}** `, true, message);
        let workEmbed = new Discord.RichEmbed()
            .setColor('65BDFF')
            .setTitle('Работа');
        user.coins += works[user.worklvl].coins;
        user.workcount++;
        user.workdate = Date.now() + 1000 * 60 * 60 * bot.workInterval;
        workEmbed.addField(`${message.author.tag} `, ` ** Вы поработали на работе __${works[user.worklvl].name}__ и заработали ${bot.locale(works[user.worklvl].coins)} 🍌** `)
        workEmbed.setFooter(`${works[user.worklvl + 1] && user.workcount <= works[user.worklvl + 1].xp ? `Осталось поработать ${bot.locale(works[user.worklvl + 1].xp - user.workcount + 1)} ${(works[user.worklvl + 1].xp - user.workcount + 1 + '').endsWith('2') || (works[user.worklvl + 1].xp - user.workcount + 1 + '').endsWith('3') || (works[user.worklvl + 1].xp - user.workcount + 1 + '').endsWith('4') ? 'раза' : 'раз'} Следующая должность "${works[user.worklvl + 1].name}"` : ''}`)
        if (works[user.worklvl + 1] && user.workcount > works[user.worklvl + 1].xp) {
            user.worklvl++;
            workEmbed.addField('Поздравляем!', '**Вы получили повышение**');
        };
        await bot.usersRep.save(user);
        await message.channel.send(workEmbed);
        let userzzz = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(true, '👷', userzzz, message);
        bot.usersRep.save(userzzz);
        
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'work',
    aliases: ['работа', 'работать', 'зарабатывать', 'hackme', 'дайтеденег'],
    description: 'Поработать на вашей работе',
    usages: { '!work': 'Вы поработаете на своей работе' },
    category: 'Экономика'
}
