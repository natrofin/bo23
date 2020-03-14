const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        message.guild.channels.forEach(async (channel) => {
            channel.overwritePermissions(message.guild.defaultRole, {
                VIEW_CHANNEL: false
            });
        });
        message.channel.overwritePermissions(message.guild.defaultRole, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false
        });
        let verifyRole = await message.guild.createRole({
            name: "Verified",
            color: "#000000",
        });
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(verifyRole, {
                VIEW_CHANNEL: true
            });
        });
        message.channel.overwritePermissions(verifyRole, {
            VIEW_CHANNEL: false
        });
        message.channel.send(new Discord.RichEmbed().setColor('2CE871').setTitle(`Добро пожаловать на ${message.guild.name}\nДля доступа на сервер нажмите ✅`)).then(async msg => {
            let guild = await bot.guildsRep.findOne({ guildid: message.guild.id });
            await msg.react('✅')
            guild.verifymessage = `${msg.id},${verifyRole.id},${message.channel.id}`;
            await bot.guildsRep.save(guild);
        });

    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'verification',
    aliases: ['verify', 'проверка', 'антибот'],
    description: 'Для доступа на сервер надо поставить реакцию',
    usages: { '!verification': 'Добавить сообщение с реакцией' },
    category: 'Модерирование'
}; 