const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "mute",

    async execute(message, client, args) {

        if (
            !message.member.permissions.has(
                PermissionsBitField.Flags.ModerateMembers
            )
        ) {
            return message.reply(
                "❌ У вас нет прав для использования этой команды."
            );
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(
                "Укажите пользователя."
            );
        }

        const minutes = parseInt(args[1]);

        if (isNaN(minutes) || minutes <= 0) {
            return message.reply(
                "Укажите время в минутах."
            );
        }

        await member.timeout(
            minutes * 60 * 1000
        );

        await message.reply(
            `🔇 ${member.user.username} получил мут на ${minutes} минут.`
        );
    }
};