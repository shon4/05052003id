const { handleVideo, youtube } = require('./playowo.js');

exports.executeini = async (client, msg, args) => {
	args = args.slice(1)
	if(args.length < 1) return msg.channel.send( 'No query or link or playlist provided')
	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
	const voiceChannel = msg.member.voiceChannel;
	if(!voiceChannel) return msg.channel.send('You must join voiceChannel first');
	//if(client.listenMOE.has(msg.guild.id)) return msg.channel.send('Woop im currently play listen.moe. maybe you can ~~wait~~ or stop it');
	if(client.queue.has(msg.guild.id) && voiceChannel.id !== client.queue.get(msg.guild.id).voiceChannel.id) return msg.channel.send(`You must be in **${client.queue.get(msg.guild.id).voiceChannel.name}** to play music`);
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT')) return msg.channel.send('🚫 I don\'t have permissions **CONNECT**');
	if (!permissions.has('SPEAK')) return msg.channel.send('🚫 I don\'t have permissions **SPEAK**');
	try{
		const serverQueue = client.queue.get(msg.guild.id);
		try{
			const video = await youtube.getVideo(url);
			if(!serverQueue) return handleVideo(client, video, msg, voiceChannel);
			await handleVideo(client, video, msg, voiceChannel, false, true);
			return serverQueue.cinnection.dispatcher.end();
		}catch (err){
			try {
				const videos = await youtube.searchVideos(args.join(' '), 1);
				const oneUrl = await youtube.getVideoByID(videos[0].id);
				if(!serverQueue) return handleVideo(client, oneUrl, msg, voiceChannel);
				await handleVideo(client, oneUrl, msg, voiceChannel, false, true);
				return serverQueue.connection.dispatcher.end();
			}catch (err) {
				return msg.channel.send('🚫 No result found');
			}
		}
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.info = {
  name: 'forceplay',
  alias:["fplay"],
  guildOnly:true,
  permission:'default',
  type:'music',
  help: 'play music but force!',
  usage: '(p)forceplay <url | query>',
  }