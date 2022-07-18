import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UseLogin = ( ) => {

  const navigate = useNavigate();

  

  const [emailLog, setEmailLog] = useState("");
  const [passLog, setPassLog] = useState("");
  const [infoUser, setInfoUser] = useState("");  
  
  

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

  return [setEmailLog, setPassLog, infoUser, sendLog()];
};

export default UseLogin;