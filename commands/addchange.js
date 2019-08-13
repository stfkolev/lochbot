const { RichEmbed } = require('discord.js');
const crypto = require('crypto');

module.exports = {
    name: 'addchange',
    description: 'Adds a change to changelog',

    guildOnly: true,
    cooldown: 15,

    execute(message, args) {
        if(message.member.hasPermission('BAN_MEMBERS')) {
           
            if(args.length < 2)
                message.channel.send(`The correct usage is **!addchange **<sentence>**`).then(msg => {
                    msg.delete(5000);
                }).catch();
            else {
                const change = args.slice(0).join(' ');

                var issueId = crypto.randomBytes(4).toString('hex');

                const issueMessage = new RichEmbed()
                .setColor(((1 << 24) * Math.random() | 0).toString(16))
                .setTitle(`Change ${issueId}`)
                
                .setAuthor(`${message.member.user.username}`, `${message.member.user.displayAvatarURL}`)
                
                .addBlankField()

                .addField('Changes',  `\`\`\`diff\n${change}\n\`\`\``)
                
                .addBlankField()

                .setTimestamp()
                .setFooter('Issue bot');

                message.client.channels.get('609297548339052554').send(issueMessage).then(msg=> {
                    message.author.lastMessage.delete()
                });
            }
        } else
            message.channel.send('```You do not have permissions to use this command!```').then(msg => {
                msg.delete(5000);
            }).catch();
    }
}