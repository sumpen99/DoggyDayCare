import { BrowserRouter, Routes, Route,useLocation,HashRouter } from "react-router-dom";
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
      <Route path="/" element={<Home />} />
      <Route path="/clients" >
        <Route index={true} element={<ClientsRoute />} />
        <Route path=":clientId" element={<InfoPageRoute />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function RoutesWithAnimationAndSheetClients() {
  const location = useLocation();
  return (
    <Routes location={location} key="default">
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<ClientsSheet />} />
      <Route path="/contact" element={<Contact />} />
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
        <HashRouter >
        <NavBar/>
          <LocationProvider>
            <RoutesWithAnimationAndSheetClients/>
          </LocationProvider>
        </HashRouter>
      </LoaderProvider>
      </div>
    );
  }

  // ROUTE WAY
  return (
    <div className="App">
    <LoaderProvider>
      <HashRouter>
      {!hiddenMenu && <NavBar />}
        <LocationProvider>
          <RoutesWithAnimationAndRoutClients setHiddenMenu={setHiddenMenu}></RoutesWithAnimationAndRoutClients>
        </LocationProvider>
      </HashRouter>
    </LoaderProvider>
    </div>
  );
}

export default App
