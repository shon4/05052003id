exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("Please Input New Name To Change it!");
        return;
    }

    var username = "";
    for(var i = 1; i < args.length; i++){
        username += args[i] + " ";
    }
    client.user.setUsername(username)
        .then(user => message.channel.send("--> New username set: " + user.username));
};

exports.info = {
    name: "setname",
    alias: ["setusername", "setbotusername", "setbotname"],
    permission: "admin",
    type: "admin",
    usage: "(p)setname [new name]",
    guildOnly: false,
	help: "Set bot name. ex: `!m.setname Revolution.\nPermission : `Admin`"
};
