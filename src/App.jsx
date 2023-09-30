import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./helper/gloaballoading";
import NavBar from "./navigation/NavBar";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Profile from "./pages/Profile";
import Info from "./pages/Info";
import NoPage from "./pages/NoPage";
import { useState } from "react";

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function RoutesWithAnimation({setInfoPageOpen}) {
  const location = useLocation();
  setInfoPageOpen(location.pathname==="/Info");
  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/info" element={<Info />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

function App() {

  const [infoPageOpen,setInfoPageOpen] = useState(false);
 
  return (
    <div className="App">
      <BrowserRouter>
      {!infoPageOpen && <NavBar />}
        <LoaderProvider>
          <LocationProvider>
            <RoutesWithAnimation setInfoPageOpen={setInfoPageOpen}></RoutesWithAnimation>
          </LocationProvider>
        </LoaderProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
