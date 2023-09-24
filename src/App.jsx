import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="clients" element={<Clients />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
