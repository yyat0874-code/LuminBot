module.exports = {
    name: "ban",

    async execute(message) {
        if (!message.member.permissions.has("BanMembers")) {
            return message.reply("❌ Нет прав.");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Укажите пользователя.");
        }

        await member.ban();

        await message.reply(
            `🔨 ${member.user.username} был заблокирован.`
        );
    }
};