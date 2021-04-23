const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'purge',
    description: 'Purges messages.',
    execute(message, args) {

if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('?');

if(!args[0]) return message.channel.send('Please say how many messages you want to purge!');

message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Ok! Cleared ${args[0]} messages!`)
    .then(message => {
        message.delete(10000)
  })
})

  }
}