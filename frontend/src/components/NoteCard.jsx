import { PenSquareIcon, Trash2Icon, Cigarette, MapPin, Heart } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const EntryCard = ({ entry, setEntries }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await api.delete(`/entries/${id}`);
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
      toast.success("Entry Deleted Successfully!");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed To Delete Entry!");
    }
  };
  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      stressed: "😰",
      relaxed: "😌",
      social: "👥",
      habit: "🔄",
      craving: "🚬",
      other: "🤷‍♂️"
    };
    return moodEmojis[mood] || "🚬";
  };

  return (
    <Link
      to={`/entry/${entry._id}`}
      className="card bg-gradient-dark-green-card hover:shadow-xl transition-all duration-200
      border-t-4 border-solid border-dark-green-400 backdrop-blur-sm"
    >
      <div className="card-body">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cigarette className="w-5 h-5 text-dark-green-300" />
            <span className="font-bold text-lg">{entry.quantity}x</span>
          </div>
          <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
        </div>

        <h3 className="card-title text-base-content text-sm">{entry.brand}</h3>

        {entry.location && (
          <div className="flex items-center gap-1 text-xs text-base-content/70">
            <MapPin className="w-3 h-3" />
            <span>{entry.location}</span>
          </div>
        )}

        {entry.notes && (
          <p className="text-base-content/70 line-clamp-2 text-sm mt-1">{entry.notes}</p>
        )}

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xs text-base-content/60">
            {formatDate(new Date(entry.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, entry._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EntryCard;
