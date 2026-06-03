module.exports = {
    name: "ping",

    async execute(message, client) {

        const sent = await message.reply("🏓 Измеряю...");

        const botPing = sent.createdTimestamp - message.createdTimestamp;
        const wsPing = client.ws.ping;

        await sent.edit(
            `🏓 **Понг!**\n🤖 **Пинг бота:** ${botPing} мс\n🌐 **Вебсокет:** ${wsPing} мс`
        );
    }
};