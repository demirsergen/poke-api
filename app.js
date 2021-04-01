const pokedex = document.getElementById('pokedex');


const getPokemons = () => {
    const promises = [];
    for (let i = 1; i <= 153; i++) {       
// There was no 72nd pokemon on the API and it was throwing me an error, so I sorta 'fixed' it with this simple logic. 
        if (i == 72) {
            i +=1;
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).   then(response => response.json())); 
    }


    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
           name: data.name,
           id: data.id,
           image: data.sprites['front_default'],
           type: data.types.map((type) => type.type.name).join(", ")
        }));

        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const html = pokemon.map(poke => `
        <div class="pokemon">
            <h1>${poke.name}</h1>
            <img src=${poke.image} />
            <h3>${poke.type}</h3>
        </div>
    `).join('')
    

    pokedex.innerHTML = html;
}

getPokemons();


    
   


