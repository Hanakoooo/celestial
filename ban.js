const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ban',
    description: 'ban a member',
    execute(message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Oops! You need `BAN_MEMBERS` permissions to use this command!")
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!User) return message.channel.send("That user does not exist!")
        if (User.hasPermission("BAN_MEMBERS")) return message.reply("Oops! You can't ban someone who has permissions to ban others!")
        let banReason = args.join(" ").slice(22);
        if (!banReason) {
            banReason = "None"
        }
        User.ban({reason: banReason})

  }
}