const { RichEmbed } = require('discord.js');
const crypto = require('crypto');

module.exports = {
    name: 'issue',
    description: 'Adds an issue',

    guildOnly: true,
    cooldown: 15,

    execute(message, args) {
        if(message.member.hasPermission('BAN_MEMBERS')) {
           
            if(args.length < 2)
                message.channel.send(`The correct usage is **!issue <Problem Name> -*- <Solution>**`).then(msg => {
                    msg.delete(5000);
                }).catch();
            else {
                const problem = args.slice(0, args.indexOf('-*-')).join(' ');
                const solution = args.slice(args.indexOf('-*-') + 1).join(' ');

                var issueId = crypto.randomBytes(4).toString('hex');

                const issueMessage = new RichEmbed()
                .setColor(((1 << 24) * Math.random() | 0).toString(16))
                .setTitle(`Issue ${issueId}`)
                
                .setAuthor(`${message.member.user.username}`, `${message.member.user.displayAvatarURL}`)
                
                .addBlankField()

                .addField('Problem', `\`\`\`php\n${problem}\`\`\``)

                .addBlankField()

                .addField('Solution', solution)
                
                .addBlankField()

                .setTimestamp()
                .setFooter('Issue bot');

                message.client.channels.get('608627231274827789').send(issueMessage).then(msg=> {
                    message.author.lastMessage.delete()
                });
            }
        } else
            message.channel.send('```You do not have permissions to use this command!```').then(msg => {
                msg.delete(5000);
            }).catch();
    }
}