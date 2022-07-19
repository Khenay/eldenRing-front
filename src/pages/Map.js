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


function GetIcon() {
    return L.icon({
        iconUrl: require("../static/marker-beacon.png"),
        iconSize: [15, 80]
    })
}

function GetIconL() {
    return L.icon({
        iconUrl: require("../static/location-site-of-grace-direction.png"),
        iconSize: [25, 80]
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

    const [nombresL, setNombresL] = useState([]);
    const [clasesL, setClasesL] = useState([]);
    const [pesosL, setPesosL] = useState([]);
    const [xSL, setXSL] = useState([]);
    const [ySL, setYSL] = useState([]);

    var names = []
    var classes = []
    var weights = []
    var xs = []
    var ys = []

    var namesL = []
    var classesL = []
    var weightsL = []
    var xsL = []
    var ysL = []

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ weapon: 'hol' }),
        };


        fetch("allWeapons", requestOptions)
            .then((response) => response.json())


            .then(async (res) => {
                console.log(res)
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


                return res
            })
            .then(async (res) => {
                console.log(res)
                for (let i = 0; i < 9; i++) {

                    namesL.push(res.datosL[i].nombre)
                    classesL.push(res.datosL[i].clase)
                    weightsL.push(res.datosL[i].peso)
                    xsL.push(res.datosL[i].x)
                    ysL.push(res.datosL[i].y)



                }


                setNombresL(namesL)
                setClasesL(classesL)
                setPesosL(weightsL)
                setXSL(xsL)
                setYSL(ysL)



            })


    }, []);


    let newNames = nombres.slice(0, 36)
    let newClasses = clases.slice(0, 36)
    let newWeights = pesos.slice(0, 36)
    let newXs = xS.slice(0, 36)
    let newYs = yS.slice(0, 36)

    console.log(nombres)
    console.log(xS)
    console.log(yS)

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


    const acquireLegendaryWeapon = () => {
        if (localStorage.getItem('infoUser') != null) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ weapon: weapon, user: JSON.parse(localStorage.getItem('infoUser')).nic }),
            };



            fetch("legendaryWeapon", requestOptions)
                .then((response) => response.json())


                .then((res) => {

                    console.log(weapon)
                    setResponse(res.message)



                })

        } else { setResponse('You need to be logged in') }



    };

    return (


        <div >
            <Navbar />




            <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} minZoom={2} maxZoom={6} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="./MAP/{z}/{x}/{y}.jpg"
                />
                {nombres.map((value, index) => {
                    return <Marker position={[yS[index], xS[index]]} icon={GetIcon()} eventHandlers={{
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

                {nombresL.map((value, index) => {
                    return <Marker position={[ySL[index], xSL[index]]} icon={GetIconL()} eventHandlers={{
                        click: (e) => {
                            setWeapon(value)
                        },
                    }}>
                        <Popup>
                            {response ? response : value} <button onClick={() => {
                                acquireLegendaryWeapon()
                            }}>Mark as acquired</button>
                        </Popup>
                    </Marker>
                })}


            </MapContainer>

        </div>
    )
}
export default Map;