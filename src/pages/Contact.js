import React, { useState, useEffect } from "react";
// import { scraping } from "../../../controllers/user.controllers";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
//Componente funcional -> 
function Contact(props) {


    const [emailContact, setEmailContact] = useState('')
    const [textContact, setTextContact] = useState('')
    const [message, setMessage] = useState('')


    

    const sendContact = () => {

        if (localStorage.getItem('infoUser')) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nic: JSON.parse(localStorage.getItem('infoUser')).nic, text: textContact }),
            }

            fetch("contact", requestOptions)
                .then((response) => response.json())

                .then((res) => {
                    setMessage(res.message)
                })




        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailContact, text: textContact }),
            }
            fetch("contact", requestOptions)
                .then((response) => response.json())

                .then((res) => {
                    setMessage(res.message)
                })



        }


    };


    return (


        <div >

            <Navbar />
            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">Contact us</h1>

                { message ? <p id='registroBien'>{message}</p> : ''}

                {localStorage.getItem('infoUser') ? '' : <input onChange={(e) => setEmailContact(e.target.value)} class="imput" type="email" name="email" id="email" placeholder="Email" required></input>}


                <label class="formLabel">Send us your suggestions and we'll make sure we read them.</label><br />

                <textarea onChange={(e) => setTextContact(e.target.value)} class="imput" type="email" name="email" id="email" placeholder="Type here your suggestions..." spellcheck="true" ></textarea><br />

                <button onClick={() => sendContact()} id="registrarUser" class="submitBtn">Submit</button>



            </div>

        </div>
    )
}
export default Contact;