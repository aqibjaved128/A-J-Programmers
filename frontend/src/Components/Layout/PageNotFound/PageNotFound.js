import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './PageNotFound.css';
import Logo from '../../../images/404.gif';
import MetaData from '../MetaData/MetaData';


const PageNotFound = () => {
  return (
    <Fragment>
      <MetaData title={`Page Not Found - AJ Programmers`} />
<div className="errorContainer">
    <div className="errorBox">
        <img src={Logo} alt="logo" />
        <h1> Look like you're lost </h1>
        <p>the page you are looking for not avaible!</p>
        <Link to={'/'}>Go to Home</Link>
    </div>
  
</div>


    </Fragment>
  )
}

export default PageNotFound