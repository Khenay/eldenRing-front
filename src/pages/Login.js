import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UseLogin from "../hooks/useLogin";

//Componente funcional -> 
function Login(props) {

    const navigate = useNavigate();

    const [emailLog, setEmailLog] = useState("");
    const [passLog, setPassLog] = useState("");
    const [infoUser, setInfoUser] = useState(""); 

    const [confirm, setConfirm] = useState("");
    
    
    useEffect(() => {
        setConfirm(localStorage.getItem('usuario'));
    }, []);

    const sendLog = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailLog, pass: passLog }),
        };
    
    
        fetch("login", requestOptions)
            .then((response) => response.json())
    
    
            .then((res) => {
    
                setInfoUser(res)
    
                return res
    
            })
            .then((res) => {
                localStorage.setItem('infoUser', JSON.stringify(res))
                localStorage.removeItem('usuario')
                return res
            })
            .then((res) => {
                if (res.message == 'right') { navigate("/profile") }
            })
    
    
    
    };

    const retrieve = () => {
      
        navigate("/recovery")


    };

    return (


        <div >
            <Navbar />

            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">Loggin</h1>


                {confirm ? <p id='registroBien'>Welcome, {confirm}</p> : ''}

                <input onChange={(e) => setEmailLog(e.target.value)} class="imput" type="email" name="email" id="email" placeholder="Email" required></input>



                <input onChange={(e) => setPassLog(e.target.value)} class="imput" type="password" name="passFr" id="passFr" placeholder="Password" autocomplete="off"></input>

                {infoUser.message == 'wrong' ? <p id="registroMal">Incorrect email or password</p> : ''}

                <button onClick={() => sendLog()} id="registrarUser" class="submitBtn" >Log</button>

                <p id="cabezaRegistro" class="cabezaLog" ><a onClick={() => retrieve()}>Did you forget your password? Click here</a></p>



            </div>


        </div>
    )
}
export default Login;