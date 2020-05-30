import mongoose from "mongoose";

// import schemas
import Coordinate from "./coordinate";

const establishmentSchema = new mongoose.Schema({
  name: String,
  coordinates: Coordinate.schema,
  time_per_person: String,
  number_of_allowed: String,
  type: String,
  is_deleted: Boolean
}, {
  timestamps: true
});

export default mongoose.model("Establishment", establishmentSchema);
