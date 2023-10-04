import { useCallback, useContext, useState } from "react";
import "../styles/radioswitch.css";
import { AppContext } from "./AppContext";
import { CLIENT_CARD_OPTION } from "./AppContext";

const labelText = `Developer mode`

export const RadioSwitch = () =>{
    const context = useContext(AppContext);
    const [sheetIsChecked,setSheetIsChecked] = useState(context.clientCard === CLIENT_CARD_OPTION.SHEET);
   
    const handleSelectionChanged = useCallback( event =>{
        const id = event.target.id;
        setSheetIsChecked(id === "sheet");
        setTimeout(delayRefreshOfPage,200,id)
    },[context])

    function delayRefreshOfPage(id){
        switch(id){
            case "sheet":
            context.setClientCard(CLIENT_CARD_OPTION.SHEET);
            break;
            default:
            context.setClientCard(CLIENT_CARD_OPTION.ROUTE);
            break;
        }
    }

    return(
        <div className="radio-container">
            <div>
                <span style={{fontWeight:500}}>{labelText}</span>
                <label>
                    <input type="radio" id="sheet" name="radio" checked={sheetIsChecked} onChange={handleSelectionChanged}/>
                    <span >Sheet</span>
                </label>
                <label>
                    <input type="radio" id="route" name="radio" checked={!sheetIsChecked} onChange={handleSelectionChanged}/>
                    <span>Route</span>
                </label>
            </div>
        </div>
    )
}