const mongoose = require("mongoose");

let coordinateSchema = new mongoose.Schema({
  lat: String,
  long: String
}, {
  _id: false,
  timestamps: false,
});

export default mongoose.model("Coordinate", coordinateSchema);
