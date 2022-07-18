import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    MapConsumer,
    Marker,
    Popup,
} from "react-leaflet";
import L from "leaflet";
import Proj from "proj4leaflet";
import { CRS } from 'leaflet';


function GetIcon(){
    return L.icon({
        iconUrl: require("../static/marker-beacon.png"),
        iconSize: [15, 80]
    })
}


//Componente funcional -> 
function Map(props) {

    const navigate = useNavigate();




    // const [nicToSend, setNicToSend] = useState("");
    // const [emailToSend, setEmailToSend] = useState("");
    // const [claseToSend, setClaseToSend] = useState("");
    const [weapon, setWeapon] = useState("");
    const [response, setResponse] = useState("");
    const [armas, setArmas] = useState("");
    const [nombres, setNombres] = useState([]);
    const [clases, setClases] = useState([]);
    const [pesos, setPesos] = useState([]);
    const [xS, setXS] = useState([]);
    const [yS, setYS] = useState([]);

    var names = []
    var classes = []
    var weights = []
    var xs = []
    var ys = []

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ weapon: 'hol' }),
        };


        fetch("allWeapons", requestOptions)
            .then((response) => response.json())


            .then(async (res) => {

                for (let i = 0; i < 35; i++) {

                    names.push(res.datos[i].nombre)
                    classes.push(res.datos[i].clase)
                    weights.push(res.datos[i].peso)
                    xs.push(res.datos[i].x)
                    ys.push(res.datos[i].y)
                }




                setNombres(names)
                setClases(classes)
                setPesos(weights)
                setXS(xs)
                setYS(ys)

            })


    }, []);

    let newNames = nombres.slice(0, 36)
    let newClasses = clases.slice(0, 36)
    let newWeights = pesos.slice(0, 36)
    let newXs = xS.slice(0, 36)
    let newYs = yS.slice(0, 36)

    console.log(newNames)
    const acquireWeapon = () => {
        if (localStorage.getItem('infoUser') != null) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ weapon: weapon, user: JSON.parse(localStorage.getItem('infoUser')).nic }),
            };



            fetch("weapon", requestOptions)
                .then((response) => response.json())


                .then((res) => {

                    console.log(weapon)
                    setResponse(res.message)



                })

        } else { setResponse('You need to be logged in') }



    };


    // useEffect(() =>{
    //     localStorage.setItem('infoUser',JSON.stringify(infoUser) )
    // },[infoUser])

    const position = [30, -15]
    const palabra = ['hola', 'adiós']


    return (


        <div >
            <Navbar />




            <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} minZoom={2} maxZoom={6} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="./MAP/{z}/{x}/{y}.jpg"
                />
                {newNames.map((value, index) => {
                    return <Marker position={[newYs[index], newXs[index]]} icon={GetIcon()} eventHandlers={{
                        click: (e) => {
                            setWeapon(value)
                        },
                    }}>
                        <Popup>
                        {response ? response : value} <button onClick={() => {
                            acquireWeapon()
                        }}>Mark as acquired</button>
                        </Popup>
                    </Marker>
                })}
               

            </MapContainer>

        </div>
    )
}
export default Map;