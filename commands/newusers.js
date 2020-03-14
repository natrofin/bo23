const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
        let cmdchannelEmbed = new Discord.RichEmbed()
            .setColor('7FFFD4')
            .setTitle('Уведомления')
        if (!args[0]) {
            bot.sendErrEmbed(cmdchannelEmbed, 'Укажите канал')
            return message.channel.send(cmdchannelEmbed)
        }
        let channel = message.mentions.channels.first() || message.guild.channels.get(bot.toNum(args[0]));
        if (!channel) {
            bot.sendErrEmbed(cmdchannelEmbed, 'Укажите канал')
            return message.channel.send(cmdchannelEmbed)
        }

        bot.guild.joinleave = channel.id;
        cmdchannelEmbed.addField(message.author.tag, `**Канал ${channel} установлен как канал для уведомлений**`);

        message.channel.send(cmdchannelEmbed);
        /*
        async function setupChannel(){
            //create collector
            await message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('**Упомяните канал(#имяканала) канала куда необходимо написать сообщение**')
            .setDescription('Для отмены напишите `отмена`')
            );
            const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time: 60000, max:2});
            collector.on('collect', async msg => {
                if(msg.content == 'отмена'){
                    msg.react('👌');
                    await collector.stop('collected')
                    return
                }
                channel = msg.mentions.channels.first();
                //console.log(require('util').inspect(channel)) //
                if(!channel) return bot.sendErrEmbed(new Discord.RichEmbed(), 'Не верно указан канал', true, message);
                bot.guild.joinleave = channel.id;
                
                await bot.guildsRep.save(bot.guild)
                await collector.stop('collected');//я тестил
                await message.channel.send(new Discord.RichEmbed().setDescription(`**Канал <#${channel.id}> назначен для приветствия/ухода участников**`));

                //bot.joinleave = 0;//temp
            });
            
            collector.on('stop', reason => {
                if(reason == 'collected') return;
                bot.sendErrEmbed(new Discord.RichEmbed(), 'Срок ожидания истек', true, message);
            });
        }

        /**
         * .addField('', `
`)

        async function setupWcMessage(){
            await message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .addField(`Переменные`, `
            
%username% - никнейм нового/старого участника
%mention% - упоминание нового/старого учсатника (будет показывать \`<@id_участника>\` если нет общих серверов) 
%membercount% - новое количество участников,
%guildname% - имя сервера
[Документ по форматированию текста](https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-)`)
            .setTitle('**Укажите сообщение приветствия**')
            .setDescription('Для отмены напишите `отмена`')
            );
            const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time: 60000, max:2});

            collector.on('collect', async message => {
                if(message.content == 'отмена'){
                    message.react('👌');
                    await collector.stop('collected');
                    return
                }
                bot.guild.GuildwelcomeMessage = message.content;
                await bot.guildsRep.save(bot.guild);
                await message.channel.send(new Discord.RichEmbed().setDescription(`**Теперь это сообщение установлено как сообщение приветствия**`));
                await collector.stop('collected');
            });

            collector.on('stop', reason => {
                if(reason == 'collected'){

                }else{
                    bot.sendErrEmbed(new Discord.RichEmbed(), 'Срок ожидания истек', true, message);
                }
                
            });


            
        }


        async function setupBmMessage(){
            await message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .addField(`Переменные`, `
            
%username% - никнейм нового/старого участника
%mention% - упоминание нового/старого учсатника (будет показывать \`<@id_участника>\` если нет общих серверов) 
%membercount% - новое количество участников,
%guildname% - имя сервера
[Документ по форматированию текста](https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-)`)
            .setTitle('**Укажите сообщение прощания**')
            .setDescription('Для отмены напишите `отмена`')
            );
            const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time: 60000, max:2});

            collector.on('collect', async message => {
                if(message.content == 'отмена'){
                    message.react('👌');
                    await collector.stop('collected');
                    return
                }
                bot.guild.LeavewelcomeMessage = message.content;
                await bot.guildsRep.save(bot.guild);
                await message.channel.send(new Discord.RichEmbed().setDescription(`**Теперь это сообщение установлено как сообщение прощания**`));
                await collector.stop('collected');
            });

            collector.on('stop', reason => {
                if(reason == 'collected'){

                }else{
                    bot.sendErrEmbed(new Discord.RichEmbed(), 'Срок ожидания истек', true, message);
                }
                
            });


            
        }

        switch(args[0]){
            case 'channel': // с
                await setupChannel()//окей
                break;//)))
                //♥
            case 'привет':
            case 'hm':
            case 'hellomessage':
                await setupWcMessage()
                break;
            case 'пака':
            case 'lm':
            case 'leavemessage':
                await setupBmMessage()
                break;
            default:
                bot.sendErrEmbed(new Discord.RichEmbed(), 'Неизвестный аргумент', true, message);
        }
        */
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'newusers',
    aliases: ['joinleave', 'участники', 'уведомления', 'welcome', 'wc'],
    description: 'При заходе участника на сервер отправляет сообщение в определенный канал',
    category: 'Модерирование',
    usages: {
        '!wc channel': 'В канал #channel будут приходить уведомления о новых участниках',
        '!wc {привет/hm/hellomessage}': 'Указать сообщение приветствия участников(Поддерживаются переменные)',
        '!wc {пака/lm/leavemessage}': 'Указать сообщение прощания участников(Поддерживаются переменные)'

    }
}; 