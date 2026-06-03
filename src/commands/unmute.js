const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "unmute",

    async execute(message) {

        if (
            !message.member.permissions.has(
                PermissionsBitField.Flags.ModerateMembers
            )
        ) {
            return message.reply(
                "❌ У вас нет прав."
            );
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(
                "Укажите пользователя."
            );
        }

        await member.timeout(null);

        await message.reply(
            `🔊 Мут пользователя ${member.user.username} снят.`
        );
    }
};