import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';



// Example items, to simulate fetching from another resources.

var items
var items0
var items1

function Items({ currentItems }) {





    useEffect(() => {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: JSON.parse(localStorage.getItem('infoUser')).nic }),
        };

        fetch("profileWeapon", requestOptions)
            .then((response) => response.json())
            .then((res) => {

                console.log(res.datos)
                for (let i = 0; i < 36; i++) {
                    console.log(res.datos[i])
                    if(res.datos[i] == undefined){
                        localStorage.removeItem(`nombre${i}`);
                        localStorage.removeItem(`clase${i}`);
                        localStorage.removeItem(`peso${i}`);
                    }

                }


                localStorage.setItem('nombre0', res.datos[0].nombre);
                localStorage.setItem('clase0', res.datos[0].clase);
                localStorage.setItem('peso0', res.datos[0].peso);


                localStorage.setItem('nombre1', res.datos[1].nombre);
                localStorage.setItem('clase1', res.datos[1].clase);
                localStorage.setItem('peso1', res.datos[1].peso);

                localStorage.setItem('nombre2', res.datos[2].nombre);
                localStorage.setItem('clase2', res.datos[2].clase);
                localStorage.setItem('peso2', res.datos[2].peso);



            })

    }, [])



    const [card, setCard] = useState(localStorage.getItem('nombre0') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre0')}</p>
        <p>Class: {localStorage.getItem('clase0')}</p>
        <p>Weight: {localStorage.getItem('peso0')}</p>


    </div> : '');

    const [tarjeta1, setTarjeta1] = useState(localStorage.getItem('nombre1') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre1')}</p>
        <p>Class: {localStorage.getItem('clase1')}</p>
        <p>Weight: {localStorage.getItem('peso1')}</p>


    </div> : '');

    const [tarjeta2, setTarjeta2] = useState(localStorage.getItem('nombre2') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre2')}</p>
        <p>Class: {localStorage.getItem('clase2')}</p>
        <p>Weight: {localStorage.getItem('peso2')}</p>


    </div> : '');

    const [hora1, setHora1] = useState("2");

    localStorage.getItem('nombre0') ? items0 = [card] : items0 = []

    localStorage.getItem('nombre1') ? items0 = [card, tarjeta1] : items0 = [card]

    localStorage.getItem('nombre2') ? items0 = [card, tarjeta1, tarjeta2] : items0 = [card, tarjeta1]





    items = [items0, items1]


    return (
        <>
            {currentItems &&
                currentItems.map((item) => (

                    <div >
                        {item}
                    </div>
                ))}

        </>
    );
}



function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);


    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items0.slice(itemOffset, endOffset));



        items0[1] != '' ? setPageCount(Math.ceil(items0.length / itemsPerPage)) : setPageCount(1);

    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items0.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (

        <>

            <Items currentItems={currentItems} />

            <ReactPaginate
                breakLabel="..."
                nextLabel="siguiente >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< anterior"
                renderOnZeroPageCount={null}
                className='alberto' />

        </>

    );
}

// Add a <div id="container"> to your HTML to see the componend rendered.


export default PaginatedItems;