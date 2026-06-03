const fs = require("fs");

module.exports = {
    name: "daily",

    async execute(message) {
        const data = JSON.parse(
            fs.readFileSync("./data/economy.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {
                balance: 0,
                lastDaily: 0
            };
        }

        const now = Date.now();
        const cooldown = 86400000;

        if (now - data[message.author.id].lastDaily < cooldown) {
            return message.reply(
                "⏳ Ежедневная награда уже получена."
            );
        }

        data[message.author.id].balance += 50;
        data[message.author.id].lastDaily = now;

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply(
            "🎁 Вы получили 50 монет!"
        );
    }
};