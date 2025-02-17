require("dotenv").config({ path: __dirname + "/../config/.env" }); 
const { Telegraf, Markup } = require("telegraf");
const mongoose = require("mongoose");
const User = require("../models/User");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Handle `/start` command
bot.start(async (ctx) => {
    try {
        const telegramId = ctx.from.id.toString(); // Convert Telegram ID to string
        const username = ctx.from.username || `User_${telegramId}`; // Use Telegram username if available

        // Check if user already exists
        let user = await User.findOne({ telegramId });

        if (!user) {
            // Create new user
            user = new User({ username, telegramId });
            await user.save();
            ctx.reply(`✅ Welcome, ${username}! You are now registered.`);
        } else {
            ctx.reply(`👋 Welcome back, ${user.username}!`);
        }

        // Display user profile
        ctx.reply(`📜 Your Profile:\n👤 Username: ${user.username}\n🆔 Telegram ID: ${user.telegramId}`);

         // Play Button
        ctx.reply(
            "🎮 Click below to play:",
            Markup.inlineKeyboard([Markup.button.webApp("▶️ Play", process.env.GAME_URL)])
        );
    } catch (error) {
        console.error("Error handling /start:", error);
        ctx.reply("❌ An error occurred. Please try again later.");
    }
});

// Start the bot
bot.launch();
console.log("🤖 Telegram bot is running...");
