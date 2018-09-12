const Discord = require('discord.js');
exports.execute = (client, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel.');
    
    if (!message.guild.me.voiceChannel) return message.channel.send('Sorry, the bot isn\'t connected to the channel.');
    
    
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Sorry, you aren\'t connected to the same channel.')
    
    message.guild.me.voiceChannel.leave();
    
    const lembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('✅ Successfully left channel!\n')
    .setFooter("Leave")
    .setTimestamp()
    message.channel.send(lembed)
    
};

exports.info = {
    name: "leave",
    alias: ["leave", "unsummon"],
    permission: "default",
    type: "music",
    guildOnly: true,
    usage: "(p)leave",
	  help: "Make me join your voice channel"
};
