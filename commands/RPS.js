
const Discord = require("discord.js");

exports.execute = async (bot, message, args) => {
  var choice = args[1];
  if (choice == "paper" || choice == "p") {
    var numb = Math.floor(Math.random() * 100);
    if (numb <= 50) {
      var choice2 = "paper";
    } else if (numb > 50) {
      var choice2 = "rock";
    } else {
      var choice2 = "scissors";
    }
    if (choice2 == "scissors") {
      var response = "I'm choosing **Scissors**! :v: I win!"
    } else if (choice2 == "paper") {
      var response = "I'm choosing **Paper**! :hand_splayed: It's a tie!"
    } else {
      var response = "I'm choosing **Rock**! :punch: You win!"
    }
    message.channel.send(response);
  } else if (choice == "rock" || choice == "r") {
    var numb = Math.floor(Math.random() * 100);
    if (numb <= 50) {
      var choice2 = "paper";
    } else if (numb > 50) {
      var choice2 = "rock";
    } else {
      var choice2 = "scissors";
    }
    if (choice2 == "paper") {
      var response = "I'm choosing **Paper**! :hand_splayed: I win!"
    } else if (choice2 == "rock") {
      var response = "I'm choosing **Rock**! :punch: It's a tie!"
    } else {
      var response = "I'm choosing **Scissors**! :v: You win!"
    }
    message.channel.send(response);
  } else if (choice == "scissors" || choice == "s") {
    var numb = Math.floor(Math.random() * 100);
    if (numb <= 50) {
      var choice2 = "paper";
    } else if (numb > 50) {
      var choice2 = "rock";
    } else {
      var choice2 = "scissors";
    }
    if (choice2 == "rock") {
      var response = "I'm choosing **Paper**! :hand_splayed: You win!"
    } else if (choice2 == "scissors") {
      var response = "I'm choosing **Scissors**! :v: It's a tie!"
    } else {
      var response = "I'm choosing **Rock**! :punch: I win!"
    }
    message.channel.send(response);
  } else {
    message.channel.send(`You need to use \`r!rps\` <rock|paper|scissors>`);
  }
}

// const choices = ['rock', 'paper', 'scissors'];

// exports.execute = (message, { choice }) => {
// 		const response = choices[Math.floor(Math.random() * choices.length)];
// 		if (choice === 'rock') {
// 			if (response === 'rock') return message.reply('Rock! Aw... A tie...');
// 			if (response === 'paper') return message.reply('Paper! Yes! I win!');
// 			if (response === 'scissors') return message.reply('Scissors! Aw... I lose...');
// 		}
// 		if (choice === 'paper') {
// 			if (response === 'rock') return message.reply('Rock! Aw... I lose...');
// 			if (response === 'paper') return message.reply('Paper! Aw... A tie...');
// 			if (response === 'scissors') return message.reply('Scissors! Yes! I win!');
// 		}
// 		if (choice === 'scissors') {
// 			if (response === 'rock') return message.reply('Rock! Yes! I win!');
// 			if (response === 'paper') return message.reply('Paper! Aw... I lose...');
// 			if (response === 'scissors') return message.reply('Scissors! Aw... A tie...');
// 		}
// 		message.reply('I win by default, you little cheater.');
// };



exports.info = {
    name: "rps",
    alias: ["new"],
    permission: "default",
    type: "fun",
  usage: "(p)rps [rock,paper,scissors]",
    guildOnly: false,
    help: "new cmd"
};