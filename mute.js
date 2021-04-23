const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'mute',
    description: 'mute a member',
    execute(message, args) {

if(!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send("Oops! You need `MANAGE_ROLES` permissions to use this command!")

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(user.id === message.author.id) return message.channel.send("?")

let role = message.guild.roles.cache.find(x => x.name === "Muted");

let reason = args.slice(1).join(" ");
if(reason === null) reason = "Unspecified"

user.roles.add(role);

message.channel.send(`${user} has been muted: ${reason}`)

user.send(`Hi! You've been muted in ${message.guild.name}! Reason: ${reason}`)
  

  }
}