const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "profile",

    async execute(message) {
        const data = JSON.parse(
            fs.readFileSync("./data/profiles.json", "utf8")
        );

        const profile = data[message.author.id] || {};

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`👤 ${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .addFields(
                {
                    name: "📝 Био",
                    value: profile.bio || "Не указан"
                },
                {
                    name: "💭 Статус",
                    value: profile.status || "Не указан"
                }
            );

        await message.reply({
            embeds: [embed]
        });
    }
};