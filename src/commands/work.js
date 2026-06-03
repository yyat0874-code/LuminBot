const fs = require("fs");

module.exports = {
    name: "work",

    async execute(message) {
        const data = JSON.parse(
            fs.readFileSync("./data/economy.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {};
        }

        if (!data[message.author.id].balance)
            data[message.author.id].balance = 0;

        if (!data[message.author.id].lastWork)
            data[message.author.id].lastWork = 0;

        const cooldown = 60 * 60 * 1000;
        const now = Date.now();

        if (now - data[message.author.id].lastWork < cooldown) {
            return message.reply(
                "💼 Вы уже работали. Попробуйте позже."
            );
        }

        const reward = Math.floor(Math.random() * 701) + 300;

        data[message.author.id].balance += reward;
        data[message.author.id].lastWork = now;

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply(
            `💼 Вы заработали ${reward} монет.`
        );
    }
};