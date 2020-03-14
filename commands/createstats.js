const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
        let createstatsEmbed = new Discord.RichEmbed()
            .setColor('46DFFF')
            .setTitle('Статистика')
        let guild = await bot.guildsRep.findOne({ guildid: message.guild.id });
        await message.guild.createChannel(`Количество ботов: ${message.member.guild.members.filter(m => m.user.bot).size}`, { type: 'voice' }).then(channel => {
            guild.botcount = channel.id
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            });
            channel.setPosition(1);
        });
        await message.guild.createChannel(`Всего участников: ${message.member.guild.memberCount}`, { type: 'voice' }).then(channel => {
            guild.userscount = channel.id
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            });
            channel.setPosition(1);
        });
        await message.guild.createChannel(`Голосовой онлайн: ${message.member.guild.members.filter(m => m.voiceChannel).size}`, { type: 'voice' }).then(channel => {
            guild.voiceonline = channel.id
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: true,
                CONNECT: false,
            });
            channel.setPosition(1);

        });
        await bot.guildsRep.save(guild);
        createstatsEmbed.addField(message.author.tag, '**Статистика была успешно создана**')
        message.channel.send(createstatsEmbed);
    } catch (err) {
        bot.logsErr(err)
    }
}
module.exports.help = {
    name: 'createstats',
    aliases: ['createstats', 'addstats', 'channelstats', 'voiceonline', 'голосовойонлайн',],
    description: 'Создает статистику из каналов на вашем сервере',
    usages: { '!createstats': 'Добавляет статистику на ваш сервер' },
    category: 'Модерирование'
}
