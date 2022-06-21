import React from "react";

//importamos la carpeta de los logos

import cLogo from "../imagenes/logo.png";

//Importamos estilos
import "../components/styles/Navbar.css";

/* 
class Navbar extends React.Component{

render(){
    return(

        <div className='Navbar'>
            <div className='container-fluid'>
<a className='Navbar__brand' href='/'>
<img className='Navbar__brand-logo' src={cLogo} alt='logito'/>
<span className="font-weight-light">Cine </span>
<span className="font-weight-bold">Express</span>
</a>

</div>
        </div>
    );
} 

} */

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="container-fluid">
        <a className="Navbar__brand" href="/">
          <img className="Navbar__brand-logo" src={cLogo} alt="logito" />
          <span className="font-weight-light">Cine </span>
          <span className="font-weight-bold">Express</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
