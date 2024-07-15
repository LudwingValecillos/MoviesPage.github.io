
let main = document.querySelector("main");
const divFiltros = document.createElement("div");
divFiltros.id = "divFiltros";
divFiltros.className = "flex flex-wrap w-full justify-center gap-2 pb-10";

//--------------------------------------------------------------

const selector = document.createElement("select");
selector.className = "p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-1/5";

const crearSelect = (movies) => {
  const listaGeneros = (movies) => {
    let listaGeneros = [...new Set(movies.flatMap(movies => movies.genres))].toSorted();
    return listaGeneros;
  };

  const lista = listaGeneros(movies);
  let selectHTML = `<option value="all">Genre</option>`;

  lista.forEach((movie) => {
    selectHTML += `<option value="${movie}">${movie}</option>`;
  });
  

  return selectHTML;
};
selector.innerHTML = crearSelect(movies);

divFiltros.appendChild(selector);  //SELECTOR


const buscador = document.createElement("input");
buscador.className = "p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-1/5";
buscador.type = "text";
buscador.placeholder = "Search Movie"; 

divFiltros.appendChild(buscador); //BUSCADOR

main.appendChild(divFiltros);


let contenedorDiv = document.createElement("div");
contenedorDiv.id = "contenedor";
contenedorDiv.className = " px-10 flex flex-wrap w-full gap-2 justify-center";

const crearCard = (peliculas) => {
  let cardsHTML = "";
  
  peliculas.forEach((pelicula) => {
    cardsHTML += `
    
      <article class="p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-1/5">
        <a href="./details.html?id=${pelicula.id}"><img src="${pelicula.image}" alt="${pelicula.title}" class="card-img w-full h-48 justify-center rounded-3xl">
        <h2 class="card-title text-center font-bold border-b-2 border-[#ff910058]">${pelicula.title}</h2>
        <h3 class="card-genre text-xs pl-2 font-bold text-center">${pelicula.genres}</h3>
        <p class="card-description text-1xl pl-2 pt-2 text-[#000000]">${pelicula.overview}</p>
      </a>
        </article>
    `;
  });

  return cardsHTML;
};

contenedorDiv.innerHTML = crearCard(movies);
main.appendChild(contenedorDiv);

//---------------------------
const aplicarFiltros = () => {
  const selectedGenre = selector.value;
  const searchTerm = buscador.value.toLowerCase();

  const peliculasFiltradas = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "all" || movie.genres.includes(selectedGenre);
    const matchesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesGenre && matchesSearchTerm;
  });
  console.log(peliculasFiltradas);
  if(peliculasFiltradas.length > 0){

  contenedorDiv.innerHTML = crearCard(peliculasFiltradas);
}else{
  contenedorDiv.innerHTML = `<h2 class="text-3xl font-bold">No se encontraron resultados</h2>`
}
};


// Event listeners para los filtros
selector.addEventListener("change", aplicarFiltros);
buscador.addEventListener("input", aplicarFiltros);

