import { getPersonajes } from "./solicitudes/operaciones.js";



const sgtPagina =(id,displayIcon,displayName,description,abilities)=>{

    console.log(displayIcon);

    const rutaArchivo = "../agente.html";

    fetch(rutaArchivo)
        .then(response => response.text())
        .then(html =>{
            const parser = new DOMParser();
            const doc = parser.parseFromString(html,'text/html');

            const imagePage =doc.getElementById("imagePage");
            imagePage.src=displayIcon;
            imagePage.classList.add("card-img-top");

            const nombrePage =doc.getElementById("name");
            nombrePage.src =displayName;

            const descriptionPage = doc.getElementById("descripcion");
            descriptionPage.textContent = description;

            const habilidadesPage = doc.getElementById("habilidades");
            habilidadesPage.textContent = (`sus hablilidades son : ${abilities[0].displayName}, ${abilities[1].displayName},${abilities[2].displayName},${abilities[3].displayName} `);

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML
            
        })
}



const crearCard = (resultados =[])=>{


    let RowPersonajes = document.getElementById("RowPersonajes");
    resultados.map ((resultado)=>{

        const{displayName,displayIcon,description,abilities}=resultado;
        const{ name:nombre,url}=location;

        console.log();

        const divRow = document.createElement("div");
        divRow.classList.add("col-xl-4");
        divRow.classList.add("col-lg-4");
        divRow.classList.add("col-md-4");
        divRow.classList.add("col-sm-12");
        divRow.classList.add("col-xs-12");
        divRow.classList.add("mt-2");
        divRow.classList.add("mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src=displayIcon;
        img.classList.add("card-img-top");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle= document.createElement("h5");
        cardTitle.classList.add("card-title")
        cardTitle.textContent=displayName;

        const cardDesc= document.createElement("p");
        cardDesc.classList.add("card-text")
        cardDesc.textContent=(`La descripcion es del personaje es la siguiente: ${description}`);

        const cardRar= document.createElement("p");
        cardRar.classList.add("card-text")
        cardRar.textContent=(`sus hablilidades son : ${abilities[0].displayName}, ${abilities[1].displayName},${abilities[2].displayName},${abilities[3].displayName} `);

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn");
        btnVer.classList.add("btn-warning");
        btnVer.textContent = "Ver más";
        btnVer.addEventListener("click",()=> {
            sgtPagina(id,displayIcon,displayName,description,abilities);
        });




        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDesc);
        cardBody.appendChild(cardRar);
        cardBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(cardBody);


        divRow.appendChild(card);

        RowPersonajes.appendChild(divRow) ;

    })

}




getPersonajes()
    .then( data => crearCard(data))
    .catch(error => console.log(`el error es ${error}`));






