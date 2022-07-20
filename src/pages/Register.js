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
    const [clases, setClases] = useState("");
   

    useEffect(() => {



        fetch("listaClases", { method: "POST" })
            .then((res) => res.json(res))
            .then((res) => setClases(res.data));
    }, []);

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

    console.log(clases)
    return (


        <div >

            <Navbar />
            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">Register</h1>


                <input onChange={(e) => setNicToSend(e.target.value)} class="imput" type="text" name="user" id="user" placeholder="Nic" minlength="1" maxlength="15"
                    spellcheck="false" required></input>

                <input onChange={(e) => setEmailToSend(e.target.value)} class="imput" type="email" name="email" id="email" placeholder="Email" required></input>
                
                <select onClick={(e) => setClaseToSend(e.target.value)} class="imput"  name="emailConf" id="emailConf" required>
                
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

                <input onChange={(e) => setPassToSend(e.target.value)} class="imput" type="password" name="passFr" id="passFr" placeholder="Password" autocomplete="off" required>

                </input>

                <p id="registroMal"> {confirm} </p>

                {nicToSend && emailToSend && claseToSend && passToSend ? <button onClick={() => sendData()} id="registrarUser" class="submitBtn" >Registrarse</button> : ''}



            </div>
            
        </div>
    )
}
export default Register;