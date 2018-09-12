const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    client.generateInvite().then(link => {
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Invite Link")
            .setDescription("[**Invite Me!**](https://discordapp.com/oauth2/authorize?client_id=466042707366772759&permissions=2146958583&scope=bot)", false);
            

        message.channel.send(embed);
    });
};

exports.info = {
    name: "invite",
    alias: ["inv"],
    permission: "default",
    type: "general",
    guildOnly: false,
    usage: "(p)invite",
	  help: "Get invite link to invite me to your guild(server)"
};
