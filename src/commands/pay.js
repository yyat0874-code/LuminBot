const fs = require("fs");

module.exports = {
    name: "pay",

    async execute(message, client, args) {
        const member = message.mentions.users.first();
        const amount = parseInt(args[1]);

        if (!member) {
            return message.reply(
                "Укажите пользователя."
            );
        }

        if (isNaN(amount) || amount <= 0) {
            return message.reply(
                "Укажите корректную сумму."
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

        if (!data[member.id]) {
            data[member.id] = {
                balance: 0
            };
        }

        if (data[message.author.id].balance < amount) {
            return message.reply(
                "Недостаточно средств."
            );
        }

        data[message.author.id].balance -= amount;
        data[member.id].balance += amount;

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply(
            `✅ Переведено ${amount} монет пользователю ${member.username}`
        );
    }
};