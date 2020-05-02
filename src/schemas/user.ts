import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    lowercase: true
  },
  first_name: String,
  last_name: String,
  mobile_number: String,
  password: {
    type: String,
    select: false
  },
  is_deleted: Boolean
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
