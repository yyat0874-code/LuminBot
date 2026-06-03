const fs = require("fs");

module.exports = {
    name: "setbio",

    async execute(message, client, args) {
        const bio = args.join(" ");

        if (!bio) {
            return message.reply("Укажите описание.");
        }

        const data = JSON.parse(
            fs.readFileSync("./data/profiles.json", "utf8")
        );

        if (!data[message.author.id]) {
            data[message.author.id] = {};
        }

        data[message.author.id].bio = bio;

        fs.writeFileSync(
            "./data/profiles.json",
            JSON.stringify(data, null, 4)
        );

        await message.reply("✅ Био обновлён.");
    }
};