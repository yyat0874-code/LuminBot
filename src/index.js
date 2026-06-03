const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    name: "help",

    async execute(message) {

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("📚 LuminaBot — Центр помощи")
            .setDescription(
                "Выберите категорию ниже для просмотра команд.\n\n" +
                "👤 Профили\n" +
                "💰 Экономика\n" +
                "🛡️ Модерация\n" +
                "⚙️ Система"
            )
            .setThumbnail(
                message.client.user.displayAvatarURL()
            )
            .setFooter({
                text: "LuminaBot"
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("help_profile")
                    .setLabel("Профиль")
                    .setEmoji("👤")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("help_economy")
                    .setLabel("Экономика")
                    .setEmoji("💰")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("help_moderation")
                    .setLabel("Модерация")
                    .setEmoji("🛡️")
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setCustomId("help_system")
                    .setLabel("Система")
                    .setEmoji("⚙️")
                    .setStyle(ButtonStyle.Secondary)
            );

        await message.reply({
            embeds: [embed],
            components: [row]
        });
    }
};