import { useState, useEffect } from "react";
import { BarChart3, Clock, Calendar, TrendingUp, Award, Heart } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/entries/statistics");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
        toast.error("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card bg-base-200 animate-pulse">
            <div className="card-body">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-8 bg-base-300 rounded w-1/2 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Today",
      value: stats.today,
      icon: Clock,
      color: "text-dark-green-300",
      bgColor: "bg-dark-green-800/30"
    },
    {
      title: "This Week",
      value: stats.week,
      icon: Calendar,
      color: "text-dark-green-400",
      bgColor: "bg-dark-green-700/30"
    },
    {
      title: "This Month",
      value: stats.month,
      icon: TrendingUp,
      color: "text-dark-green-500",
      bgColor: "bg-dark-green-600/30"
    },
    {
      title: "Total",
      value: stats.total,
      icon: BarChart3,
      color: "text-dark-green-200",
      bgColor: "bg-dark-green-900/30"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Your Smoking Statistics</h2>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="card bg-base-200 border border-base-300">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-base-content/70">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-info" />
              <div>
                <p className="text-sm text-base-content/70">Daily Average</p>
                <p className="font-bold">{stats.averagePerDay}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm text-base-content/70">Most Common Brand</p>
                <p className="font-bold text-sm">{stats.mostCommonBrand}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-error" />
              <div>
                <p className="text-sm text-base-content/70">Common Mood</p>
                <p className="font-bold capitalize">{stats.mostCommonMood}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;