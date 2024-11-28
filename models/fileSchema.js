import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  fileName: { 
    type: String, 
    required: true 
  },
  filePath: { 
    type: String, 
    required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("File", FileSchema);
