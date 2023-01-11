const nomePokemon = document.querySelector('.pokemon_nome');
const numeroPokemon = document.querySelector('.pokemon_numero');
const imagePokemon = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const search = document.querySelector('.search');


const Prev = document.querySelector('.btn-prev');
const Next = document.querySelector('.btn-next');

let searchPokemons = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

//renderizando pokemon
const renderPokemon = async (pokemon) => {
    nomePokemon.innerHTML = 'Loading...';
    numeroPokemon.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){

    imagePokemon.style.display = 'block';

    nomePokemon.innerHTML = data.name;

    numeroPokemon.innerHTML = data.id;

    imagePokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    search.value = '';

    searchPokemons = data.id;

    //caso o pokemon não exista
    }else{
        imagePokemon.style.display = 'none'
        nomePokemon.innerHTML = 'Not Found';
        numeroPokemon.innerHTML = '';
    }
}

//evento de envio do formulário
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
   
});


//botões
Prev.addEventListener('click', (event) =>{
    if (searchPokemons > 1){
    searchPokemons -=1;
    renderPokemon(searchPokemons);
    }
});

Next.addEventListener('click', (event) =>{
    searchPokemons +=1;
    renderPokemon(searchPokemons);
   
});

renderPokemon(searchPokemons);
