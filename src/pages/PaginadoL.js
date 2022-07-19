import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';



// Example items, to simulate fetching from another resources.

var items
var items0
var items1


function Items({ currentItems }) {





    useEffect(() => {

        

        const requestOptions1 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: JSON.parse(localStorage.getItem('infoUser')).nic }),
        };

        fetch("profileWeaponL", requestOptions1)
            .then((response) => response.json())


            .then((res) => {


                for (let i = 0; i < 9; i++) {
                    console.log(res.datos[i])
                    if (res.datos[i] == undefined) {
                        localStorage.removeItem(`nombre${i}L`);
                        localStorage.removeItem(`clase${i}L`);
                        localStorage.removeItem(`peso${i}L`);
                    }
                    localStorage.setItem(`nombre${i}L`, res.datos[i].nombre);
                    localStorage.setItem(`clase${i}L`, res.datos[i].clase);
                    localStorage.setItem(`peso${i}L`, res.datos[i].peso);

                }





            })

    }, [])



    const [card1, setCard1] = useState(localStorage.getItem('nombre0L') ? <div class="registro" id="legendary">
        <h1 id="cabezaRegistro" class="cabezaLog">Legendary Weapon</h1>


        <p>Name: {localStorage.getItem('nombre0L')}</p>
        <p>Class: {localStorage.getItem('clase0L')}</p>
        <p>Weight: {localStorage.getItem('peso0L')}</p>


    </div> : '');

    const [card2, setCard2] = useState(localStorage.getItem('nombre1L') ? <div class="registro" id="legendary">
        <h1 id="cabezaRegistro" class="cabezaLog">Legendary Weapon</h1>


        <p>Name: {localStorage.getItem('nombre1L')}</p>
        <p>Class: {localStorage.getItem('clase1L')}</p>
        <p>Weight: {localStorage.getItem('peso1L')}</p>


    </div> : '');

    const [card3, setCard3] = useState(localStorage.getItem('nombre2L') ? <div class="registro" id="legendary">
        <h1 id="cabezaRegistro" class="cabezaLog">Legendary Weapon</h1>


        <p>Name: {localStorage.getItem('nombre2L')}</p>
        <p>Class: {localStorage.getItem('clase2L')}</p>
        <p>Weight: {localStorage.getItem('peso2L')}</p>


    </div> : '');

    const [card4, setCard4] = useState(localStorage.getItem('nombre3L') ? <div class="registro" id="legendary">
        <h1 id="cabezaRegistro" class="cabezaLog">Legendary Weapon</h1>


        <p>Name: {localStorage.getItem('nombre3L')}</p>
        <p>Class: {localStorage.getItem('clase3L')}</p>
        <p>Weight: {localStorage.getItem('peso3L')}</p>


    </div> : '');

    const [card5, setCard5] = useState(localStorage.getItem('nombre4L') ? <div class="registro" id="legendary">
        <h1 id="cabezaRegistro" class="cabezaLog">Legendary Weapon</h1>


        <p>Name: {localStorage.getItem('nombre4L')}</p>
        <p>Class: {localStorage.getItem('clase4L')}</p>
        <p>Weight: {localStorage.getItem('peso4L')}</p>


    </div> : '');

    const [card6, setCard6] = useState(localStorage.getItem('nombre5L') ? <div class="registro" id="legendary">
        <h1 id="cabezaRegistro" class="cabezaLog">Legendary Weapon</h1>


        <p>Name: {localStorage.getItem('nombre5L')}</p>
        <p>Class: {localStorage.getItem('clase5L')}</p>
        <p>Weight: {localStorage.getItem('peso5L')}</p>


    </div> : '');


    localStorage.getItem('nombre0L') ? items0 = [card1] : items0 = []

    localStorage.getItem('nombre1L') ? items0 = [card1, card2] : items0 = [card1]

    localStorage.getItem('nombre2L') ? items0 = [card1, card2, card3] : items0 = [card1, card2]

    localStorage.getItem('nombre3L') ? items0 = [card1, card2, card3, card4] : items0 = [card1, card2, card3]

    localStorage.getItem('nombre4L') ? items0 = [card1, card2, card3, card4, card5] : items0 = [card1, card2, card3, card4]

    localStorage.getItem('nombre5L') ? items0 = [card1, card2, card3, card4, card5, card6] : items0 = [card1, card2, card3, card4, card5]



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



function PaginatedItemsL({ itemsPerPage }) {
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


export default PaginatedItemsL;