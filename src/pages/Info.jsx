import { CoorTransition } from "../components/transition";
import {useLocation} from 'react-router-dom';
import '../styles/info.css';
import AsyncImage from "../helper/asyncimage"
import { BackButton } from '../components/backbutton';
import { routeTransitionSpringFromBottom } from "../helper/transitiontypes";
import { useNavigate } from "react-router-dom";
import logo_pawn from "../assets/dogpawn.png";

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
  

function headSub(head,sub){
  return <div className="header-subheader">
            <h4 >{head}</h4>
            <h5 >{sub}</h5>
          </div>
}

// SHEET
export const InfoPageSheet = ({client,closeSheet}) => {
  const body = () =>{
    return(
      <div className="client-info-body" >
        <BackButton icon= {String.fromCharCode(0x24E7)} title="" label={client.name} onCloseAction={closeSheet}/>
        <div className="client-top-header">
          <div className="client-image-container"> <AsyncImage src={client.img}></AsyncImage> </div>
          <div className="client-label"> <label>ABOUT ME!</label> </div>
        </div>
          
        <div className="client-data-grid"> 
            <div className="grid-row-dog">
              {headSub("Sex:","Female")} 
              {headSub("Age:","4 years old")} 
              {headSub("Breed:","Akita")} 
              {headSub("Present:","Yes")} 
              {headSub("Chipnumber:","12345-6789-addf")} 
              {headSub("Age:","4 years old")}      
            </div>
            <div className="grid-row-owner">
              {headSub("Owner:","Fredrik Sundström")} 
              {headSub("Phonenumber:","070 - 55 98 465")}    
            </div>
            <div className="grid-row-logo">
              <img className="image-pawn" src={logo_pawn}></img>    
            </div>
        </div>
        
      </div>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
  };
  

/**<img src="../src/assets/dogpawn.png"></img> */