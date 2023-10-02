import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./helper/gloaballoading";
import NavBar from "./navigation/NavBar";
import Home from "./pages/Home";
import ClientsSheet from "./pages/ClientsSheet";
import ClientsRoute from "./pages/ClientsRoute";
import Contact from "./pages/Contact";
import {InfoPageRoute} from "./pages/Info";
import Error from "./pages/Error";
import { useState,useEffect} from "react";

const LOAD_SHEET = true;
const str = "/Clients/";
const rgx = new RegExp(str);

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function RoutesWithAnimationAndRoutClients({setHiddenMenu}) {
  const location = useLocation();
  useEffect(() => {
    setHiddenMenu(rgx.test(location.pathname)); 
  },[location])

  return (
    <Routes location={location} key="default">
      <Route path="/DoggyDayCare/" element={<Home />} />
      <Route path="/DoggyDayCare/clients" >
        <Route index={true} element={<ClientsRoute />} />
        <Route path=":clientId" element={<InfoPageRoute />} />
      </Route>
      <Route path="/DoggyDayCare/contact" element={<Contact />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function RoutesWithAnimationAndSheetClients() {
  const location = useLocation();
  return (
    <Routes location={location} key="default">
      <Route path="/DoggyDayCare/" element={<Home />} />
      <Route path="/DoggyDayCare/clients" element={<ClientsSheet />} />
      <Route path="/DoggyDayCare/contact" element={<Contact />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
 
}

function App() {
  const [hiddenMenu,setHiddenMenu] = useState(false);

  // SHEET WAY
  if(LOAD_SHEET){
    return (
      <div className="App">
      <LoaderProvider>
        <BrowserRouter basename="">
        <NavBar/>
          <LocationProvider>
            <RoutesWithAnimationAndSheetClients/>
          </LocationProvider>
        </BrowserRouter>
      </LoaderProvider>
      </div>
    );
  }

  // ROUTE WAY
  return (
    <div className="App">
    <LoaderProvider>
      <BrowserRouter basename="/DoggyDayCare">
      {!hiddenMenu && <NavBar />}
        <LocationProvider>
          <RoutesWithAnimationAndRoutClients setHiddenMenu={setHiddenMenu}></RoutesWithAnimationAndRoutClients>
        </LocationProvider>
      </BrowserRouter>
    </LoaderProvider>
    </div>
  );
}

export default App
