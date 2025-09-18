import mongoose from "mongoose";

// 1st step: create schema
//2nd step: create a model that base off that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); //createdAt, updatedAt

const Note = mongoose.model("Note", noteSchema);

export default Note;
