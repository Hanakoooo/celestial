const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require('ms');

module.exports = {
	name: 'slowmode',
	description: 'Sets the channel slowmode',
  permissions: 'MANAGE_MESSAGES',
	execute(message, args) {

if(!message.member.permissions.has('MANAGE_MESSAGES'))return;
if(!args[0]) {
  message.channel.setRateLimitPerUser(0);
  return message.channel.send('Ok! Slowmode has been removed!')
}

const raw = args[0];
const milliseconds = ms(raw);

if(isNaN(milliseconds)) return message.channel.send('Please provide a valid time.')

if(milliseconds < 1000) return message.channel.send('The minimum slowmode is one second! Usage: `;?slowmode 3s`')

message.channel.setRateLimitPerUser(milliseconds / 1000);
message.channel.send(
  `Ok! Slowmode has been set to: ${ms(milliseconds, {
    long: true
  })}`
)

  }
}