const Discord = require('discord.js');

exports.execute = async (client, message, args, tools) => {
    
    // Array of responses
    let responses = [
        'Agreed!',
        'Of Course!',
        'Nope.',
        'No',
        'Maybe',
        'One day...',
        'Don\'t see that happening!',
        'I have no idea'
    ]
    
    // Fetch a random item from the array
    let fetched = responses[Math.floor(Math.random() * responses.length)];
    
    // Form Embed
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setFooter(fetched);
    
    // Send Embed
    message.channel.send(embed);
    
}

exports.info = {
    name: "8ball",
    alias: [],
    permission: "default",
    type: "fun",
    guildOnly: false,
  usage: "(p)8ball [question]",
    help: "try your luck"
};
