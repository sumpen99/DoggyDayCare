import { CoorTransition } from "../components/transition";
import '../styles/home.css';
import { routeTransitionSpring,routeTransitionEase,routeTransitionBlackBox } from "../helper/transitiontypes";



const Home = () => {

  const body = () =>{
    return(
      <div 
        className="container-img"> 
        <img 
          src="./src/assets/dogs.png">
        </img> 
      </div>
    )
  }
  
  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionSpring}/>
  );
};
  
export default Home;