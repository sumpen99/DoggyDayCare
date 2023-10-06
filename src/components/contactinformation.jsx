import "../styles/contactinformation.css"

export const ContactInformation = () =>{

    return(
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
    )
}