const Discord = require('discord.js');
// lvl 15 10.000
module.exports.run = async (bot, message, args) => {
    try {
        const MarryEmbed = new Discord.RichEmbed()
            .setColor("#F430FF")
            .setTitle(`Партнер`);
        let partner = bot.users.get(bot.dbUser.partner), sendUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])), usr = await bot.usersRep.findOne({ userid: message.author.id });
        switch (args[0]) {
            case 'send':
                if (bot.dbUser.lvl < 15) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Отправлять предложения можно с 15 уровня', true, message);
                if (bot.dbUser.partner != '0') return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас уже есть партнер', true, message);
                if (!sendUser) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите пользователя', true, message);
                let sUserDB = await bot.usersRep.findOne({ userid: sendUser.id });
                if (!sUserDB) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Пользователь не найден в базе данных', true, message)
                if (sUserDB.partner != '0') return bot.sendErrEmbed(new Discord.RichEmbed(), 'У пользователя уже есть партнер', true, message);
                if (usr.coins < 15000) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Для отправки предложения надо 15.000', true, message);
                if (bot.dbUser.sended != '0') return bot.sendErrEmbed(new Discord.RichEmbed(), `Вы уже оправили запрос! Для отмены используйте ${bot.command} cancel`, true, message)
                if (sUserDB.senders.indexOf(message.author.id) != -1) return bot.sendErrEmbed(new Discord.RichEmbed(), `Вы уже отправили запрос этому человеку`, true, message)
                let partCount = sUserDB.senders.split(',')
                if (partCount.length >= 5) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Пользователь уже имеет максимальное количество предложений', true, message)
                if (sUserDB.senders.length <= 2)
                    sUserDB.senders = message.author.id;
                else
                    sUserDB.senders += `,${message.author.id}`
                usr.sended = sendUser.id;
                usr.coins -= 15000;
                await bot.usersRep.save(usr);
                await bot.usersRep.save(sUserDB);
                MarryEmbed.setTitle(`Вы успешно отправили предложение ${sendUser.user.tag}`);
                return await message.channel.send(MarryEmbed)
            case 'cancel':
                if (bot.dbUser.sended == '0') return bot.sendErrEmbed(new Discord.RichEmbed(), 'Вы не отправляли предложений', true, message);
                usr.sended = '0';
                let sUserDB1 = await bot.usersRep.findOne({ userid: bot.dbUser.sended });
                let sendersArray = sUserDB1.senders.split(',');
                sendersArray.splice(sendersArray.indexOf(message.author.id), 1)
                let c = sendersArray.join(',')
                sUserDB1.senders = c;
                await bot.usersRep.save(usr)
                await bot.usersRep.save(sUserDB1)
                MarryEmbed.setTitle('Вы успешно отменили предложение')
                return message.channel.send(MarryEmbed)
            case 'senders':
                if (bot.dbUser.senders.length <= 2) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Вам никто не отправлял предложение', true, message);
                let usersArr = bot.dbUser.senders.split(',')
                let txt = '';
                for (let i = 0; i < usersArr.length; i++) {
                    let getted = await bot.users.get(usersArr[i])
                    txt += `**1.${getted.tag}**`
                }
                MarryEmbed.addField('Список предложений:', txt);
                MarryEmbed.setFooter('Для принятия введите !marry accept номер')
                return message.channel.send(MarryEmbed)
            case 'clear':
                if (usr.senders.length <= 2) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Вам никто не отправлял предложение', true, message);
                let sendersArr = usr.senders.split(',');
                for (let i = 0; i < sendersArr.length; i++) {
                    let curUser = await bot.usersRep.findOne({ userid: sendersArr[i] });
                    curUser.sended = '0';
                    await bot.usersRep.save(curUser);
                }
                usr.senders = '';
                await bot.usersRep.save(usr);
                MarryEmbed.setTitle('Вы успешно отчистили список предложений')
                return message.channel.send(MarryEmbed);
            case 'accept':
                if (bot.dbUser.senders.length <= 2) return bot.sendErrEmbed(new Discord.RichEmbed(), `У вас нет предложений`, true, message);
                if (!args[1]) return bot.sendErrEmbed(new Discord.RichEmbed(), `Укажите число от 1 до ${usr.senders.split(',').length}. Чтобы посмотреть список партнеров введите !marry senders`, true, message);
                let acceptNum = bot.toNum(args[1])
                if (!acceptNum || acceptNum == 0 || acceptNum > usr.senders.split(',').length) return bot.sendErrEmbed(new Discord.RichEmbed(), `Укажите число от 1 до ${usr.senders.split(',').length}. Чтобы посмотреть список партнеров введите !marry senders`, true, message);
                let sendersArr2 = usr.senders.split(',');
                let acceptUser = sendersArr2[acceptNum - 1];
                for (let i = 0; i < sendersArr2.length; i++) {
                    let curUser1 = await bot.usersRep.findOne({ userid: sendersArr2[i] });
                    curUser1.sended = '0';
                    await bot.usersRep.save(curUser1);
                }
                let marryUser = await bot.usersRep.findOne({ userid: acceptUser });
                marryUser.partner = message.author.id;
                marryUser.senders = '';
                usr.partner = acceptUser;
                usr.senders = '';
                await bot.usersRep.save(usr);
                await bot.usersRep.save(marryUser);
                let sUserz = await bot.users.get(acceptUser);
                MarryEmbed.setTitle(`Вы успешно приняли предложение от ${sUserz.tag}`)
                return message.channel.send(MarryEmbed)
            case 'divorce':
                let activePartner = await bot.usersRep.findOne({ userid: usr.partner });
                activePartner.partner = '0';
                usr.partner = '0';
                await bot.usersRep.save(activePartner);
                await bot.usersRep.save(usr);
                MarryEmbed.setTitle('Как жаль но вы развелись с своим партнером! Будем надеятся вы найдете себе лучше');
                return message.channel.send(MarryEmbed);

            default: if (!partner)
                MarryEmbed.setTitle('У вас нет партнера')
            else
                MarryEmbed.addField('Ваш партнер:', `**${partner.tag}**`)
        }
        message.channel.send(MarryEmbed)
    } catch (err) {
        bot.logsErr(err)
    }
};

module.exports.help = {
    name: 'marry',
    aliases: ['свадьба', 'пожениться', 'замуж', 'жена', 'муж', 'гейскаясвадьба'],
    description: 'Ваш партнер',
    usages: { '!marry': 'Покажет вашего партнера', '!marry send @user#0001': 'Предложить стать партнером @user#0001', '!marry senders': 'Посмотреть список предложений', '!marry accept [num]': 'Принять предложение от пользователя', '!marry cancel': 'Отменяет текущий запрос', '!marry clear': 'Отчистить список предложений', '!marry divorce': 'Развестись с вашим любимым наилучшим партнером' },
    category: "Развлечения"
}; 