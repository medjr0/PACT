const API_TOKEN = "8f863638f035cc7ab31dd71aa8428e74";

export function getServicesFromApiWithSearchedText (text,page,categorie) {
  const url = 'http://137.194.211.64:8080/api/services?category=' + categorie + '&lat=43.453892&lon=6.753925&limit=10&page=' + page
  const url_init = 'http://137.194.211.64:8080/api/services?category=' + categorie + '&lat=43.453892&lon=6.753925&limit=10&page=' + page
  //'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  //const url_init = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page
  if (text == '') {
  return fetch(url_init)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
  else {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
    }
  }
  export function getServiceDetailFromApi (id) {
    //'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
  return fetch('http://137.194.211.64:8080/api/services/' + id)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
