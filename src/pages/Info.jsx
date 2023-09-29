import {useLocation} from 'react-router-dom';
import { CoorTransition } from "../components/transition";
import '../styles/info.css';
import { routeTransitionSpring,routeTransitionEase,routeTransitionOpacity } from "../helper/transitiontypes";

const Info = () => {
  const location = useLocation();
  
  const body = () =>{
    return(
      <h1 > Info about {location.state.client.name} </h1>
    )
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionOpacity}/>
  );
  };
  
export default Info;