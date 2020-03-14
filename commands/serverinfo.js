const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {

        async function regionToString() {
            //console.log(message.guild.region)
            regions = {
                'russia': "Россия",
                'europe': 'Европа',
                'brazil': 'Бразилия',
                'hongkong': 'Хонг Конг',
                'india': 'Индия',
                'japan': 'Япония',
                'singapore': 'Сигнапор',
                'southafrica': 'Западная африка',
                'sydney': 'Сидней',
                'us-central': 'США(центарльная)',
                'us-east': 'США(восточная)',
                'us-south': 'США(южная)',
                'us-west': 'США(западная)'
            }

            return regions[message.guild.region]
        }

        function mfaToString(level) {
            levels = {
                0: 'Ничего не требуется',
                1: 'Нужно иметь верифицированую почту',
                2: 'Вы должны быть на сервере больше 5-и минут',
                3: 'Вы должны быть на сервере больше 10-и минут',
                5: 'Вы должны иметь верифицированный телефон!'
            }
            return levels[level]
        }
        let region = await regionToString()
        let creation = message.guild.createdAt;
        let joinedAt = message.guild.joinedAt;
        const embed = new Discord.RichEmbed()
            .setTitle(`Информация о сервере ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL)
            .addField('Количество пользователей', `**${message.guild.memberCount}**`, true)
            .addField('Индефикатор (ID)', `**${message.guild.id}**`, true)
            .addField('Уровень верификации', `**${mfaToString(message.guild.verificationLevel)}**`, true)
            .addField('Сервер большой?', message.guild.large ? '**Да**' : '**Нет**', true)
            .addField('Количество ботов', `**${message.guild.members.filter(m => m.user.bot === true).size}**`, true)
            .addField('Регион', `**${region}**`, true);

        await message.channel.send(embed);
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'serverinfo',
    aliases: ['серверинфо', 'ыукмукштащ'],
    description: 'Получить информацию о сервере',
    usages: { '!serverinfo': 'Получить информацию о сервере' },
    category: 'Информация'
}; 