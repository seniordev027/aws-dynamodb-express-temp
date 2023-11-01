import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user-route.js";
import auth from "./routes/auth.js";
import { databaseMiddleware } from "./middleware/databaseMiddleware.js";
dotenv.config();
const app = express();

app.use(databaseMiddleware);
app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1/auth", auth);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
