const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "top",

    async execute(message) {

        const embed = new EmbedBuilder()
            .setColor("#FEE75C")
            .setTitle("🏆 Рейтинг игроков")
            .setDescription(
                "⚠️ Данная система находится в стадии бета-тестирования.\n\nРейтинг игроков временно недоступен."
            )
            .setFooter({
                text: "LuminaBot Beta"
            });

        await message.reply({
            embeds: [embed]
        });
    }
};