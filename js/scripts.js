let pokemonRepository = (function() {
    let pokemonList = [
        { name: 'Bulbasaur', height: 2.04, weight: 15.2, type: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 3.13, weight: 28.7, type: ['grass', 'poison'] },
        { name: 'Venusaur', height: 6.07, weight: 220.5, type: ['grass', 'poison'] },
        { name: 'Charmander', height: 2, weight: 18.7, type: ['fire'] },
        { name: 'Charmeleon', height: 3.07, weight: 41.9, type: ['fire'] },
        { name: 'Charizard', height: 5.07, weight: 199.5, type: ['fire', 'flying'] },
        { name: 'Squirtle', height: 1.08, weight: 19.8, type: ['water'] },
        { name: 'Wartortle', height: 3.03, weight: 49.6, type: ['water'] },
        { name: 'Blastoise', height: 5.03, weight: 188.5, type: ['water'] },
    ]

    function getAll (){
        return pokemonList;
    }

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
})()

// forEach loop iterating through pokemonList
pokemonRepository.getAll(pokemonList.forEach(function(pokemon) {
    document.write(<p>pokemonList[i].name + ' Height: ' + pokemonList[i].height + ' Weight: ' + pokemonList[i].weight</p>);
    if (pokemonList[i].height > 6) {
        document.write(" - Wow, that's a big Pokemon!!");
    }
}));

// Original For loop iterating through pokemonList
// for (let i = 0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name + ' Height: ' + pokemonList[i].height + ' Weight: ' + pokemonList[i].weight);
//     if (pokemonList[i].height > 6) {
//         document.write(" - Wow, that's a big Pokemon!!");
//     }
// }
