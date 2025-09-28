import { Link } from "react-router";
import { PlusIcon, Cigarette, BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-base-content/10">
      <div className="mx-auto max-w-6x1 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Cigarette className="w-8 h-8 text-dark-green-300" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
              Cigarette Counter
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Add Entry</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
