import mongoose from "mongoose";

// import schemas
import Coordinate from "./coordinate";

const queueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  establishment: { type: mongoose.Schema.Types.ObjectId, ref: "Establishment" },
  position_in_queue: String,
  waiting_time: String,
  coordinates: Coordinate.schema,
  status: { type: String, enum: ["pending", "arrived", "transacting", "completed"] },
  is_deleted: Boolean
}, {
  timestamps: true
});

export default mongoose.model("Queue", queueSchema);
