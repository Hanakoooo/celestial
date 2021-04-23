const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'membercount',
    description: 'Displays the membercount',
    execute(message, args) {


const embed = new Discord.MessageEmbed()
.setTitle('Members')
.setDescription(message.guild.memberCount)
.setTimestamp()
.setColor('#8800FF')

message.channel.send(embed)
  }
}