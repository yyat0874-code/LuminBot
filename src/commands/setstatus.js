const fs = require("fs");

module.exports = {
    name: "setstatus",

    async execute(message, client, args) {
        const status = args.join(" ");

        if (!status) {
            return message.reply("Укажите статус.");
        }

        const data = JSON.parse(
            fs.readFileSync("./data/profiles.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {};
        }

        data[message.author.id].status = status;

        fs.writeFileSync(
            "./data/profiles.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply("✅ Статус обновлён.");
    }
};