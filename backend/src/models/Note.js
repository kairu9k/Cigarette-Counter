import mongoose from "mongoose";

const cigaretteEntrySchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: false,
      default: "Unknown Brand"
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    },
    location: {
      type: String,
      required: false,
      default: ""
    },
    mood: {
      type: String,
      enum: ["stressed", "relaxed", "social", "habit", "craving", "other"],
      default: "habit"
    },
    notes: {
      type: String,
      required: false,
      default: ""
    }
  },
  { timestamps: true }
);

const CigaretteEntry = mongoose.model("CigaretteEntry", cigaretteEntrySchema);

export default CigaretteEntry;
