require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const User = require("../models/User");
const connectDB = require("../config/db");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Connect to DB
connectDB();

// Start Command
bot.start(async (ctx) => {
    const user = await User.findOne({ telegramId: ctx.from.id });

    if (!user) {
        await User.create({
        username: ctx.from.username || "Unknown",
        telegramId: ctx.from.id,
        });
    }

    ctx.reply(
        "Welcome! Click Play to start the game.",
        Markup.inlineKeyboard([
        Markup.button.webApp("▶️ Play", process.env.GAME_URL),
        ])
    );
});

bot.launch();
