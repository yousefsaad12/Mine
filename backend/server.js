import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import analyticsRouter from "./routes/analyticsRoute.js";
import settingsRouter from "./routes/settingsRoute.js";

// app config

const app = express();

const prot = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
// api endpoint

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/settings", settingsRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(prot, () => console.log("Server started on PORT : " + prot));
