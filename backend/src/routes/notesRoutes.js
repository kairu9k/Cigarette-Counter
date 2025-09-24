import express from "express";
import {
  createEntry,
  getEntryById,
  deleteEntry,
  getAllEntries,
  updateEntry,
  getStatistics,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllEntries);

router.get("/statistics", getStatistics);

router.get("/:id", getEntryById);

router.post("/", createEntry);

router.put("/:id", updateEntry);

router.delete("/:id", deleteEntry);

export default router;
