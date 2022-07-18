import React, { useState, useEffect } from "react";
// import { scraping } from "../../../controllers/user.controllers";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PaginatedItems from "./Paginado";

//Componente funcional -> 
function Profile(props) {

    let navigate = useNavigate();
    // const [nicToSend, setNicToSend] = useState("");
    // const [emailToSend, setEmailToSend] = useState("");
    // const [claseToSend, setClaseToSend] = useState("");
    // const [passToSend, setPassToSend] = useState("")

    // const [emailLog, setEmailLog] = useState("");
    // const [passLog, setPassLog] = useState("");

    const [nicProfile, setNicProfile] = useState("");
    const [buildProfile, setBuildProfile] = useState("");


    const [weapon, setWeapon] = useState("");
    const [clase, setClase]= useState("");
    const [weight, setWeight]= useState("");

    const [weapon1, setWeapon1] = useState("");
    const [clase1, setClase1]= useState("");
    const [weight1, setWeight1]= useState("");

    const [weapon2, setWeapon2] = useState("");
    const [clase2, setClase2]= useState("");
    const [weight2, setWeight2]= useState("");



    useEffect(() => {
        setNicProfile(JSON.parse(localStorage.getItem('infoUser')).nic);
        setBuildProfile(JSON.parse(localStorage.getItem('infoUser')).build);

        // const clase= buildProfile
        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: JSON.parse(localStorage.getItem('infoUser')).nic}),
        };

    

        fetch("profileWeapon", requestOptions)
            .then((response) => response.json())


            .then((res) => {
                

                

               setWeapon(res.datos[0].nombre)
               setClase(res.datos[0].clase)
               setWeight(res.datos[0].peso)

               setWeapon1(res.datos[1].nombre)
               setClase1(res.datos[1].clase)
               setWeight1(res.datos[1].peso)

               setWeapon2(res.datos[2].nombre)
               setClase2(res.datos[2].clase)
               setWeight2(res.datos[2].peso)



            })

    }, []);


    const logout = () => {
        localStorage.removeItem('infoUser');
        navigate("/home")




    };


    return (


        <div >
            <Navbar />

            <div class="registro" id="registro">
                <h1 id="cabezaRegistro" class="cabezaLog">Profile</h1>
                {/* nic */}
                <p>{nicProfile}</p>
                {/* build */}
                <p>{buildProfile}</p>

                {buildProfile == 'Warrior' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/warrior_class_elden_ring_wiki_guide_200px.png'></img> :
                    buildProfile == 'Astrologer' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/astrologer_class_elden_ring_wiki_guide_200px.png'></img> :
                        buildProfile == 'Hero' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/hero_class_elden_ring_wiki_guide_200px.png'></img> :
                            buildProfile == 'Bandit' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/bandit_class_elden_ring_wiki_guide_200px.png'></img> :
                                buildProfile == 'Prisoner' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/prisoner_class_elden_ring_wiki_guide_200px.png'></img> :
                                    buildProfile == 'Confessor' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/confessor_class_elden_ring_wiki_guide_200px.png'></img> :
                                        buildProfile == 'Vagabond' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/vagabond_class_elden_ring_wiki_guide_200px.png'></img> :
                                            buildProfile == 'Prophet' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/prophet_class_elden_ring_wiki_guide_200px.png'></img> :
                                                buildProfile == 'Samurai' ? <img src='https://eldenring.wiki.fextralife.com/file/Elden-Ring/samurai_class_elden_ring_wiki_guide_200px.png'></img> : ''
                }
                <button onClick={() => logout()} id="registrarUser" class="submitBtn" >Desconectar</button>
            </div>
            

            {weapon ? <PaginatedItems itemsPerPage={1} /> : ''}
            

            

               
        </div>
    )
}
export default Profile;