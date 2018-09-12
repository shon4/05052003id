const { get } = require('snekfetch')
const Discord = require('discord.js')
const superagent = require('superagent')
exports.execute = async ( client,message,args) => {
  try{
        if (!args[1]) return message.channel.send(`:mag: **|** I can't search a NPM package if there isn't a result.`);

        const m = await message.channel.send(`:mag: **|** Fetching \`${args.slice(1).join(" ")}\` npm package...`)
                                                                                                                             
        const pkg = args.join('/');
        const { body } = await get(`https://registry.npmjs.com/${args.slice(1).join(' ')}`);
        if (body.time.unpublished) return m.edit(`:x: **|** \`${args.slice(1).join(' ')}\` is unpublished.`);
        const version = body.versions[body['dist-tags'].latest];
        const maintainers = trimArray(body.maintainers.map(u => u.name));
        const dependencies = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;
        
       /* message.channel.send(*/ 
           
         var embed = new Discord.RichEmbed()
               .setColor("RED")
          .setTitle( "Miyamizu Mitsuha » NPM Package")
          .setDescription( `__**Package ${body.name}**__\n${body.description || 'None'}`)
          .addField("» Version", body['dist-tags'].latest   )                             
                 .addField("» License",body.license || 'No license.')                  
               .addField("» Author", body.author ? body.author.name : '???')                            
                .addField("» Creation Date",new Date(body.time.created).toDateString())                                                  
                .addField("» Modified at",new Date(body.time.modified).toDateString())                                    
                .addField("» Main File", version.main || 'index.js')                        
                .addField("» Dependencies", dependencies && dependencies.length ? `\`${dependencies.join('`, `')}\`` : 'None')                            
                .addField("» Maintainers",`\`${maintainers.join('`, `')}\``)
                
            await m.edit(embed)
            
  }catch(e){
    message.channel.send(e.stack, {code: 'ini'});
  }
  };

 function trimArray(arr, maxLen=10){
   if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
 }

exports.info = {
    name: "npm",
    alias: [],
    permission: "default",
    type: "hidden",
  usage: "(p)npm [package]",
    guildOnly: false,
    help: "new cmd"
};