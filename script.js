function clearResult(){
    //Funcion que vacia el contenido de resultados
    let resultadoItems = Array.from(document.getElementsByClassName("resultados-item-container"));
    //console.log(resultadoItems);

    for(let i=0;i<resultadoItems.length;i++){
        document.getElementById("resultados").removeChild(resultadoItems[i]);
    }
}

const showPokemon = (e) =>{
    e.preventDefaut;
    let itemHover = e.target;
    let id = itemHover.getAttribute("id");
    let idImg = id +"-img";
    //console.log(idImg);
    document.getElementById(idImg).style.display = "flex";
}

const hidePokemon = (e) =>{
    e.preventDefaut;
    let itemHover = e.target;
    let id = itemHover.getAttribute("id");
    let idImg = id +"-img";
    //console.log(idImg);
    document.getElementById(idImg).style.display = "none";
}

function searchPokemon(){

    clearResult();
    document.getElementById("resultados-title").innerHTML="Resultados: 0"

    let listaPokemonBuscados = [];

        
    let criterio = document.getElementById("criterio").value;
    let criterio2 = document.getElementById("criterio2").value;
    //console.log(criterio);

    var patron = new RegExp(criterio);
    var patron2 = new RegExp(criterio2);

    if((criterio!="")||(criterio2!="")){
        for (let i=0; i<listaPokemon.length;i++){
            if(patron.test(listaPokemon[i])&&(patron2.test(listaPokemon[i]))){
                listaPokemonBuscados.push(listaPokemon[i]);

                let resultadoItemContainer = document.createElement("div");
                resultadoItemContainer.classList.add("resultados-item-container");

                let resultadoItem = document.createElement("p");
                resultadoItem.classList.add("resultados-item");
                resultadoItem.innerHTML = listaPokemon[i];
                resultadoItem.setAttribute("id","resultados-item-"+(i+1));
                resultadoItem.addEventListener("mouseover",showPokemon);
                resultadoItem.addEventListener("mouseout",hidePokemon);

                document.getElementById("resultados-title").innerHTML="Resultados: "+listaPokemonBuscados.length;

                //Lógica para obtener la imagen del pokemon y mostrarla
                let resultadoItemImagenContainer = document.createElement("div");
                resultadoItemImagenContainer.classList.add("resultados-item-imagen");
                //resultadoItemImagenContainer.innerHTML = listaPokemon[i];
                resultadoItemImagenContainer.setAttribute("id","resultados-item-"+(i+1)+"-img");
                
                let resultadoItemImagen = document.createElement("img");

                fetch(`https://pokeapi.co/api/v2/pokemon/${listaPokemon[i]}`)
                    .then(res2 => res2.json())
                    .then(data2 => {
                    
                        url_pokemonImg = data2['sprites']['other']['official-artwork']['front_default'];
                        //console.log(url_pokemonImg);
                        resultadoItemImagen.setAttribute("src",url_pokemonImg);
                        resultadoItemImagen.setAttribute("alt",listaPokemon[i]+".png");
                         
                })  
                

                document.getElementById("resultados").appendChild(resultadoItemContainer);
                resultadoItemContainer.appendChild(resultadoItem);
                resultadoItemContainer.appendChild(resultadoItemImagenContainer);
                resultadoItemImagenContainer.appendChild(resultadoItemImagen);
                }
    
            }
    }
}

        //let resultadoItem = document.createElement("p");
        //resultadoItem.setAttribute("id","item1");
        //resultadoItem.innerHTML = "P de prueba";
        //document.getElementById("resultados").appendChild(resultadoItem);
        
        //document.getElementById("resultados-text").innerHTML = listaPokemonBuscados.join("<br>");

//Se obtienen los nombres de todos los pokemon
var listaPokemon = [];
var url_pokemonImg;

fetch("https://pokeapi.co/api/v2/pokemon?limit=1010")
    .then(res => res.json())
    .then(data => {
   
        for (let i=0; i<data.results.length;i++){
            listaPokemon[i] = data.results[i].name;
        }        
    })  
    
//console.log(listaPokemon);


