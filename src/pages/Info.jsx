import {useLocation} from 'react-router-dom';
import { CoorTransition } from "../components/transition";
import '../styles/info.css';
import AsyncImage from "../helper/asyncimage"
import { BackButton } from '../components/backbutton';
import { routeTransitionSpringFromBottom } from "../helper/transitiontypes";

const Info = () => {
  const location = useLocation();
  const client = location.state.client;
  const body = () =>{
    return(
      <div className="client-info-body" >
        <BackButton icon= {String.fromCharCode(0xab)} title=" Clients" label={client.name}/>
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
  
export default Info;