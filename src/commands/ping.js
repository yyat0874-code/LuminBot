module.exports = {
    name: "ping",

    async execute(message, client) {

        const wsPing = client.ws.ping;

        await message.reply(
            `🏓 **Понг!**\n🤖 Пинг бота: ${wsPing} мс\n🌐 **Вебсокет:** ${wsPing} мс`
        );
    }
};