const snek = require('snekfetch')
exports.execute = async (client, msg, args) => {
  args = args.slice(1)
	if(args.length < 1) return msg.channel.send( 'No query provided');
	let branch = args[1] || 'stable'
	let project = 'main';
	if (branch === 'commando' || branch === 'rpc') {
		project = branch;
		branch = 'master';
	}
	try{
		const { body } = await snek.get(`https://djsdocs.sorta.moe/${project}/${branch}/embed`)
		.query({q: args[0]});
		return msg.channel.send({embed: body});
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}
exports.info ={
  name:"docs",
  alias:["doc"],
  guildOnly:true,
  permission:"default",
  type:"util",
  usage:"(p)docs"
  
}