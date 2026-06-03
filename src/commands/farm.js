const fs = require("fs");

module.exports = {
    name: "farm",

    async execute(message) {
        const data = JSON.parse(
            fs.readFileSync("./data/economy.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {};
        }

        if (typeof data[message.author.id].balance !== "number") {
            data[message.author.id].balance = 0;
        }

        if (!data[message.author.id].lastFarm) {
            data[message.author.id].lastFarm = 0;
        }

        const cooldown = 30 * 60 * 1000; // 30 минут
        const now = Date.now();

        if (now - data[message.author.id].lastFarm < cooldown) {
            const remaining = Math.ceil(
                (cooldown - (now - data[message.author.id].lastFarm)) / 60000
            );

            return message.reply(
                `🌾 Ферма восстанавливается. Осталось ${remaining} мин.`
            );
        }

        const reward = Math.floor(Math.random() * 401) + 100; // 100-500

        data[message.author.id].balance += reward;
        data[message.author.id].lastFarm = now;

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply(
            `🌾 Вы собрали урожай и получили ${reward} монет!`
        );
    }
};