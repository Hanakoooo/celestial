const Discord = require("discord.js");
const client = new Discord.Client()
const { prefix, ServerID } = require("./config.json")
const config = require('./config.json');
const fs = require('fs');
const express = require("express");

client.on("ready", () => {
    client.user.setActivity("DM for help"); 
    console.log("e")
})

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('H e n l o'));

app.listen(port, () => console.log("idk"));

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
const command = require(`./commands/${file}`);
client.commands.set(command.name, command);
}


client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if(command === 'ban') {
        client.commands.get('ban').execute(message, args);
    } else if(command === 'kick') {
        client.commands.get('kick').execute(message, args);
    } else if(command === 'slowmode') {
        client.commands.get('slowmode').execute(message, args);
    } else if(command === 'mute') {
        client.commands.get('mute').execute(message, args);
    } else if(command === 'membercount') {
        client.commands.get('membercount').execute(message, args);
    } else if(command === 'purge') {
        client.commands.get('purge').execute(message, args);
    } else if(command === 'help') {
        client.commands.get('help').execute(message, args);
    } 



});



client.on("channelDelete", (channel) => {
    if (channel.parentID == channel.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

        if (!person) return;

        let yembed = new Discord.MessageEmbed()
            .setAuthor("Modmail thread closed!", client.user.displayAvatarURL())
            .setColor('#8800FF')
            .setDescription("This thread has been deleted by a staff member!")
        return person.send(yembed)

    }


})





client.on("message", async message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();


    if (message.guild) {

        if (command == "mod-mail") {
            if (!message.content.startsWith(prefix)) return;
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Oops! You need `ADMINISTRATOR` permissions to use this command!")
            }

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Oops! I need `ADMINISTRATOR` permissions to execute this command!")
            }


            let role = message.guild.roles.cache.find((x) => x.name == "Staff")
            let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

            if (!role) {
                role = await message.guild.roles.create({
                    data: {
                        name: "Staff",
                        color: "#8800FF"
                    },
                    reason: "Role needed for ModMail System"
                })
            }

            await message.guild.channels.create("MODMAIL", {
                type: "category",
                topic: "All the mail will be here",
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            })


            return message.channel.send("Successfully completed the set up! <a:check:831219664343531520>")

        } else if (command == "close") {
            if (!message.content.startsWith(prefix)) return;
            
            if (message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {

                const person = message.guild.members.cache.get(message.channel.name)

                if (!person) {
                    return message.channel.send("Something went wrong and I was not able to close this ticket..")
                }

                await message.channel.delete()

                let yembed = new Discord.MessageEmbed()
                    .setAuthor("Modmail thread closed!", client.user.displayAvatarURL())
                    .setColor("#8800FF")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter("This thread was closed by " + message.author.username)
                if (args[0]) yembed.setDescription(`Reason: ${args.join(" ")}`)

                return person.send(yembed)

            }
        } else if (command == "open") {
            if (!message.content.startsWith(prefix)) return;
            const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")

            if (!category) {
                return message.channel.send("Oops! The modmail system is not set up in this server! Try:  " + prefix + "setup")
            }

            if (isNaN(args[0]) || !args.length) {
                return message.channel.send("Please provide a user ID!")
            }

            const target = message.guild.members.cache.find((x) => x.id === args[0])

            if (!target) {
                return message.channel.send("Oops! This person does not exist! Please try again.")
            }


            const channel = await message.guild.channels.create(target.id, {
                type: "text",
                parent: category.id,
                topic: "This tread was opened by **" + message.author.username + "** for " + message.author.tag
            })

            let nembed = new Discord.MessageEmbed()
                .setAuthor("Account Info", target.user.displayAvatarURL({ dynamic: true }))
                .setColor("#8800FF")
                .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .addField("Username:", target.user.username)
                .addField("Account Creation Date:", target.user.createdAt);

            channel.send(nembed)

            let uembed = new Discord.MessageEmbed()
                .setAuthor("Modmail Thread Opened!")
                .setColor("#8800FF")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("You have been contacted by the staff of **" + message.guild.name + "**!");


            target.send(uembed);

            let newEmbed = new Discord.MessageEmbed()
                .setDescription("<#" + channel + ">")
                .setColor("#8800FF");

            return message.channel.send(newEmbed);
        } 
    }







    if (message.channel.parentID) {

        const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")

        if (message.channel.parentID == category.id) {
            let member = message.guild.members.cache.get(message.channel.name)

            if (!member) return message.channel.send('Something went wrong. Please try again.')

            let lembed = new Discord.MessageEmbed()
                .setColor("#8800FF")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)

            return member.send(lembed)
        }


    }

    if (!message.guild) {
        const guild = await client.guilds.cache.get(ServerID) || await client.guilds.fetch(ServerID).catch(m => { })
        if (!guild) return;
        const category = guild.channels.cache.find((x) => x.name == "MODMAIL")
        if (!category) return;
        const main = guild.channels.cache.find((x) => x.name == message.author.id)


        if (!main) {
            let mx = await guild.channels.create(message.author.id, {
                type: "text",
                parent: category.id,
                topic: "This thread was opened by  **" + message.author.tag + " **"
            })

            let sembed = new Discord.MessageEmbed()
                .setAuthor("Modmail thread opened!")
                .setColor("#8800FF")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("Successfully opened a Modmail ticket! Support will be with you shortly.")

            message.author.send(sembed)


            let eembed = new Discord.MessageEmbed()
                .setAuthor("Account Info", message.author.displayAvatarURL({ dynamic: true }))
                .setColor("#8800FF")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .addField("Username:", message.author.username)
                .addField("Account Creation Date:", message.author.createdAt)


            return mx.send(eembed)
        }

        let xembed = new Discord.MessageEmbed()
            .setColor("#8800FF")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)


        main.send(xembed)

    }

})


client.login("token-goes-here-loladsjfajs") 
