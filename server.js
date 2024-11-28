import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DbConnection.js"; 
import fileRoutes from "./routes/FileRouter.js";
import userRouter from "./routes/UserRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/files", fileRoutes);  
app.use("/", userRouter);       

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
