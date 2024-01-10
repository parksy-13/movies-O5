const service= config.apikey;

const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${service}`

fetch(url)
  .then(response => response.json())
  .then(response => console.log(response))