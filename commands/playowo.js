const { RichEmbed, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
//onst { GOOGLE_KEY } = process.env;
const youtube = new YouTube("AIzaSyAyFscx61n9xqP3RmCUtJoIueQ4Qkvv8G0");
const choice = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣',"❌"];

exports.youtube = youtube;
exports.execute = async (client, msg, args) => {
  args = args.slice(1);
	try{
		if(args.length < 1) return msg.channel.send('No query or link or playlist provided')
		const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
		const voiceChannel = msg.member.voiceChannel;
		if(!voiceChannel) return msg.channel.send('You must join voiceChannel first');
   /* if(client.listenMOE.has(msg.guild.id)) return msg.channel.send('Woop im currently play listen.moe. maybe you can ~~wait~~ or stop it*/
		if(client.queue.has(msg.guild.id) && voiceChannel.id !== client.queue.get(msg.guild.id).voiceChannel.id) return msg.channel.send(`You must be in **${client.queue.get(msg.guild.id).voiceChannel.name}** to play music`)
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) return msg.channel.send('🚫 I don\'t have permissions **CONNECT**');
		if (!permissions.has('SPEAK')) return msg.channel.send('🚫 I don\'t have permissions **SPEAK**');
		if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await this.handleVideo(client, video2, msg, voiceChannel, true);
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		}
		try{
			const video = await youtube.getVideo(url);
			return this.handleVideo(client, video, msg, voiceChannel);
		}catch(e){
			try{
				const videos = await youtube.searchVideos(args.join(' '), 5);
				let m = await msg.channel.send(`***Searching for...***  **\`${args.join(" ")}\`**`)//.then(d => d.setInterval(() => d.channel.send("cancelling video selection"),61000)).then(dd => dd.delete(62000))
				for(const chot of choice){
					await m.react(chot);
				}
				m = await embed(m, videos, 'search');
				const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === msg.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name == '❌') return m.delete();
					const oneUrl = await youtube.getVideoByID(videos[choice.indexOf(col.emoji.name)].id);
					return this.handleVideo(client, oneUrl, msg, voiceChannel);
				})
				.on('end', c => m.delete());
			}catch(err){
				return msg.channel.send('🚫 No result found');
      }
		}
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.queue = this.queue

exports.handleVideo = async (client, video, msg, voiceChannel, playlist = false, force = false) => {
	const serverQueue = client.queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		thumbnail: video.thumbnails.high.url,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    votes: [],
    duration: video.duration,
    requester: msg.author,
    loop:false
	}
	if(!serverQueue){
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 50,//bantuin bikin lahk gw gangerti sama music:v
			playing: true,
     // loop: true
		}
		client.queue.set(msg.guild.id, queueConstruct);
		queueConstruct.songs.push(song);
		try{
			const connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			playlist ? undefined : embed(msg, song, 'addQueue');
			play(client, msg.guild, queueConstruct.songs[0]);
		}catch(e){
			client.queue.delete(msg.guild.id);
			return msg.channel.send(`Oh no an error occured :( \`${e.message}\``);
		}
	} else {
		force ? serverQueue.songs.splice(1, 0, song) : serverQueue.songs.push(song);
		if(!playlist) return embed(msg, song, 'addQueue');
	}
}

function play(client, guild, song, type = 'biasa', seek = 0){
	const serverQueue = client.queue.get(guild.id);
	if (!song) {
    //const shiffed = song.shift()
   // if(serverQueue.loop) song.push(shiffed);
		serverQueue.voiceChannel.leave();
		return client.queue.delete(guild.id);
	}
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, { filter: 'audioonly'}), {seek: seek})
	.on('end', res => {
		/*if(res !== 'Stream is not generating quickly enough.') console.error(res);
		if(res.includes('seek')){
			const seekTo = parseInt(res.split(' ')[1], 10);
      var shiffed = serverQueue.songs.shift();
		//	if(serverQueue.loop) serverQueue.songs.push(shiffed);
			serverQueue.songs.shift();
			play(client, guild, serverQueue.songs[0], 'seek', seekTo);
		}else{
      if(serverQueue.loop) serverQueue.songs.push(shiffed)
		// serverQueue.songs.shift();
		 play(client, guild, serverQueue.songs[0]);*/
    if(res !== 'Stream is not generating quickly enough.') console.error(res);
		if(res.includes('seek')){
			const seekTo = parseInt(res.split(' ')[1], 10);
			serverQueue.songs.shift();
			play(client, guild, serverQueue.songs[0], 'seek', seekTo);
		}else{
		 const shiffed = serverQueue.songs.shift();
			if(serverQueue.loop) serverQueue.songs.push(shiffed);
		 play(client, guild, serverQueue.songs[0]);
    
    }
	})
	.on('error', err => console.error(err));
	dispatcher.setVolumeLogarithmic(serverQueue.volume/100);
	type !== 'seek' ? embed(serverQueue.textChannel, song) : undefined;
}

function embed(msg, song, type = 'biasa'){
	if(type === 'addQueue'){
		const embed = new RichEmbed()
		.setColor('RANDOM')
		.setDescription(`✅ **Added to queue :** __**${song.title}**__ `)
		.setThumbnail(song.thumbnail);
		return msg.channel.send(embed).then(m => m.delete(6000));
	}
	if(type === 'search'){
		const embed = new RichEmbed()
		.setColor('RANDOM')
		.setDescription(song.map((x, i) => `${choice[i]} [${x.title}](${x.shortURL})`))
    .setFooter("chooose ❌ to cancel the Songs Selection");
		return msg.edit('🎵 __**Songs Selection**__',{embed: embed})//.then(j => j.delete(5000))//.then(i => i.setInterval(() => i.channel.send("cancelling songs selection!"),5000))
	}
  const embed = new RichEmbed()
  .setColor("RANDOM")
  .setDescription(`✅ **Now Playing :** __**${song.title}**__ | __${song.duration.hours}hrs ${song.duration.minutes}min ${song.duration.seconds}secs__`);
  return msg.send(embed)
}

exports.info = {
    name: "play",
    alias: ["p"],
    permission: "default",
    type: "music",
    guildOnly: true,
    usage: "(p)",
    help: "new cmd"
};