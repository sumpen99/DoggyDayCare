import { CoorTransition } from "../components/transition";
import '../styles/home.css';
import { routeTransitionEase } from "../helper/transitiontypes";
import logo from "../assets/dogs.png";
import { RadioSwitch } from "../components/radioswitch";
const Home = () => {

  
  const body = () =>{
    return(
      <div className="container-img"> 
        <img src={logo} alt=""/>
        <RadioSwitch/>
      </div>
    )
  }
  
  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );

  /*return (
    <div className="container-img"> 
        <img src={logo} alt=""/>
        <RadioSwitch/>
      </div>
  );*/
 
};
  
export default Home;
