import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./helper/gloaballoading";
import NavBar from "./navigation/NavBar";
import Home from "./pages/Home";
import ClientsSheet from "./pages/ClientsSheet";
import ClientsRoute from "./pages/ClientsRoute";
import Profile from "./pages/Profile";
import {InfoPageRoute} from "./pages/Info";
import NoPage from "./pages/NoPage";
import { useState,useEffect} from "react";

const LOAD_SHEET = true;
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

  // SHEET WAY
  if(LOAD_SHEET){
    return (
      <Routes location={location} key="default">
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientsSheet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    );
  }
 
  // ROUTE WAY
  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/clients" >
        <Route index={true} element={<ClientsRoute />} />
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
