const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        let guild = await bot.guildsRep.findOne({ guildid: message.guild.id });

        let shopEmbed = new Discord.RichEmbed()
            .setColor('FFDD2E')
            .setTitle('Магазин ролей')

        let shopArray = guild.shop.split(',');
        if (shopArray[0] == '') {
            shopArray.shift()
            let text = shopArray.join(',')
            guild.shop = text;
            await bot.guildsRep.save(guild)
        }
        if (!args[0]) {
            if (shopArray.length > 0)
                for (let i = 0; i < shopArray.length; i++) {
                    let roleArray = shopArray[i].split(':');
                    let role = await message.guild.roles.get(roleArray[0])
                    shopEmbed.addField(`__**${i + 1}**__ | **Цена: ${bot.locale(roleArray[1])==0?'Бесплатно':bot.locale(roleArray[1])} $**`, `**${role}**`, true)
                }
            else
                shopEmbed.addField('Ваш магазин еще не настроен', '**Для добавления роли в магазин используйте: !shop add @role Цена**')
            return message.channel.send(shopEmbed)
        }
        if (bot.isNum(bot.toNum(args[0]))) {
            if (shopArray <= 0) {
                shopEmbed.addField('Ваш магазин еще не настроен', '**Для добавления роли в магазин используйте: !shop add @role Цена**')
                return message.channel.send(shopEmbed)
            }
            let num = bot.toNum(args[0])
            if (num <= 0 || num > shopArray.length)
                return bot.sendErrEmbed(new Discord.RichEmbed(), `Укажите число от 1 до ${shopArray.length}`, true, message);
            let roleArray = shopArray[num - 1].split(':')
            let price = roleArray[1];
            let localeUser = await bot.localeRep.findOne({ userid: message.author.id, guildid: message.guild.id });
            if (localeUser.coins < price)
                return bot.sendErrEmbed(new Discord.RichEmbed(), `У вас недостаточно денег! Для покупки этой роли требуется ${bot.locale(price)} $`, true, message);
            let role = await message.guild.roles.get(roleArray[0])
            if (message.member.roles.has(role.id))
                return bot.sendErrEmbed(new Discord.RichEmbed(), `У вас уже есть эта роль!`, true, message);
            localeUser.coins -= price
            await message.member.addRole(role);
            await bot.localeRep.save(localeUser)
            shopEmbed.addField(`${message.author.tag}`, `**Вы успешно купили роль ${role}**`);
            return message.channel.send(shopEmbed)

        }
        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (args[0].toLowerCase() == 'add') {
                if (!args[1] || !args[2]) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Использование !shop add @role Цена', true, message);
                let role = message.mentions.roles.first();
                let price = bot.toNum(args.slice(2).join(' '))
                if (!role || !price) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Использование !shop add @role Цена', true, message);
                if (shopArray.length >= 21)
                    return bot.sendErrEmbed(new Discord.RichEmbed(), `Максимальное количество ролей в магазине 21`, true, message);
                shopArray.push(`${role.id}:${price}`);
                let text = shopArray.join(',')
                shopEmbed.addField('Добавление роли', `**Роль ${role} добавлена в магазин!**`)
                guild.shop = text;
                await bot.guildsRep.save(guild)
                message.channel.send(shopEmbed)
            }
            if (args[0].toLowerCase() == 'remove') {
                if (!args[1]) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Использование !shop remove номер', true, message);
                let num = bot.toNum(args[1])
                if (!num) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Использование !shop remove номер', true, message);

                shopArray.splice(num - 1, 1);
                let text = shopArray.join(',')
                shopEmbed.addField('Удаление роли', `**Роль ${num} удалена из магазина**`)
                guild.shop = text;
                await bot.guildsRep.save(guild)
                message.channel.send(shopEmbed)
            }
            if (args[0].toLowerCase() == 'clear') {

                let text = '';
                shopEmbed.addField('Отчистка магазина', `**Ваш магазин был полностью отчищен**`)
                guild.shop = text;
                await bot.guildsRep.save(guild)
                message.channel.send(shopEmbed)
            }
        }

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'shop',
    aliases: ['магазин', 'магаз', 'роли', 'магазинролей', 'roleshop'],
    description: 'Магазин ролей',
    usages: { '!shop': 'Показать список продаваемых ролей на этом сервере', '!shop (номер)': 'Купить роль под каким либо номером', '!shop add @role цена': 'Добавить роль @role в магазин', '!shop remove (Номер)': 'Удалить роль из магазина', '!shop clear': 'Отчистить магазин' },
    category: 'Экономика'
}; 