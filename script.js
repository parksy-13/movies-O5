const service= config.apikey;

const url1= `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${service}&itemPerPage=20`
const url2 = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${service}`

fetch(url1)
  .then(response => response.json())
  .then(response => console.log(response))

  fetch(url2)
  .then(response => response.json())
  .then(response => console.log(response))