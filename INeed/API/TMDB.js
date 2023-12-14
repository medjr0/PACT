const API_TOKEN = "8f863638f035cc7ab31dd71aa8428e74";

export function getFilmsFromApiWithSearchedText (text,page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  const url_init = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page
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
  export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
