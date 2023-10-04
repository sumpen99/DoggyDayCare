import { CoorTransition } from "../components/transition";
import {useLocation} from 'react-router-dom';
import '../styles/info.css';
import AsyncImage from "../helper/asyncimage"
import { BackButton } from '../components/backbutton';
import { routeTransitionSpringFromBottom } from "../helper/transitiontypes";
import { useNavigate } from "react-router-dom";

// ROUTE
export const InfoPageRoute = () => {
  const location = useLocation();
  const client = location.state.client;
  const navigate = useNavigate();
 
  const handleNavigateBack = event =>{
    navigate(-1);
  }

  const body = () =>{
    return(
      <div className="client-info-body" >
        <BackButton icon= {String.fromCharCode(0x24E7)} title="" label={client.name} onCloseAction={handleNavigateBack}/>
        <div className="client-info-content" >
          <div className="client-image-rounded"> <AsyncImage src={client.img}></AsyncImage> </div>
        </div>
      </div>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
  };
  

// SHEET
export const InfoPageSheet = ({client,closeSheet}) => {
  const body = () =>{
    return(
      <div className="client-info-body" >
        <BackButton icon= {String.fromCharCode(0x24E7)} title="" label={client.name} onCloseAction={closeSheet}/>
        <div className="client-info-content" >
          <div className="client-image-rounded"> <AsyncImage src={client.img}></AsyncImage> </div>
        </div>
      </div>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
  };
  

