const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        let casinoEmbed = new Discord.RichEmbed()
            .setColor('8142EB')
            .setTitle('Казино')
        if (!args.join(' ')) {
            bot.sendErrEmbed(casinoEmbed, `Используйте ${bot.command} ставка`)
            return message.channel.send(casinoEmbed)
        }
        let num = bot.toNum(args.join(' '))
        if (!num || num <= 0) {
            bot.sendErrEmbed(casinoEmbed, `Используйте ${bot.command} ставка`)
            return message.channel.send(casinoEmbed)
        }
        let user = await bot.usersRep.findOne({ userid: message.author.id });
        if (num > user.coins) {
            bot.sendErrEmbed(casinoEmbed, `У вас недостаточно денег! Ваш баланс: ${bot.locale(user.coins)} $`)
            return message.channel.send(casinoEmbed)
        }
        let fruits = ['🍋', '🍇', '🍓', '🍒', '🍌'], // Чем больше фруктов тем меньше шанс 
            bar = ''
        for (let i = 0; i < 3; i++) {
            let b = Math.floor(Math.random() * (fruits.length - 0)) + 0;
            bar += fruits[b]
        }
        user.coins -= num;
        for (let i = 0; i < fruits.length; i++) {
            if (bar.indexOf(`${fruits[i]}${fruits[i]}${fruits[i]}`) != -1) {
                casinoEmbed.addField(`${message.author.tag}`, `🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы выиграли ${bot.locale(num * 5)} $ (x5)**`)
                user.coins += (num * 5);
                bot.addMark((num*5)>=100000,'💍',user,message);
                bot.addMark((num*5)>=5000000,'👑',user,message);
                bot.addMark((num*5)>=1000000000,'👨‍💼',user,message);
                await bot.usersRep.save(user);
                return message.channel.send(casinoEmbed);
            } if (bar.indexOf(`${fruits[i]}${fruits[i]}`) != -1) {
                casinoEmbed.addField(`${message.author.tag}`, `🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы выиграли ${bot.locale(num * 2)} $ (x2)**`)
                user.coins += (num * 2);
                bot.addMark((num*2)>=100000,'💍',user,message);
                bot.addMark((num*2)>=5000000,'👑',user,message);
                bot.addMark((num*2)>=1000000000,'👨‍💼',user,message);
                await bot.usersRep.save(user);
                return message.channel.send(casinoEmbed);
            } if (bar.startsWith(fruits[i]) && bar.endsWith(fruits[i])) {
                casinoEmbed.addField(`${message.author.tag}`, `🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы выиграли ${bot.locale(num * 2)} $ (x2)**`)
                user.coins += (num * 2);
                bot.addMark((num*2)>=100000,'💍',user,message);
                bot.addMark((num*2)>=5000000,'👑',user,message);
                bot.addMark((num*2)>=1000000000,'👨‍💼',user,message);
                await bot.usersRep.save(user);
                return message.channel.send(casinoEmbed);
            }

        }
        casinoEmbed.addField(`${message.author.tag}`, `🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы проиграли ${bot.locale(num)} $**`)
        await bot.usersRep.save(user);
        return message.channel.send(casinoEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'casino',
    aliases: ['cs', 'казино', 'слитьденьги'],
    description: 'Играть в казино на бананы',
    usages: { '!casino 5000': 'Сделать ставку 5000 🍌' },
    category: "Развлечения"
}; 