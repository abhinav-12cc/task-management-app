import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default models.Task || mongoose.model("Task", TaskSchema);
