const Discord = require('discord.js');
exports.execute = (client, message, args) => {
        const channel = message.member.voiceChannel;
    channel.join()
        
    const jembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('✅ Successfully join channel!\n')
    .setFooter("Join")
    .setTimestamp()
    message.channel.send(jembed)
    .then(connection => console.log('Connected!'))
    .catch(console.error);

};

exports.info = {
    name: "join",
    alias: ["join", "summon"],
    permission: "default",
    type: "music",
  usage: "(p)join",
    guildOnly: true,
	help: "Make me join your voice channel"
};
