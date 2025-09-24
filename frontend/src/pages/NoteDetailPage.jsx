import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, Cigarette, MapPin, Heart } from "lucide-react";
import { formatDate } from "../lib/utils";

const EntryDetailPage = () => {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await api.get(`/entries/${id}`);
        setEntry(res.data);
      } catch (error) {
        console.log("Error in fetching entry", error);
        toast.error("Failed to fetch the entry");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await api.delete(`/entries/${id}`);
      toast.success("Entry deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the entry:", error);
      toast.error("Failed to delete entry");
    }
  };

  const handleSave = async () => {
    if (entry.quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/entries/${id}`, {
        brand: entry.brand || "Unknown Brand",
        quantity: entry.quantity,
        location: entry.location || "",
        mood: entry.mood,
        notes: entry.notes || ""
      });
      toast.success("Entry updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the entry:", error);
      toast.error("Failed to update entry");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Entries
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Entry
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <Cigarette className="w-6 h-6" />
                <h2 className="text-xl font-bold">Edit Entry</h2>
                <div className="ml-auto text-sm text-base-content/60">
                  {formatDate(new Date(entry.createdAt))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Brand</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Marlboro, Lucky Strike"
                    className="input input-bordered"
                    value={entry.brand || ""}
                    onChange={(e) => setEntry({ ...entry, brand: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    className="input input-bordered"
                    value={entry.quantity}
                    onChange={(e) => setEntry({ ...entry, quantity: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Home, Office, Bar"
                    className="input input-bordered"
                    value={entry.location || ""}
                    onChange={(e) => setEntry({ ...entry, location: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Mood
                    </span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={entry.mood}
                    onChange={(e) => setEntry({ ...entry, mood: e.target.value })}
                  >
                    <option value="habit">🔄 Habit</option>
                    <option value="stressed">😰 Stressed</option>
                    <option value="relaxed">😌 Relaxed</option>
                    <option value="social">👥 Social</option>
                    <option value="craving">🚬 Craving</option>
                    <option value="other">🤷‍♂️ Other</option>
                  </select>
                </div>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  placeholder="Any additional thoughts or context..."
                  className="textarea textarea-bordered h-24"
                  value={entry.notes || ""}
                  onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EntryDetailPage;
