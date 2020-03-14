const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const apikey = require('dotenv').config;
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const tokens = require('../keys.json')
const config = require('../config.json')
const fs = require('fs')
let token = config.activetoken;
if (token == "0") {
    config.activetoken = tokens[0].key
    fs.writeFileSync('./config.json', JSON.stringify(config, null, '\t'))
    token = tokens[0].key
}
let youtube = new YouTube(token);
module.exports.run = async (bot, message, args) => {
    try {
        let query = args.join(' '), res = [], msg;
        let musicEmbed = new Discord.RichEmbed()
            .setColor('#8F00FF')
            .setTitle('🎵 Поиск трека...')
        if (!query) {
            musicEmbed.setTitle('🎵 Укажите название трека / Ссылку YouTube')
            return await message.channel.send(musicEmbed);
        }
        try {
            await message.member.voiceChannel.join();
        } catch (e) {
            musicEmbed.setTitle('🎵 Ошибка подключения к голосовому каналу')
            console.log(e)
            return await message.channel.send(musicEmbed);
        }


        if (!bot.servers[message.guild.id]) {
            bot.servers[message.guild.id] = {
                queue: [],
                channel: message.channel.id,
            };
        }


        await message.channel.send(musicEmbed).then(message => {
            msg = message;
        });

        if (query.includes('://www.youtube.com/watch') == true)
            try {
                try {
                    res.push(await youtube.getVideo(query));
                } catch (e) {
                    let b = tokens.find(x => x.date < Date.now())
                    for (let i = 0; i < tokens.length; i++) {
                        if (tokens[i].key == config.activetoken) {
                            tokens[i].date = `${Date.now() + 1000 * 60 * 60 * 12}`
                            fs.writeFileSync('./keys.json', JSON.stringify(tokens, null, '\t'))
                        }
                    }
                    config.activetoken = b.key;
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, '\t'))
                    youtube = new YouTube(b.key);
                    return bot.sendErrEmbed(new Discord.RichEmbed, 'Произошла ошибка. Попробуйте ввести команду еще раз', true, message);
                }
            } catch (err) {
                musicEmbed.setTitle('🎵 Видео по ссылке не найдено')
                return await msg.edit(musicEmbed);
            } else
            try {
                res = await youtube.searchVideos(query, 1);
            } catch (e) {
                let b = tokens.find(x => x.date < Date.now())
                for (let i = 0; i < tokens.length; i++) {
                    if (tokens[i].key == config.activetoken) {
                        tokens[i].date = `${Date.now() + 1000 * 60 * 60 * 12}`
                        fs.writeFileSync('./keys.json', JSON.stringify(tokens, null, '\t'))
                    }
                }
                config.activetoken = b.key;
                fs.writeFileSync('./config.json', JSON.stringify(config, null, '\t'))
                youtube = new YouTube(b.key);
                return bot.sendErrEmbed(new Discord.RichEmbed, 'Произошла ошибка. Попробуйте ввести команду еще раз', true, message);
            }

        if (!res[0]) {
            musicEmbed.setTitle('🎵 Трек не найден')
            return await msg.edit(musicEmbed);
        }

        musicEmbed.setTitle('🎵 Музыка')
        if (!bot.servers[message.guild.id].dispatcher) {
            musicEmbed.addField('Сейчас играет: ', `**${res[0].title}**`, true)
            musicEmbed.addField('Трек поставил:', `**${message.author.tag}**`, true)
            await bot.servers[message.guild.id].queue.push({ url: `${res[0].id}`, author: `${message.author.tag}` })
            await bot.play(ytdl, message)
            await msg.edit(musicEmbed);
        }
        else {
            if (bot.servers[message.guild.id].queue.length >= 5) return bot.sendErrEmbed(new Discord.RichEmbed, 'Достигнуто максимальное количество треков в очереди', true, message);
            musicEmbed.addField('Трек успешно добавлен в очередь', `**${res[0].title}**`, true)
            musicEmbed.addField('Трек поставил:', `**${message.author.tag}**`, true)
            await bot.servers[message.guild.id].queue.push({ url: `${res[0].id}`, author: `${message.author.tag}` })
            await msg.edit(musicEmbed);
        }
    } catch (e) {
        bot.logsErr(e)
    }
}
module.exports.help = {
    name: 'play',
    aliases: ['плей', 'музыка', 'хачюмузыку'],
    description: 'сыграть музыку',
    usages: { '!play название/ссылка': 'Играет музыку' },
    category: 'Музыка'
};