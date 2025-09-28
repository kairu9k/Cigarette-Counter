import CigaretteEntry from "../models/Note.js";

export async function getAllEntries(req, res) {
  try {
    const entries = await CigaretteEntry.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("error in getAllEntries controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getEntryById(req, res) {
  try {
    const entry = await CigaretteEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (error) {
    console.error("error in getEntryById controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createEntry(req, res) {
  try {
    const { brand, quantity, location, mood, notes } = req.body;
    const entry = new CigaretteEntry({ brand, quantity, location, mood, notes });

    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error("Error in createEntry Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateEntry(req, res) {
  try {
    const { brand, quantity, location, mood, notes } = req.body;
    const updatedEntry = await CigaretteEntry.findByIdAndUpdate(
      req.params.id,
      { brand, quantity, location, mood, notes },
      { new: true }
    );
    if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ updatedEntry });
  } catch (error) {
    console.error("Error in updateEntry Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteEntry(req, res) {
  try {
    const deletedEntry = await CigaretteEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEntry Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getStatistics(req, res) {
  try {
    const entries = await CigaretteEntry.find();

    // Calculate today's count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEntries = entries.filter(entry =>
      new Date(entry.createdAt) >= today
    );
    const todayCount = todayEntries.reduce((sum, entry) => sum + entry.quantity, 0);

    // Calculate this week's count
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEntries = entries.filter(entry =>
      new Date(entry.createdAt) >= weekStart
    );
    const weekCount = weekEntries.reduce((sum, entry) => sum + entry.quantity, 0);

    // Calculate this month's count
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEntries = entries.filter(entry =>
      new Date(entry.createdAt) >= monthStart
    );
    const monthCount = monthEntries.reduce((sum, entry) => sum + entry.quantity, 0);

    // Calculate total count
    const totalCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);

    // Calculate average per day
    const daysSinceFirstEntry = entries.length > 0
      ? Math.max(1, Math.ceil((today - new Date(entries[entries.length - 1].createdAt)) / (1000 * 60 * 60 * 24)))
      : 1;
    const averagePerDay = totalCount / daysSinceFirstEntry;

    // Most common brand
    const brandCounts = {};
    entries.forEach(entry => {
      brandCounts[entry.brand] = (brandCounts[entry.brand] || 0) + entry.quantity;
    });
    const mostCommonBrand = Object.keys(brandCounts).reduce((a, b) =>
      brandCounts[a] > brandCounts[b] ? a : b, "Unknown Brand"
    );

    // Most common mood
    const moodCounts = {};
    entries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + entry.quantity;
    });
    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b, "habit"
    );

    const statistics = {
      today: todayCount,
      week: weekCount,
      month: monthCount,
      total: totalCount,
      averagePerDay: Math.round(averagePerDay * 100) / 100,
      mostCommonBrand,
      mostCommonMood,
      totalEntries: entries.length
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error in getStatistics Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
