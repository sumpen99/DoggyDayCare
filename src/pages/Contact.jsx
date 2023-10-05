import "../styles/contact.css"
import { CoorTransition } from "../components/transition";
import { routeTransitionEase } from "../helper/transitiontypes";
import logo from "../assets/dogpawngrey.png";
const Contact = () => {
  
  const handleAction = event =>{
    console.log(event.target);
    /*alert('Submitted');
    <form  action="url of choice" method="POST" onSubmit={handleAction}>
    */
    event.preventDefault();
  }

  const body = () =>{
    return(
      <div className="container-body-contact">
        <section className="banner">
          <img src={logo} alt=""/>
          <h1>Get in Touch With Us</h1>
          <p>We're here to answer any questions you may have.</p>
        </section>
        <section className="contact-form">
          <div className="form-container">
              <h2>Your Details</h2>
              <form onSubmit={handleAction}>
  
                  <label type="name">Name: </label>
                  <input type="text" id="name" name="name" required/>
  
                  <label type="email">Email: </label>
                  <input type="email" id="email" name="email" required/>
  
                  <label type="phone">Phone: </label>
                  <input type="tel" id="phone" name="phone"/>
  
                  <label type="message">Message: </label>
                  <textarea id="message" name="message" rows="4" required/>
  
                  <button type="submit" className="submit-button">Submit</button>
              </form>
          </div>
        </section>
  
      <section className="contact-info">
          <h2>Contact Information</h2>
          <address>
            DoggyDayCare<br/>
            Muraregatan 14A<br/>
            Sweden, Karlstad 652 28<br/>
            Phone: <a href="tel:0705598465">070-55 98 465</a><br/>
            Email: <a href="mailto:contact@doggydaycare.com">contact@doggydaycare.com</a>
          </address>
          <a href="https://www.google.com/maps/search/?api=1&query=59.3773681%2C13.4880617">View on map</a>
      </section>
  
    
      <footer>
          <p>© 2023 DoggyDayCare. All rights reserved.</p>
      </footer>

    </div>
    )
  }

  return (
    <CoorTransition page={body} name="home trans" transition={routeTransitionEase}/>
  );
};
  
export default Contact;
