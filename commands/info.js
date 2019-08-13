const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'info',
    description: 'User information in this server',

    guildOnly: true,
    cooldown: 15,

    execute(message, args) {
        if(!message.mentions.users.size) {
            const userInfo = new RichEmbed()
            
            .setColor('#0099ff')
            .setTitle(`About ${message.author.username}`)
            
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(message.author.note === null ? "No description set" : message.author.note)
            .setThumbnail(message.author.displayAvatarURL)

            .addBlankField()

            .addField('Username', message.author.username, true)
            .addField('Tag', message.author.tag, true)
            .addField('Discriminator', message.author.discriminator, true)

            .addBlankField()

            .addField('Created at ', message.author.createdAt, true)
            .addField('Last message', message.author.lastMessage, true)

            .addBlankField()

            .setTimestamp()
            
            return message.channel.send(userInfo).then(msg => {
                message.author.lastMessage.delete()
                msg.delete(7000);
            });
        }

        const userList = message.mentions.users.map(user => {
            const userInfo = new RichEmbed()
                .setColor('#0099ff')
                .setTitle(`About ${user.username}`)
                
                .setAuthor(user.username, user.displayAvatarURL)
                .setDescription(user.note === null ? "No description set" : user.note)
                .setThumbnail(user.displayAvatarURL)

                .addBlankField()

                .addField('Username', user.username, true)
                .addField('Tag', user.tag, true)
                .addField('Discriminator', user.discriminator, true)
                .addField('Bot', user.bot ? true : false ,true)

                .addBlankField()

                .addField('Created at ', user.createdAt, true)
                .addField('Last message', user.lastMessage === null ? 'No messages in this server' : user.lastMessage, true)

                .addBlankField()

                .setTimestamp()

			return userInfo;
		});
       
        message.channel.send(userList[0]).then(msg => {
            message.author.lastMessage.delete()
            msg.delete(7000);
        });
        console.log(userList);
    }
}