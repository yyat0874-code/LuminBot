module.exports = {
    name: "ping",

    async execute(message, client) {
        const sent = await message.reply("🏓 Измеряю...");

        const apiPing = sent.createdTimestamp - message.createdTimestamp;
        const wsPing = client.ws.ping;

        await sent.edit(
            `🏓 Понг!\n📡 API: ${apiPing} мс\n🌐 Вебсокет: ${wsPing} мс`
        );
    }
};