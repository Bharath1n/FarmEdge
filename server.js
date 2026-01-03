import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

/* -------------------- MONGODB -------------------- */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* -------------------- USER SCHEMA -------------------- */
const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true, required: true },
  wishlist: [
    {
      productId: Number,
      name: String,
      price: Number,
      image: String,
      buyUrl: String,
      rating: Number,
      category: String,
      tag: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

/* -------------------- WISHLIST ROUTES -------------------- */

// Get wishlist
app.get("/api/user/wishlist", requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth();

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = await User.create({ clerkId: userId, wishlist: [] });
    }

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// Add to wishlist
app.post("/api/user/wishlist", requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth();
    const product = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId: userId, "wishlist.productId": { $ne: product.productId } },
      { $push: { wishlist: product } },
      { upsert: true, new: true }
    );

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

// Remove from wishlist
app.delete("/api/user/wishlist/:productId", requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth();
    const productId = Number(req.params.productId);

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $pull: { wishlist: { productId } } },
      { new: true }
    );

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

/* -------------------- GEMINI CHATBOT -------------------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "Invalid message",
      });
    }

    const prompt = `
You are Ramesh, a friendly farming assistant for Indian farmers.
Reply in Kannada or simple English.
User: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      reply: "ಕ್ಷಮಿಸಿ, ಈಗ ಉತ್ತರಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
    });
  }
});

/* -------------------- SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
