import express from "express";
import fileRoutes from "./routes/FileRouter.js";
import userRouter from "./routes/UserRoute.js";
import connectDB from "./config/DbConnection.js"; 


const app = express();

app.use(express.json());
connectDB();

// Routes
app.use("/files", fileRoutes);  
app.use("/", userRouter);       

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
