import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { scraping } from "../../../controllers/user.controllers";

//Componente funcional -> 
function Home(props) {

    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(localStorage.getItem('infoUsuario').nic)
    // }, [])

    // const [nicToSend, setNicToSend] = useState("");
    // const [emailToSend, setEmailToSend] = useState("");
    // const [claseToSend, setClaseToSend] = useState("");
    // const [passToSend, setPassToSend] = useState("");



    return (


        <div >

            <Navbar />
            {/* si tengo account que salga el nombre y si no perfil */}
            <div id="eldenRing">

                <img src="https://i.ibb.co/Qkrb2hq/Erdtree-1-5.webp" id="eye"></img>



                <img src="https://static.bandainamcoent.eu/high/elden-ring/elden-ring/00-page-setup/eldenring_new.png" id="heaven"></img>
            </div>





        </div>
    )


};





export default Home;