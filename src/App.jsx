import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./helper/gloaballoading";
import NavBar from "./navigation/NavBar";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Profile from "./pages/Profile";
import {InfoPageRoute} from "./pages/Info";
import NoPage from "./pages/NoPage";
import { useState,useEffect} from "react";

const str = "/Clients/";
const rgx = new RegExp(str);

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function RoutesWithAnimation({setHiddenMenu}) {
  const location = useLocation();
  useEffect(() => {
    setHiddenMenu(rgx.test(location.pathname)); 
  },[location])

  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/clients" >
        <Route index={true} element={<Clients />} />
        <Route path=":clientId" element={<InfoPageRoute />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

function App() {
  const [hiddenMenu,setHiddenMenu] = useState(false);

  return (
    <div className="App">
    <LoaderProvider>
      <BrowserRouter>
      {!hiddenMenu && <NavBar />}
        <LocationProvider>
          <RoutesWithAnimation setHiddenMenu={setHiddenMenu}></RoutesWithAnimation>
        </LocationProvider>
      </BrowserRouter>
    </LoaderProvider>
    </div>
  );
}

export default App
