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
            showModal(
                pokemon.name, 
                'Height: '+ pokemon.height+ ' Weight: '+ pokemon.weight,
                pokemon.imageUrl
            );
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
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

    function showModal(title, text, img) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonName = document.createElement('h1');
        pokemonName.innerText = title;
    
        let pokemonDetails = document.createElement('p');
        pokemonDetails.innerText = text;

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('src', img);
        pokemonImage.setAttribute('width', "100%");
        pokemonImage.setAttribute('height', "100%");

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonDetails);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible')
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

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








