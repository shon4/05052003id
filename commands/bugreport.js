
const superagent = require('superagent')
     const Discord = require('discord.js')
exports.execute = async (client, message, args) => {

try {
   function clean(text) {
      if (typeof(text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    }
    const bug = args.slice(1).join(" ")
    const bugr = new Discord.RichEmbed()
    .setColor("RED")
    .setAuthor("Bug Report Logs")
    .addField("Bug Reporter :",`• ${message.author.username}#${message.author.discriminator} (${message.author.id})`)
    .addField("Bug Content :",`• ${bug}`)
    .addField("Guilds Report Sender :", `• ${message.guild.name}\nID ${message.guild.id}`)
    if (!bug) return message.channel.send('Please specify a bug to report it! ').then(m => m.delete(5000))
    const content = clean(`**BUGS REPORTER:**\n• \`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\` \n**BUGS CONTENT:**\n• \`\`\`${bug}\`\`\`\n**BUGS FROM GUILDS:** \n• \`\`\`${message.guild.name} (${message.guild.id})\`\`\``);
    const id = '484327469801930752';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${client.token}`).send({ content })
        .end((err, res) => {
          if (err) {
            reject(err);
            message.reply('There was an error while sending your bug report to Mitsuha Support. Please try again later.');
          } else {
            resolve(res);
            message.channel.send(`:white_check_mark: **${message.author.username}**, your bug report has successfully been submitted to Mitsuha Support for review. Thank you!.`).then(m => m.delete(10000))
          }
        });
    });
}  catch (err) {
  message.channel.send(err.message)
}
}
exports.info = {
    name: "bugreport",
    alias: ["bugs"],
    permission: "default",
    type: "util",
    guildOnly: false,
    usage: "(p)bugreport <bug>",
    help: "new cmd"
};