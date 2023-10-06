import { CoorTransition } from "../components/transition";
import {useLocation} from 'react-router-dom';
import '../styles/info.css';
import AsyncImage from "../helper/asyncimage"
import { BackButton,PageHeader } from '../components/backbutton';
import { routeTransitionSpringFromBottom } from "../helper/transitiontypes";
import { useNavigate } from "react-router-dom";
import logo_pawn from "../assets/dogpawn.png";
import { capitalizeFirstLetter } from '../helper/core';

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
      <ClientInfoBody client={client} action={handleNavigateBack} addBackButton={false}/>
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
      <ClientInfoBody client={client} action={closeSheet} addBackButton={true}/>
    );
  }

  return (
    <CoorTransition page={body} name="info trans" transition={routeTransitionSpringFromBottom}/>
  );
  };
  

  const ClientInfoBody = ({client,action,addBackButton}) => {
    return (<div className="client-info-body" >
    {addBackButton && <BackButton icon= {String.fromCharCode(0x24E7)} label={client.name} onCloseAction={action}/>}
    {!addBackButton && <PageHeader label={client.name}/>}
    <div className="client-top-header">
      <div className="client-image-container"> <AsyncImage src={client.img}></AsyncImage> </div>
      <div className="client-label"> <label>ABOUT ME!</label> </div>
    </div>
      
    <div className="client-data-grid"> 
        <div className="grid-row-dog">
          {headSub("Sex:",client.sex)} 
          {headSub("Age:",client.age + " years")} 
          {headSub("Breed:",client.breed)} 
          {headSub("Present:",client.present ? "Yes" : "No")} 
          {headSub("Chipnumber:",client.chipNumber)} 
        </div>
        <div className="grid-row-owner">
          {headSub("Owner:",client.owner.name,client.owner.lastName)} 
          {headSub("Phonenumber:",client.owner.phoneNumber)}    
        </div>
        <div className="grid-row-logo">
          <img className="image-pawn" src={logo_pawn}></img>    
        </div>
    </div>
    
  </div>)
  }


  function headSub(head,sub,optional = null){
    let headNew = head;
    let subNew = sub;
    if(optional){
      let first = capitalizeFirstLetter(sub);
      let second = capitalizeFirstLetter(optional);
      subNew = first + " " + second; 
  
    }
    return <div className="header-subheader">
              <h4 >{capitalizeFirstLetter(headNew)}</h4>
              <h5 >{capitalizeFirstLetter(subNew)}</h5>
            </div>
  }