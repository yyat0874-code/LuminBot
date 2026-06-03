const fs = require("fs");

module.exports = {
    name: "givemoney",

    async execute(message, client, args) {

        if (message.author.id !== "894867256801128449") {
            return message.reply("❌ У вас нет доступа к этой команде.");
        }

        const user = message.mentions.users.first();
        console.log(args);
        const amount = parseInt(args[args.length - 1]);

        if (!user) {
            return message.reply(
                "Использование: !givemoney @пользователь сумма"
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

        if (!data[user.id]) {
            data[user.id] = {
                balance: 0
            };
        }

        data[user.id].balance += amount;

        fs.writeFileSync(
            "./data/economy.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply(
            `✅ Вы выдали ${amount} монет пользователю ${user.username}`
        );
    }
};