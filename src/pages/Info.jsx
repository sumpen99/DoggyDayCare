import {useLocation} from 'react-router-dom';
import '../styles/info.css';

const Info = () => {
  const location = useLocation();
  console.log(location.state.client.name);
  return (
    <h1 > Info about {location.state.client.name} </h1>
  );
  };
  
export default Info;