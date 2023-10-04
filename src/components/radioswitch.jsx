import { useCallback, useContext } from "react";
import "../styles/radioswitch.css";
import { AppContext } from "./AppContext";
import { CLIENT_CARD_OPTION } from "./AppContext";

const labelText = `(Developer mode)`

export const RadioSwitch = () =>{
    const context = useContext(AppContext);

    const handleSelectedChange = useCallback(event => {
        const id = event.target.id;
        switch(id){
            case "sheet":
            context.setClientCard(CLIENT_CARD_OPTION.SHEET);
            break;
            default:
            context.setClientCard(CLIENT_CARD_OPTION.ROUTE);
            break;
        }
        
    },[context])

  

    return(
    <div className="radio-container">
        <div>
            <span style={{fontWeight:500}}>{labelText}</span>
            <label>
                <input type="radio" id="sheet" name="radio" checked={context.clientCard === CLIENT_CARD_OPTION.SHEET} onChange={handleSelectedChange}/>
                <span >Sheet</span>
            </label>
            <label>
                <input type="radio" id="route" name="radio" checked={context.clientCard === CLIENT_CARD_OPTION.ROUTE} onChange={handleSelectedChange}/>
                <span>Route</span>
            </label>
        </div>
    </div>
    )
}