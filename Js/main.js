document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

function pesquisarFilme(e) {
    e.preventDefault(); // Evite o envio do formulário padrão

    const filmePesquisa = document.getElementById('pesquisar').value;
    buscarFilmes(filmePesquisa);
}

function buscarFilmes(filmePesquisa) {
    const apiKey = 'e5014d23'; // Sua chave de API OMDB
    const apiUrl = `http://www.omdbapi.com/?s=${filmePesquisa}&apikey=${apiKey}`;

    axios.get(apiUrl)
        .then(function (response) {
            console.log(response);
            const filmes = response.data.Search;

            // Verifica se a pesquisa retornou algum resultado
            if (!filmes || filmes.length === 0) {
                document.getElementById('filmes').innerHTML = '<p class="text-light">Nenhum resultado encontrado</p>';
                return;
            }

            let mostrarFilmes = '';
            for (let i = 0; i < filmes.length; i++) {
                const filme = filmes[i];
                mostrarFilmes += `
                    <div class="col-sm-6 col-md-4">
                        <div class="thumbnail">
                            <img src="${filme.Poster}" class="img-thumbnail">
                            <h4> ${filme.Title} </h4>
                            <p><a href="#" class="btn btn-primary" role="button" onclick="filmeDetalhes('${filmes[i].imdbID}')" >Ver detalhes</a></p>
                        </div>
                    </div>
                `;
            }
            document.getElementById('filmes').innerHTML = mostrarFilmes;

           
        })
        .catch(function (error) {
            console.log(error);
        });

        
}
function filmeDetalhes(id) {
            sessionStorage.setItem('filmeID', id);
            window.location = 'detalhes.html';
            return false;  
        } 

function mostraFilme() {
    const filmeID = sessionStorage.getItem('filmeID');

    const apiKey = 'e5014d23'; // Sua chave de API OMDB
    const apiUrl = `http://www.omdbapi.com/?i=${filmeID}&apikey=${apiKey}`;

    axios.get(apiUrl)
    .then(function (response) {
        const filme = response.data;
        console.log(filme);
        const  mostraFilme = `
        <div class="col-md-6">
        <img src="${filme.Poster}" class="img-responsive">
        
        <h3><strong>${filme.Title}</strong></h3>
        </div>

        <div class="col-md-6">
           <div class="well clearfix">
                <ul class="list group">
                    <li class="list-group-item"><strong>Gênero: </strong>${filme.Genre} </li>
                    <li class="list-group-item"><strong>Lançamento: </strong>${filme.Released} </li>
                    <li class="list-group-item"><strong>Duração: </strong>${filme.Runtime} </li>
                    <li class="list-group-item"><strong>Idiomas: </strong>${filme.language} </li>
                    <li class="list-group-item"><strong>Prémios: </strong>${filme.Awards} </li>
                    <li class="list-group-item"><strong>Actores: </strong>${filme.Actors} </li>
                </ul>

                <h3>Descrição</h3>
                ${filme.Plot}
                <hr>
                <a href="http://imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-success" pull-left>Ver no IMDB</a>
                <a href="index.html" target="_blank" class="btn btn-default" pull-right>Pesquisar outro</a>
           </div> 
        </div>
        `
       document.getElementById('filmes').innerHTML = mostraFilme;
    })
    .catch(function (error) {
        console.log(error);
    }); 
}

