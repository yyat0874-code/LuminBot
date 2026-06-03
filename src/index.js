require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    Events
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Map();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once(Events.ClientReady, () => {
    console.log(`Бот запущен: ${client.user.tag}`);
});

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    if (!message.content.startsWith("!")) return;

    const args = message.content.slice(1).split(" ");
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, client, args);
    } catch (err) {
        console.error(err);
    }

});

client.on("interactionCreate", async interaction => {

    if (!interaction.isButton()) return;

    let embed;

    if (interaction.customId === "help_profile") {

        embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("👤 Профиль")
            .setDescription(
                "`!profile`\n`!setbio`\n`!setstatus`"
            );
    }

    if (interaction.customId === "help_economy") {

        embed = new EmbedBuilder()
            .setColor("#57F287")
            .setTitle("💰 Экономика")
            .setDescription(
                "`!balance`\n`!daily`\n`!farm`\n`!work`\n`!crime`\n`!casino`\n`!pay`\n`!top (Бета)`"
            );
    }

    if (interaction.customId === "help_moderation") {

        embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setTitle("🛡️ Модерация")
            .setDescription(
                "`!kick`\n`!ban`\n`!mute`\n`!unmute`"
            );
    }

    if (interaction.customId === "help_system") {

        embed = new EmbedBuilder()
            .setColor("#FEE75C")
            .setTitle("⚙️ Система")
            .setDescription(
                "`!ping`\n`!help`"
            );
    }

    if (embed) {
        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }

});

client.login(process.env.TOKEN);