import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { scraping } from "../../../controllers/user.controllers";

//Componente funcional -> 
function PasswordRecovery(props) {


    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // const {email, token}= useParams()
    // const [pass, setPass]= useState("")
    // const [message, setMessage]= useState("")







    const sendEmail = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
        };



        fetch("recovery", requestOptions)
            .then((response) => response.json())


            .then((res) => {

                setMessage(res.message)

            })




    };

    // useEffect(() =>{
    //     localStorage.setItem('infoUser',JSON.stringify(infoUser) )
    // },[infoUser])



    return (


        <div >
            <Navbar />

            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">{ message ? message : 'Retrieve Password'}</h1>




                <input onChange={(e) => setEmail(e.target.value)} class="imput" type="email" name="email" id="email" placeholder="Email" required></input>


                <button onClick={() => sendEmail()} id="registrarUser" class="submitBtn" > I need my password!</button>


            </div>


        </div>
    )
}
export default PasswordRecovery;