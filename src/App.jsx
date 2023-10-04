import { Routes, Route,useLocation,HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoaderProvider } from "./helper/gloaballoading";
import NavBar from "./navigation/NavBar";
import Home from "./pages/Home";
import ClientsSheet from "./pages/ClientsSheet";
import ClientsRoute from "./pages/ClientsRoute";
import Contact from "./pages/Contact";
import {InfoPageRoute} from "./pages/Info";
import Error from "./pages/Error";
import { useState,useEffect,useContext} from "react";
import { AppContext,CLIENT_CARD_OPTION } from "./components/AppContext";

const str = "/Clients/";
const rgx = new RegExp(str);

function LocationProvider({ children }) {
  return <AnimatePresence >{children}</AnimatePresence>;
}

function RoutesWithAnimationAndRoutClients() {
  const location = useLocation();
  const context = useContext(AppContext);
  useEffect(() => {
    context.setHiddenMenu(rgx.test(location.pathname)); 
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

const SheetCardApp = () =>{

  return(
    <LoaderProvider>
      <HashRouter >
      <NavBar/>
        <LocationProvider>
          <RoutesWithAnimationAndSheetClients/>
        </LocationProvider>
      </HashRouter>
    </LoaderProvider>
  )
}

const RouteCardApp = () =>{
  const context = useContext(AppContext);
  const [hiddenMenu,setHiddenMenu] = useState(false);

  return(
    <LoaderProvider>
        <HashRouter>
        {!context.hiddenMenu && <NavBar/>}
          <LocationProvider>
            <RoutesWithAnimationAndRoutClients ></RoutesWithAnimationAndRoutClients>
          </LocationProvider>
        </HashRouter>
    </LoaderProvider>
  )
}

const BaseCardApp = () =>{
  const appContext = useContext(AppContext);
  return (
    <div className="App">
      {appContext.clientCard === CLIENT_CARD_OPTION.ROUTE ? (<RouteCardApp/>) : (<SheetCardApp/>)}
    </div>
  )

}

function App() {
  const [clientCard, setClientCard] = useState(CLIENT_CARD_OPTION.ROUTE);
  const [reloadData, setReloadData] = useState(true);
  const [hiddenMenu,setHiddenMenu] = useState(false);

  return (
    <AppContext.Provider value={{clientCard,setClientCard,reloadData,setReloadData,hiddenMenu,setHiddenMenu}}>
      <BaseCardApp/>
    </AppContext.Provider>
    
  );
}
export default App
