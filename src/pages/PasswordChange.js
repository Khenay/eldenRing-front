import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { scraping } from "../../../controllers/user.controllers";

//Componente funcional -> 
function PasswordChange(props) {

    let navigate = useNavigate();

    const { email, token } = useParams()
    const [pass, setPass] = useState("")
    
    const [message, setMessage] = useState("")







    const changePass = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, pass: pass, token: token }),
        };



        fetch("recoveryReset", requestOptions)
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


            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">{message ? message : 'Retrieve Password'}</h1>



                


                <input onChange={(e) => setPass(e.target.value)} class="imput" type="password" name="email" id="email" placeholder="new password" required></input>


                <button onClick={() => changePass()} id="registrarUser" class="submitBtn" >Retrieve password</button>


            </div>


        </div>
    )
}
export default PasswordChange;