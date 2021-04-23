const Discord = require('discord.js');
const client = new Discord.Client();
const { ReactionPages } = require('reconlx');
const prefix = ':?'

module.exports = {
    name: 'help',
    description: 'helppppppp meeeeeee',
    execute(message, args) {

        const img = 'https://cdn.discordapp.com/attachments/793020148180189224/833422471314276422/Dalliance_A_Zayn_Malik_Fanfiction.jpeg'

        const embed = new Discord.MessageEmbed()
        .setTitle('Modmail Commands!')
        .addField(':?setup', 'Set up the modmail system!')
        .addField(':?open', 'Opens a modmail ticket for the user with the provided ID.')
        .addField(':?close', 'Closes the modmail thread.')
        .setColor('#8800FF')
        .setThumbnail(img)

        const embed2 = new Discord.MessageEmbed()
        .setTitle('Moderation Commands!')
        .addField(':?kick', 'Kick a member')
        .addField(':?ban', 'Ban a member')
        .addField(':?mute', 'Mute a member')
        .addField(':?purge', 'Purge the given amount of messages')
        .addField(':?slowmode', 'Set the channel\'s slowmode')
        .addField(':?membercount', 'View the server\'s membercount')
        .setColor('#8800FF')
        .setThumbnail(img)

const pages = [embed, embed2];
const textPageChange = true;
const emojis = ["⏪", "⏩"];
const time = 60000;
ReactionPages(message, pages, textPageChange, emojis, time);

  }
}