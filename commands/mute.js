const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let mutes = bot.mutes,
            date = args[1] ? (ms(args.slice(1, 3).join(' ')) || ms(args.slice(1, 2).join(' '))) : undefined,
            kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            reason = args.slice(2).join(' '),
            guild = await bot.guildsRep.findOne({ guildid: message.guild.id }),
            muteEmbed = new Discord.RichEmbed()
                .setColor('FF8A14')
                .setTitle('Блокировка чата')

        if (!kUser || kUser.id === message.guild.me.id) {
            bot.sendErrEmbed(muteEmbed, 'Пользователь не найден | Укажите пользователя через @')
            return message.channel.send(muteEmbed)
        };
        if (kUser.id == message.author.id) {
            bot.sendErrEmbed(muteEmbed, 'Вы не можете запретить писать самому себе')
            return message.channel.send(muteEmbed)
        }
        let muteRole = message.guild.roles.get(bot.guild.muterole)
        if (!muteRole) {
            muteRole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
            guild.muterole = muteRole.id;
            await bot.guildsRep.save(guild);

        }
        if (kUser.roles.has(muteRole.id)) {
            bot.sendErrEmbed(muteEmbed, 'Пользователь уже не может писать')
            return message.channel.send(muteEmbed)
        }
        if (!reason) reason = 'Не указана';
        if (date)
            mutes[`${kUser.id}_${message.guild.id}`] = {
                time: Date.now() + date,
            }
        muteEmbed.addField(`**Администратор ${message.author.tag} запретил писать сообщения ${kUser.user.tag}**`, `**Время блокировки сообщений: ${date ? ms(date, { long: true }) : 'Навсегда'}**\n**Причина: ${reason}**`)
        kUser.addRole(muteRole)
        let user = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(true, '🤬', user, message);
        bot.usersRep.save(user);
        await message.channel.send(muteEmbed).catch(err => { bot.logsErr(err) })
        await kUser.send(muteEmbed).catch(err => { bot.logsErr(err) })




    } catch (err) {
        bot.logsErr(err)
    }
}

module.exports.help = {
    name: 'mute',
    aliases: ['tempmute', 'мут', 'мьют', 'затычка', 'убитьчтобыслетеласосальня'],
    description: 'Запрещает участнику писать сообщения',
    usages: { '!mute @user#0001 1h': 'Запрещает @user#0001 писать сообщения 1 час', '!mute @user#0001': 'Запрещает @user#0001 писать сообщения навсегда' },
    category: 'Модерирование'
}