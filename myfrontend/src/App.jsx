import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import Search from "./components/Search";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
