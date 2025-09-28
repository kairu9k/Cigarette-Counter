import api from "../lib/axios";
import { ArrowLeftIcon, Cigarette, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("habit");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    setLoading(true);
    try {
      await api.post("/entries", {
        brand: brand.trim() || "Unknown Brand",
        quantity,
        location: location.trim(),
        mood,
        notes: notes.trim(),
      });
      toast.success("Entry Added Successfully! 🚬");
      navigate("/");
    } catch (error) {
      console.log("Error adding entry", error);
      if (error.response?.status === 429) {
        toast.error("Rate limited! Please wait a moment.", {
          duration: 4000,
          icon: "⏳",
        });
      } else {
        toast.error("Failed to add entry");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2x1 mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back To List
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <Cigarette className="w-6 h-6" />
                Add Cigarette Entry
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Brand (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Marlboro, Lucky Strike"
                      className="input input-bordered"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
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
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Home, Office, Bar"
                      className="input input-bordered"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
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
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
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
                    <span className="label-text">Notes (Optional)</span>
                  </label>
                  <textarea
                    placeholder="Any additional thoughts or context..."
                    className="textarea textarea-bordered h-24"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Entry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
