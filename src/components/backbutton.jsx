import { useNavigate } from "react-router-dom";
import "../styles/backbutton.css"
export const BackButton = ({icon,title,label}) => {
    const navigate = useNavigate();
    return (
          <div className="backbutton-body">
            <button className="backbutton" onClick={() => navigate(-1)}>
              <div className="backbutton-container">
                <h2>{icon}</h2>
                <h3>{title}</h3>
              </div>
            </button>
            <div className="backbutton-label">
              <h3 >{label}</h3>
            </div>
         </div>
      
    );
};