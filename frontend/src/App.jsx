import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div className="relative h-full w-full bg-gradient-dark-green" data-theme="darkgreen">
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#3a9a3e2e_1px,transparent_1px),linear-gradient(to_bottom,#5fb8632a_1px,transparent_1px)] bg-[size:20px_30px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_500px_at_50%_300px,#3a9a3e36,transparent)]"></div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/entry/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
