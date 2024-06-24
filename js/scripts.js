let pokemonRepository = (function() {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll (){
        return pokemonList;
    }

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem (pokemon) {
        let list = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('poke-entry');
        listItem.appendChild(button);
        list.appendChild(listItem);

        button.addEventListener('click', function(){
            showDetails(pokemon)
        })
    }
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            console.log(pokemon)
        });
    }

    function loadList() {
        return fetch(apiURL).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsURL;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        addListItem: addListItem,
        loadDetails: loadDetails
    }
})();

//Data begins to load here
pokemonRepository.loadList().then(function(){
    // forEach loop iterating through pokemonList after data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    }); 
})








