import React, { Fragment, useEffect } from 'react';
import './ContactOptions.css';
import  WhatsAppIcon  from '@material-ui/icons/WhatsApp';

const ContactOptions = () => {

  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/65f310418d261e1b5f6da640/1hounf0ck';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);

    return () => {
      // Clean up the script when the component unmounts
      s1.parentNode.removeChild(s1);
    };
  }, []);

  return (
    <Fragment>
        <div className="contactOptionsContainer">
            <a href="https://wa.me/+923701067949?text=yourmessage" target="blank" className="whtButton"><WhatsAppIcon/></a>
        </div>
    </Fragment>
  )
}

export default ContactOptions