import "../styles/contact.css"
import { CoorTransition } from "../components/transition";
import { routeTransitionOpacity,routeTransitionEase } from "../helper/transitiontypes";

const Contact = () => {
  
  const body = () =>{
    return(
      <div className="container-body-contact">
      <h1>Contact</h1>
    </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );
};
  
export default Contact;