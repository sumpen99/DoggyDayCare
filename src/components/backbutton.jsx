import "../styles/backbutton.css"
export const BackButton = ({icon,title,label,onCloseAction}) => {
    return (
          <div className="backbutton-body">
            <button className="backbutton" onMouseDown={onCloseAction}>
              <div className="backbutton-icon">
                <h2>{icon}</h2>
                <h2>{title}</h2>
              </div>
            </button>
            <div className="backbutton-label">
              <h2 >{label}</h2>
            </div>
         </div>
      
    );
};