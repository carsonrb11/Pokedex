let pokemonRepository = (function() {
    
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector ('#modal-container');

    function getAll (){
        return pokemonList;
    }

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem (pokemon) {
        let pokemonListElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-info');
        
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem); 

        button.addEventListener('click', function(){
            showDetails(pokemon)
        })
    }
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(){
            let modalTitle = document.querySelector('#pokemonModalLabel');
			let modalImage = document.querySelector('.pokemon-image');
			let modalHeight = document.querySelector('.pokemon-height');
			let modalWeight = document.querySelector('.pokemon-weight');
			let modalTypes = document.querySelector('.pokemon-types');
            
            modalTitle.innerText = pokemon.name;
            modalImage.src = pokemon.imageUrl;
            modalHeight.innerText = `Height: ${pokemon.height} ft`;
			modalWeight.innerText = `Weight: ${pokemon.weight} lbs`;
			modalTypes.innerText = `Type(s): ${pokemon.types.join(', ')}`;

            $('#modal-container').modal('show');
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
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = details.types.map((type) => type.type.name);
        }).catch(function (e) {
          console.error(e);
        });
      }

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        addListItem: addListItem,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//Data begins to load here
pokemonRepository.loadList().then(function(){
    // forEach loop iterating through pokemonList after data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    }); 
})








