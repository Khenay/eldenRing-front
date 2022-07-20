import React, { Component } from "react";
import { BrowserRouter, Link, Navigate } from "react-router-dom";

class Navbar extends Component {

    render() {
        var registrado = JSON.parse(localStorage.getItem('infoUser'))
        return (
            <div>
                <nav class="navWeb">
                    <ul>
                        <li><Link to={"/contact"} id="historia">Contact us</Link></li>
                        {localStorage.getItem('infoUser') ? registrado.nic != undefined ? <li><Link to={"/profile"} id="contacto">{registrado.nic}</Link></li> : '' : ''}
                        {localStorage.getItem('infoUser') ? ''
                            : <li><Link to={"/login"} id="hobbies">Loggin</Link></li>}
                        {localStorage.getItem('infoUser') ? ''
                            : <li><Link to={"/register"} id="historia">Register</Link></li>}
                        <li><Link to={"/map"} id="historia">Map</Link></li>
                        <li><Link to={"/home"} id="historia">Home</Link></li>

                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar;