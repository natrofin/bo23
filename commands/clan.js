const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        let arguments = ['create', 'info', 'invite', 'upgrade', 'kick']
        async function createClan(message, args) {
            let balance = bot.dbUser.coins;
            console.log(balance + ' ' + bot.clanPrice)
            if (balance < bot.clanPrice) return bot.sendErrEmbed(new Discord.RichEmbed(), `**Для создания клана требуется ${bot.locale(bot.clanPrice)} $**`, true, message);
            let clanName = args.slice(1).join(' ')
            let clan = await bot.clansRep.findOne({ name: clanName });
            if (!clan) {
                let clanid = bot.dbUser.clanid;
                if (clanid != -1) {
                    return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас уже есть клан', true, message);
                }
                clan = { ownerid: message.author.id, name: clanName }

                await bot.clansRep.save(clan);
                bot.dbUser.clanid = clan.id;
                bot.dbUser.coins -= bot.clanPrice;
                return message.channel.send(new Discord.RichEmbed({ title: '**Вы успешно создали клан!**' }).setColor('RANDOM'));
            } else {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Клан с таким названием уже существует', true, message);
            }
        }
        async function getClanInfo(message, args) {

            let clanid = bot.dbUser.clanid; //запускай
            if (clanid == -1) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас нет клана!', true, message);
            }
            clan = await bot.clansRep.findOne({ id: clanid });
            let clanname = clan.name;
            let clanxp = clan.xp;
            let clanlvl = clan.level;
            let clanMembers = await bot.usersRep.find({ clanid: clan.id });
            message.channel.send(new Discord.RichEmbed().setTitle(`**Информация о клане \`${clanname}\`**`).setColor('RANDOM').addField('Опыт клана', `${clanxp}/${clanlvl * 1000} (осталось ${clanlvl * 1000 - clanxp} опыта до нового уровня)`).addField('Описание клана', clan.description).addField('Баланс клана', clan.coins + ' монет').addField('Участников', clanMembers.length));

        }

        async function inviteMember(message, args) {
            let clanid = bot.dbUser.clanid; //запускай
            if (clanid == -1) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас нет клана!', true, message);
            }
            let clan = await bot.clansRep.findOne({ id: clanid })
            let user = message.mentions.users.first() || message.guild.members.get(args[0]);
            if (!user) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Необходимо указать участника через @', true, message);
            }
            let inviteddbUser = await bot.usersRep.findOne({ userid: user.id });
            if (inviteddbUser.clanid !== -1) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Этот пользователь уже в клане!', true, message);
            }
            /*message.channel.send(user.mention, new Discord.RichEmbed().setTitle(`${message.author.tag} пригласил ${user.tag} в клан \`${clan.name}\``).setDescription('Для вступления напишите `!accept`'));
            
            await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
            .then(async collected => {
                let msg = collected.first();

                inviteddbUser.clanid = clan.id;
                console.log(require('util').inspect(inviteddbUser))
                bot.usersRep.save(inviteddbUser)
                message.channel.send(new Discord.RichEmbed().setTitle(`${user.tag} Зашел в клан ${clan.name}!`)).setColor('RANDOM');
            }).catch(e => {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Пользователь не ответил на приглашение!', true, message); 
            })*/
            await message.channel.send(user.mention, new Discord.RichEmbed().setTitle(`${message.author.tag} пригласил ${user.tag} в клан \`${clan.name}\``).setDescription('Для вступления напишите `!accept`'));
            const filter = m => m.content.includes('!accept') && m.author.id === user.id;
            const collector = message.channel.createMessageCollector(filter, { max: 2, time: 30000 });
            collector.on('collect', async (m) => {

                inviteddbUser.clanid = clan.id;
                bot.usersRep.save(inviteddbUser)
                await m.channel.send(new Discord.RichEmbed().setTitle(`**${user.tag} Зашел в клан ${clan.name}!**`).setColor('RANDOM'));
                await collector.stop('collected');
            });
            collector.on('end', async (collected, reason) => {
                if (reason === 'collected') return;
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Пользователь не ответил на приглашение!', true, message);
            })

        }

        async function clanLeave(message, args) {
            let clanid = bot.dbUser.clanid; //запускай
            if (clanid === -1) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас нет клана!', true, message);
            }

            let clan = await bot.clansRep.findOne({ id: clanid });
            let mymsg = await message.channel.send(new Discord.RichEmbed().setTitle(`**Ты точно хочешь выйти из клана ${clan.name}? если да тогда нажми на ✅**`));
            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id === message.author.id;
            };
            await mymsg.react('✅')
            await mymsg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
                //#region start
                reaction = collected.first()
                bot.dbUser.clanid = -1;
                message.channel.send(new Discord.RichEmbed().setTitle(`**Вы успешно ушли из клана \`${clan.name}\`**`).setColor('RANDOM'));
            }).catch(async collected => {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Времмя вышло', true, message);
            })
        }

        async function kickMember(message, args) {
            let clanid = bot.dbUser.clanid; //запускай
            if (clanid == -1) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас нет клана!', true, message);
            }
            let clan = await bot.clansRep.findOne({ id: clanid })
            let user = message.mentions.users.first() || message.guild.members.get(args[0]);
            if (!user) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Необходимо указать участника через @', true, message);
            }

            let dbUser = await bot.usersRep.findOne({ userid: user.id });
            if (dbUser.clanid !== clanid) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'А это вобще участник этого клана?', true, message);
            }
            if (clan.ownerid == user.id) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Хмм... Хочешь кикнуть овнера клана? логично...', true, message);
            }
            dbUser.clanid = -1;
            await bot.usersRep.save(dbUser)
            return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle(`**Вы успешно кикнули ${user.tag} из клана \`${clan.name}\`**`));


        }

        async function editdescription(message, args){
            let clanid = bot.dbUser.clanid; //запускай
            if (clanid == -1) {
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'У вас нет клана!', true, message);
            }
            let clan = await bot.clansRep.findOne({ id: clanid });
            let description = args.slice(1);
            
            if(!description[0]){
                return bot.sendErrEmbed(new Discord.RichEmbed(), 'Вы не указали описание клана...', true, message);
            }

            clan.description = description.join(' ');
            await bot.clansRep.save(clan);
            await message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle("**Вы успешно изменили описание клана**"))
        }
        switch (args[0]) {
            case 'create':
                await createClan(message, args)
                break;
            case 'info':
                await getClanInfo(message, args)
                break;
            case 'invite':
                await inviteMember(message, args)
                break;
            case 'desc':
            case 'описание':
            case 'description':
                await editdescription(message, args);
                break;
            case 'kick':
                await kickMember(message, args)
                break;
            case 'exit':
            case 'leave':
                await clanLeave(message, args)
                break;
            default:
                getClanInfo(message, args);

        }
        await bot.usersRep.save(bot.dbUser);
    } catch (err) {
        bot.logsErr(err)

    }
};
module.exports.help = {
    name: 'clan',
    aliases: ['слан', 'клун', 'гильдия', 'guild', 'клан', 'caln'],
    description: 'Управление кланами',
    usages: { 
        '!clan create lalka': 'Создаст клан с именем lalka' ,
        '!clan invite @user#0001': 'Пригласить в клан пользователя @user#0001',
        '!clan kick @user#0001': 'Кикнуть участника @user#0001 из клана',
        '!clan description/desc/описание Я люблю майнкрафт': 'Изменит описание клана на - Я люблю майнкрафт',
        '!clan (info)': 'Покажет информацию о клане'
    
    },
    category: 'Развлечения'
}; 