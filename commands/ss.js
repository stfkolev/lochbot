//https://api.stackexchange.com/2.2/search/advanced?pagesize=5&order=desc&sort=activity&answers=1&title=Test&site=stackoverflow
const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'ss',
    description: 'Stack search - Search by title in stack overflow',

    cooldown: 15,
    
    async execute(message, args) {
        if(!args.length)
            return message.channel.send(`Please provide title for the search, ${message.author}!`)

        message.channel.send(`${message.author}, here's what I found for you:`);

        const title = args.slice(1).join(' ');
        const body = await fetch('https://api.stackexchange.com/2.2/search/advanced?pagesize=5&order=desc&sort=activity&q=' + title + '&answers=1&site=stackoverflow')
            .then(response => response.json());

        if(body.items.length)
            body.items.forEach(function(element) {
                const topic = new RichEmbed()
                .setColor(element.is_answered ? '0x00FF00' : '0xFF0000')

                .setTitle(element.title)
                .setURL(element.link)
                
                .addField('Tags', element.tags.slice(0).join(','))
                .addField('Answers', element.answer_count, true)

                .addField('Issued', moment.unix(element.creation_date).format('DD/MM/YYYY HH:mm:ss'), true)
                .addField('Last Activity', moment.unix(element.last_activity_date).format('DD/MM/YYYY HH:mm:ss'), true)

                .addField('Resolved', element.is_answered ? 'Yes' : 'No', true)

                .setTimestamp()
                
                message.channel.send(topic);
            });
        else
            message.channel.send(`I'm terribly sorry ${message.author}, it seems there isn't anything like that in StackOverflow :pensive:`)
    }
}