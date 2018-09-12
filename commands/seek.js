const { RichEmbed } = require('discord.js');

exports.execute = async (client, msg, args) => {
  args = args.slice(1)
	const serverQueue = client.queue.get(msg.guild.id);
	if(!msg.member.voiceChannel) return msg.channel.send('Join voice channel first');
	if(!serverQueue) return msg.channel.send('No songs to seek');
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.chanel.send(`You must in **${serverQueue.voiceChannel.name}** to seek the song`)
	try{
		const curDuration = (serverQueue.songs[0].duration.minutes*60000) + ((serverQueue.songs[0].duration.seconds%60000)*1000);
		const choiceDur = args.join(' ').split(':');
		if(choiceDur.length < 2) return args.missing(msg, 'No duration provided or invalid ?',this.info);
		const optDurr = (parseInt(choiceDur[0], 10)*60000) + ((parseInt(choiceDur[1], 10)%60000)*1000);
		if(optDurr > curDuration) return msg.channel.send('Your duration is too big');
		serverQueue.songs.splice(1, 0, serverQueue.songs[0]);
		return serverQueue.connection.dispatcher.end(`seek ${optDurr}`);
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.info = {
    name: "seek",
    alias: [],
    permission: "admin",
    type: "hidden",
    guildOnly: true,
    usage: "(p)seek [duration]",
    help: "seek the music to duration waht you want"
};