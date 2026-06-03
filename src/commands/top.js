const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "top",

    async execute(message) {

        const data = JSON.parse(
            fs.readFileSync("./data/economy.json", "utf8")
        );

        const users = [];

        for (const [id, info] of Object.entries(data)) {

            // Берём только записи, где есть balance
            if (
                typeof info === "object" &&
                info !== null &&
                typeof info.balance === "number"
            ) {
                users.push({
                    id,
                    balance: info.balance
                });
            }
        }

        users.sort((a, b) => b.balance - a.balance);

        const top = users.slice(0, 10);

        let description = "";

        for (let i = 0; i < top.length; i++) {

            let username = "Неизвестный пользователь";

            try {
                const user = await message.client.users.fetch(top[i].id);
                username = user.username;
            } catch {}

            const medal =
                i === 0 ? "🥇" :
                i === 1 ? "🥈" :
                i === 2 ? "🥉" :
                `#${i + 1}`;

            description +=
                `${medal} **${username}** — 💰 ${top[i].balance.toLocaleString()}\n`;
        }

        const embed = new EmbedBuilder()
            .setColor("#FFD700")
            .setTitle("🏆 Топ по балансу")
            .setDescription(
                description || "Пока нет данных."
            )
            .setFooter({
                text: `Сервер: ${message.guild.name}`
            });

        await message.reply({
            embeds: [embed]
        });
    }
};