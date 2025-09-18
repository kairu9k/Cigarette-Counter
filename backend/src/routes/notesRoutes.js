import express from "express";
import {
  createNotes,
  getNoteById,
  deleteNote,
  getAllnotes,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllnotes);

router.get("/:id", getNoteById);

router.post("/", createNotes);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
