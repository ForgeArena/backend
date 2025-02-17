require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy",
        "default-src 'self' https://backend-farn.onrender.com https://frontend-r03x.onrender.com; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; " +  // ✅ Allow blob URLs
        "img-src 'self' data: https://pos.baidu.com; " + 
        "connect-src 'self' https://backend-farn.onrender.com https://frontend-r03x.onrender.com;");
    next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();


app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
