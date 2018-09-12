const { exec } = require('child_process'); //merupakan api node js jadi gk perlu install lagi

exports.execute = (client, msg, args) => {
    if(args.length < 1) return msg.channel.send('No command provide, You bbaka');
    exec(args.slice(1).join(' '), (err, stdout, stderr) => {
        if(!stderr){
            if(stdout.length < 1) return msg.channel.send('Your command succesfuly executed but returned no output');
            return msg.channel.send(stdout, {code: 'bash'});
        }
        return msg.channel.send(`\`ERROR\`\n\`\`\`bash\n${stderr}\`\`\``);
    });

};

exports.info = {
    name: "exec",
    alias: ["ex"],
    permission: "admin",
    type: "admin",
  usage: "(p)execute [console command]",
    guildOnly: false,
    help: "Execute Command, You not need the console Anymore :joy:"
};