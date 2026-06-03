module.exports = {
    name: "kick",

    async execute(message) {
        if (!message.member.permissions.has("KickMembers")) {
            return message.reply("❌ Нет прав.");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Укажите пользователя.");
        }

        await member.kick();

        await message.reply(
            `👢 ${member.user.username} был исключён.`
        );
    }
};