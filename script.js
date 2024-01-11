const service = config.apikey;

const urlBoxoffice = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${service}&targetDt=20231229` //주간/주말 박스오피스
const urlInformation = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${service}` //영화 상세 정보
const urlList = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${service}&itemPerPage=20` //영화 목록

// ↑ api 연결

// 박스오피스 정보로 영화 카드 생성

fetch(urlBoxoffice)
  .then(response => response.json())
  .then(response => {
    let movieList = response["boxOfficeResult"]['weeklyBoxOfficeList'];

    let temp_html = ``;
    movieList.forEach(i => {
      let movieTitle = i['movieNm'];
      let movieCd = i['movieCd'];
      let openDate = i['openDt'];
      let rank = i['rank'];

      temp_html += `
        <div class="col">
          <div class="wrap">
            <h1, onclick="alert('이 영화의 대표 코드:${movieCd}')">${movieTitle}</h1>
            <h3>${rank}</h3>
            <p>${openDate}</p>
          </div>
        </div>
  `;

      document.getElementById("cardsBox").innerHTML = temp_html
    });

  }
  )

// // 영화 상세 정보(배우명, 역할명) 추가

fetch(urlInformation)
  .then(response => response.json())
  .then(response => console.log(response))

// 영화 목록
fetch(urlList)
  .then(response => response.json())
  .then(response => console.log(response))