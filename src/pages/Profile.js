import React, { useState, useEffect } from "react";
// import { scraping } from "../../../controllers/user.controllers";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PaginatedItems from "./Paginado";
import PaginatedItemsL from "./PaginadoL";

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
    const [weaponL, setWeaponL] = useState("");

    const [clase, setClase] = useState("");
    const [weight, setWeight] = useState("");

    const [itemsPerPage, setItemsPerPage] = useState(1)



    useEffect(() => {
        setNicProfile(JSON.parse(localStorage.getItem('infoUser')).nic);
        setBuildProfile(JSON.parse(localStorage.getItem('infoUser')).build);

        // const clase= buildProfile

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: JSON.parse(localStorage.getItem('infoUser')).nic }),
        };



        fetch("profileWeapon", requestOptions)
            .then((response) => response.json())


            .then((res) => {

                console.log(res.datos)

                
                setWeapon(res.datos[0].nombre)
                setClase(res.datos[0].clase)
                setWeight(res.datos[0].peso)





            })

        const requestOptions1 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: JSON.parse(localStorage.getItem('infoUser')).nic }),
        };

        fetch("profileWeaponL", requestOptions1)
            .then((response) => response.json())


            .then((res) => {


                console.log(res.datos[0])

                setWeaponL(res.datos[0].nombre)
                // setClase(res.datos[0].clase)
                // setWeight(res.datos[0].peso)





            })

    }, []);

    console.log(weaponL)

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

                {/* <input onChange={(e) => setItemsPerPage(e.target.value)} class="imput" type="number" min='1' max='5' name="email" id="email" placeholder="Weapons to be displayed" required></input> */}

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
            <br></br>
            {weaponL ? <PaginatedItemsL itemsPerPage={1} /> : ''}
            





        </div>
    )
}
export default Profile;