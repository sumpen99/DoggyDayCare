import "../styles/backbutton.css"
export const BackButton = ({icon,title,label,action}) => {

    return (
          <div className="backbutton-body">
            <button className="backbutton" onMouseDown={action}>
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