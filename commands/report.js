const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        let reason = args.slice(1).join(" ");
        let user = kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!user) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите пользователя', true, message);
        if (!reason) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Укажите текст жалобы', true, message);
        let channel = bot.guild.reportChannel;
        let guild = await bot.guildsRep.findOne({ guildid: message.guild.id });
        let reportsChannel = await message.guild.channels.get(channel)
        if (channel == 0 || !reportsChannel)
            await message.guild.createChannel(`reportschannel`, { type: 'text' }).then(async channel => {
                guild.reportChannel = channel.id
                await bot.guildsRep.save(guild);
                channel.overwritePermissions(message.guild.defaultRole, {
                    VIEW_CHANNEL: true,
                    CONNECT: false,
                });
                channel.setPosition(1);
                reportsChannel = channel

            });
        let reportEmbed = new Discord.RichEmbed()
            .setColor('E82105')
            .addField(`Новая жалоба`, `**${message.author} Пожаловался на: ${user}**`)
            .addField(`Текст жалобы:`, reason)
        await reportsChannel.send(reportEmbed)
        message.delete()
        let userzzzz = await bot.usersRep.findOne({ userid: message.author.id });
        bot.addMark(true, '⚜️', userzzzz, message);
        bot.usersRep.save(userzzzz);
        

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'report',
    aliases: ['rep', 'репорт', 'помогите'],
    description: 'Пожаловаться на участника',
    category: 'Модерирование',
    usages: { '!report @user#0001 text': 'Отправит жалобу на @user#0001 модераторам', '!report @user#0001 Плохо себя ведет': 'Отправит жалобу на @user#0001 модераторам (Плохо себя ведет)' }
}; 