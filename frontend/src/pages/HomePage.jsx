import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EntryCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitedUI";
import StatsDashboard from "../components/StatsDashboard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get("/entries");
        console.log(res.data);
        setEntries(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching entries");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch entries");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        {isRateLimited && <RateLimitedUI />}

        {!isRateLimited && <StatsDashboard />}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🚬 Recent Entries</h2>
          <Link to="/create" className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Entry
          </Link>
        </div>

        {loading && (
          <div className="text-center text-primary py-10">Loading entries...</div>
        )}

        {entries.length === 0 && !loading && !isRateLimited && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚬</div>
            <h3 className="text-xl font-bold mb-2">No entries yet</h3>
            <p className="text-base-content/70 mb-4">Start tracking your cigarettes by adding your first entry</p>
            <Link to="/create" className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add Your First Entry
            </Link>
          </div>
        )}

        {entries.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} setEntries={setEntries} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
