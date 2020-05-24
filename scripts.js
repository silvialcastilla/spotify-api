let type = "artist";
const apikey = "";

/* --------------- Functions handlers --------------- */


function drawArtist(dataArtist) {
    let container = document.createElement("div");
    container.addEventListener("click", (event) => {
        event.preventDefault();
        goToMusic(dataArtist, event);
    })
    let element = document.createElement("p");
    element.appendChild(document.createTextNode(`${dataArtist.name}`));
    container.appendChild(element);
    let elements = document.createElement("img");
    if (dataArtist.images.length >= 2)
        elements.setAttribute("src", `${dataArtist.images[1].url}`);
    container.appendChild(elements);
    document.getElementById('results').appendChild(container);
}

function findArtist() {

    if (document.getElementById("keywords").value === "") {
        alert("Escribe algo");
    } else {
        let p = document.getElementById("keywords").value.replace(" ", "+");
        //let type = document.getElementById("type").value;
        fetch(`https://api.spotify.com/v1/search?q=${p}&type=artist`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${apikey}`
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {

                let elementh = document.createElement("h2");
                elementh.appendChild(document.createTextNode('Artistas'));
                document.getElementById('title').appendChild(elementh);

                let enlace = document.getElementById('enlace');
                enlace.addEventListener('click', (event) => goToMusic(data, event));

                data.artists.items.map((data, index) => {
                    console.log(index);
                    drawArtist(data, index);
                })
            }).catch((error) => {
                console.error('Error:', error);
            });
    }
}

function guardar_localstore(data) {

    console.log("datos: ", JSON.stringify(data));
    localStorage.setItem("info", JSON.stringify(data))
}

/* --------------- Bindings / Events handling --------------- */
//Nos tenemos que acordar que he cambiado la funcion find artist por details!!!
console.log(window.location.href);
if (window.location.href === "file:///C:/Users/USUARIO/Desktop/TheBridge/5.APIS/spoty-api/index.html") {
    document.getElementById("finderBtn").addEventListener("click", findArtist);
}

// FUNCION PARA RENDERIZAR EL DETALLE
function goToMusic(data, event) {
    event.preventDefault();
    guardar_localstore(data);

    window.location = "music.html"
}





// FUNCIÓN QUE PINTA EL DETAIL
if (window.location.href === "file:///C:/Users/USUARIO/Desktop/TheBridge/5.APIS/spoty-api/music.html") {
    details(JSON.parse(localStorage.getItem("info")), localStorage.getItem("artistId"))

}

//localStorage.removeItem("info")

function drawInformation(dataInformation) {

    //console.log("imprime")
    let name = document.createElement("p");
    name.appendChild(document.createTextNode(`${dataInformation.name}`));
    document.getElementById('information').appendChild(name);
    let popularity = document.createElement("p");
    popularity.appendChild(document.createTextNode(`${dataInformation.popularity}`));
    document.getElementById('information').appendChild(popularity);
    let followers = document.createElement("p");
    followers.appendChild(document.createTextNode(`${dataInformation.followers.total}`));
    document.getElementById('information').appendChild(followers);

}

function details(musicOk) {
    console.log("musicOk", musicOk);
    fetch(musicOk.href, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${apikey}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            drawInformation(data);

        }).catch((error) => {
            console.error('Error:', error);
        });
}