const Discord = require('discord.js')
exports.execute = (client, message, args) => {


let img2 = client.user.displayAvatarURL
        if(message.mentions.users.size < 1) {
        message.channel.send(new Discord.RichEmbed()
            .setDescription(`Displayed for: **${message.author.tag}**\n\n[Download Here](${message.author.avatarURL})`)
            .setImage(message.author.avatarURL)
            .setColor("RANDOM")
.setTimestamp()
            .setFooter("Miyamizu Mitsuha", img2)
        );
        return;
    }
    let img = client.user.displayAvatarURL
    let aTes = message.mentions.users.first() || message.author;
    
    let avatar = new Discord.RichEmbed()
        // .setAuthor(`Avatar for: **${message.author.tag}**`)
        .setDescription(`Displayed For: **${aTes.tag}**\n\n[Download Here](${aTes.avatarURL})`)
        .setImage(aTes.displayAvatarURL)
        .setColor("RANDOM")
        .setFooter("Miyamizu Mitsuha", img)
        .setTimestamp()
        message.channel.send(avatar)

};

exports.info = {
    name: "avatar",
    alias: [],
  usage: "(p)avatar or (p)avatar @user",
    permission: "default",
    type: "general",
    guildOnly: false,
    help: "Show our or someone Avatar"
};