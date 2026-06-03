const fs = require("fs");

module.exports = {
    name: "casino",

    async execute(message, client, args) {
        const bet = parseInt(args[0]);

        if (isNaN(bet) || bet <= 0) {
            return message.reply(
                "Укажите ставку."
            );
        }

        const data = JSON.parse(
            fs.readFileSync("./data/economy.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {
                balance: 0
            };
        }

        if (data[message.author.id].balance < bet) {
            return message.reply(
                "Недостаточно монет."
            );
        }

        const win = Math.random() < 0.45;

        if (win) {
            data[message.author.id].balance += bet;

            await message.reply(
                `🎰 Вы выиграли ${bet} монет!`
            );
        } else {
            data[message.author.id].balance -= bet;

            await message.reply(
                `💸 Вы проиграли ${bet} монет.`
            );
        }

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );
    }
};