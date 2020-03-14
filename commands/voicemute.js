const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let voicemutes = bot.voiceMutes,
            date = args[1] ? (ms(args.slice(1, 3).join(' ')) || ms(args.slice(1, 2).join(' '))) : undefined,
            reason = args.slice(1).join(' '),
            kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])),
            guild = await bot.guildsRep.findOne({ guildid: message.guild.id }),
            muteEmbed = new Discord.RichEmbed()
                .setColor('FF8A14')
                .setTitle('Блокировка войса')

        if (!kUser || kUser.id === message.guild.me.id) {
            bot.sendErrEmbed(muteEmbed, 'Пользователь не найден | Укажите пользователя через @')
            return message.channel.send(muteEmbed)
        };
        if (kUser.id == message.author.id) {
            bot.sendErrEmbed(muteEmbed, 'Вы не можете запретить говорить самому себе')
            return message.channel.send(muteEmbed)
        }
        let voicemuteRole = message.guild.roles.get(bot.guild.voicemute)
        if (!voicemuteRole) {
            voicemuteRole = await message.guild.createRole({
                name: "voiceMuted",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(voicemuteRole, {
                    SPEAK: false,
                });
            });
            guild.voicemute = voicemuteRole.id;
            await bot.guildsRep.save(guild);

        }
        if (kUser.roles.has(voicemuteRole.id)) {
            bot.sendErrEmbed(muteEmbed, 'Пользователь уже не может говорить')
            return message.channel.send(muteEmbed)
        }
        kUser.setMute(true);
        if (date)
            voicemutes[`${kUser.id}_${message.guild.id}`] = {
                time: Date.now() + date,
            }
        muteEmbed.addField(`**Администратор ${message.author.tag} запретил говорить в голосовых каналах ${kUser.user.tag}**`, `**Время блокировки голосового чата: ${date ? ms(date, { long: true }) : 'Навсегда'}**\n**Причина: ${reason}**`)
        kUser.addRole(voicemuteRole)
        await message.channel.send(muteEmbed).catch(err => { bot.logsErr(err) })
        await kUser.send(muteEmbed).catch(err => { bot.logsErr(err) })




    } catch (err) {
        bot.logsErr(err)
    }
}

module.exports.help = {
    name: 'voicemute',
    aliases: ['voicetempmute', 'войсмут', 'войсмьют', 'войсзатычка', 'закрыть рот'],
    description: 'Запрещает участнику говорить в голосовых каналах',
    usages: { '!voicemute @user#0001 1h': 'Запрещает @user#0001 говорить 1 час', '!voicemute @user#0001': 'Запрещает @user#0001 говорить навсегда' },
    category: 'Модерирование'
}