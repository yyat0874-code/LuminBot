const fs = require("fs");

module.exports = {
    name: "balance",

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

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply(
            `💰 Ваш баланс: ${data[message.author.id].balance} монет`
        );
    }
};