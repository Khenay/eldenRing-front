import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Map from "../pages/Map";
import PaginatedItems from '../pages/Paginado'
import PasswordRecovery from '../pages/PasswordRecovery'
import PasswordChange from '../pages/PasswordChange'


// import Contact from "../pages/Contact";
class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Routes>
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="home" element={<Home />} />
                <Route path="map" element={<Map />} />
                <Route path='/paginado' element={<PaginatedItems />}/>
                <Route path='/recovery' element={<PasswordRecovery />}/>
                <Route path='/recoveryReset/:email/:token' element={<PasswordChange />}/>
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </div>
        );
    }
}
export default Main;