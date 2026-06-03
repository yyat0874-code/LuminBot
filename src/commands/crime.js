const fs = require("fs");

module.exports = {
    name: "crime",

    async execute(message) {
        const data = JSON.parse(
            fs.readFileSync("./data/economy.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {};
        }

        if (!data[message.author.id].balance)
            data[message.author.id].balance = 0;

        const success = Math.random() < 0.5;

        if (success) {
            const reward =
                Math.floor(Math.random() * 1001) + 500;

            data[message.author.id].balance += reward;

            await message.reply(
                `🦹 Успешно! Вы украли ${reward} монет.`
            );
        } else {
            const fine =
                Math.floor(Math.random() * 501) + 100;

            data[message.author.id].balance = Math.max(
                0,
                data[message.author.id].balance - fine
            );

            await message.reply(
                `🚔 Вас поймали. Штраф ${fine} монет.`
            );
        }

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );
    }
};