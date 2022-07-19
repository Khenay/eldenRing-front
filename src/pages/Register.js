import React, { useState, useEffect } from "react";
// import { scraping } from "../../../controllers/user.controllers";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
//Componente funcional -> 
function Register(props) {
    let navigate = useNavigate();

    const [nicToSend, setNicToSend] = useState("");
    const [emailToSend, setEmailToSend] = useState("");
    const [claseToSend, setClaseToSend] = useState("");
    const [passToSend, setPassToSend] = useState("");
    const [confirm, setConfirm] = useState("");
    // const [emailLog, setEmailLog] = useState("");
    // const [passLog, setPassLog] = useState("");

    // useEffect(() => {

    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ nic: nicToSend, email: emailToSend, build: claseToSend, pass: passToSend }),
    //     };

    //     fetch("change", requestOptions)
    //         .then((res) => res.json(res))
    //         .then((res) => console.log('done'));
    // }, []);

    const sendData = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nic: nicToSend, email: emailToSend, build: claseToSend, pass: passToSend }),
        };



        fetch("register", requestOptions)
            .then((response) => response.json())

            .then((res) => {
                if (res.message == 'right') {
                    localStorage.setItem('usuario', nicToSend)
                }
                return res
            })


            .then((res) => {
                (res.message == 'right') ? navigate("/login") : setConfirm("Either the email or the nic aren't available")
            })




    };

    // const sendLog = () => {
    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email: emailLog, pass: passLog }),
    //     };



    //     fetch("login", requestOptions)
    //         .then((response) => response.json())


    //         .then((res) => console.log(res.message));

    // };

    // const scraping=() => {

    // }

    return (


        <div >

            <Navbar />
            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">Register</h1>


                <input onChange={(e) => setNicToSend(e.target.value)} class="imput" type="text" name="user" id="user" placeholder="Nic" minlength="1" maxlength="15"
                    spellcheck="false" required></input>

                <input onChange={(e) => setEmailToSend(e.target.value)} class="imput" type="email" name="email" id="email" placeholder="Email" required></input>

                <select onClick={(e) => setClaseToSend(e.target.value)} class="imput" type='text' name="emailConf" id="emailConf" placeholder="Build" autocomplete="off" required>
                    <option>Astrologer</option>
                    <option>Warrior</option>
                    <option>Prophet</option>
                    <option>Hero</option>
                    <option>Bandit</option>
                    <option>Prisoner</option>
                    <option>Confessor</option>
                    <option>Wretch</option>
                    <option>Vagabond</option>
                    <option>Samurai</option>
                </select>

                <input onChange={(e) => setPassToSend(e.target.value)} class="imput" type="password" name="passFr" id="passFr" placeholder="Password" autocomplete="off">

                </input>

                <p id="registroMal"> {confirm} </p>

                <button onClick={() => sendData()} id="registrarUser" class="submitBtn" >Registrarse</button>



            </div>
            {/* <button onClick={() => this.props.history.push("/login")}>Take me to login</button> */}




            {/* <label >Nic: <input type='text' onChange={(e) => setNicToSend(e.target.value)} />
            </label>

            <label>Email: <input onChange={(e) => setEmailToSend(e.target.value)} />
            </label>

            <label>Build: <input onChange={(e) => setClaseToSend(e.target.value)} /></label>

            <label>Password: <input onChange={(e) => setPassToSend(e.target.value)} /><span></span> </label>

            <button onClick={() => sendData()}  >Registrarse</button>

            <br></br>

            <label>Email: <input onChange={(e) => setEmailLog(e.target.value)} />
            </label>
            <label>Password: <input onChange={(e) => setPassLog(e.target.value)} /><span></span> </label>
            <button onClick={() => sendLog()}  >Login</button>

            <button onClick={() => scraping()}  >Login</button> */}
        </div>
    )
}
export default Register;