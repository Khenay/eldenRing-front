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
                    if (res.datos[i] == undefined) {
                        localStorage.removeItem(`nombre${i}`);
                        localStorage.removeItem(`clase${i}`);
                        localStorage.removeItem(`peso${i}`);
                    }
                    localStorage.setItem(`nombre${i}`, res.datos[i].nombre);
                    localStorage.setItem(`clase${i}`, res.datos[i].clase);
                    localStorage.setItem(`peso${i}`, res.datos[i].peso);

                }




            })

        

    }, [])



    const [card1, setCard1] = useState(localStorage.getItem('nombre0') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre0')}</p>
        <p>Class: {localStorage.getItem('clase0')}</p>
        <p>Weight: {localStorage.getItem('peso0')}</p>


    </div> : '');

    const [card2, setCard2] = useState(localStorage.getItem('nombre1') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre1')}</p>
        <p>Class: {localStorage.getItem('clase1')}</p>
        <p>Weight: {localStorage.getItem('peso1')}</p>


    </div> : '');

    const [card3, setCard3] = useState(localStorage.getItem('nombre2') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre2')}</p>
        <p>Class: {localStorage.getItem('clase2')}</p>
        <p>Weight: {localStorage.getItem('peso2')}</p>


    </div> : '');

    const [card4, setCard4] = useState(localStorage.getItem('nombre3') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre3')}</p>
        <p>Class: {localStorage.getItem('clase3')}</p>
        <p>Weight: {localStorage.getItem('peso3')}</p>


    </div> : '');

    const [card5, setCard5] = useState(localStorage.getItem('nombre4') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre4')}</p>
        <p>Class: {localStorage.getItem('clase4')}</p>
        <p>Weight: {localStorage.getItem('peso4')}</p>


    </div> : '');

    const [card6, setCard6] = useState(localStorage.getItem('nombre5') ? <div class="registro" id="registro">
        <h1 id="cabezaRegistro" class="cabezaLog">Weapon</h1>


        <p>Name: {localStorage.getItem('nombre5')}</p>
        <p>Class: {localStorage.getItem('clase5')}</p>
        <p>Weight: {localStorage.getItem('peso5')}</p>


    </div> : '');


    localStorage.getItem('nombre0') ? items0 = [card1] : items0 = []

    localStorage.getItem('nombre1') ? items0 = [card1, card2] : items0 = [card1]

    localStorage.getItem('nombre2') ? items0 = [card1, card2, card3] : items0 = [card1, card2]

    localStorage.getItem('nombre3') ? items0 = [card1, card2, card3, card4] : items0 = [card1, card2, card3]

    localStorage.getItem('nombre4') ? items0 = [card1, card2, card3, card4, card5] : items0 = [card1, card2, card3, card4]

    localStorage.getItem('nombre5') ? items0 = [card1, card2, card3, card4, card5, card6] : items0 = [card1, card2, card3, card4, card5]



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
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                className='alberto' />

        </>

    );
}

// Add a <div id="container"> to your HTML to see the componend rendered.


export default PaginatedItems;