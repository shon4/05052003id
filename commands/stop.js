exports.execute = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id) 
	if (!msg.member.voiceChannel) return msg.channel.send('You must join voice channel first');
  if(!serverQueue) return msg.channel.send('Im not playing anything right now');
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(`You must be in **${serverQueue.voiceChannel.name}** to stop the song`);
	msg.channel.send(`🛑 Stop the current Queue`);
	serverQueue.songs = [];
	return serverQueue.connection.dispatcher.end(); 
	try{
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.info = {
    name: "stop",
    alias: [],
    permission: "default",
    type: "music",
    guildOnly: true,
    usage: "(p)stop",
    help: "stop the music"
};