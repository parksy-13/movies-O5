//  api 연결
const service = config.apikey;

const urlBoxoffice = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${service}&targetDt=20231229` //주간/주말 박스오피스
const urlInformation = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${service}` //영화 상세 정보
const urlList = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${service}&itemPerPage=20` //영화 목록

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
        <img src ='slateImage.png' alt ="" onclick="alert('이 영화의 코드: ${movieCd}')">
          <div class="wrap">
            <h2>${movieTitle}</h2>
            <h3>${rank}</h3>
            <p>${openDate}</p>
          </div>
        </div>`;

      document.getElementById("cardsBox").innerHTML = temp_html
    });
  }
  )

//영화 검색 구현
const searchBtn = () => {
  const movieNameInput = document.getElementById('movieNameInput').value;
  const cardArr = document.getElementsByClassName('col');

// 검색창 구현 - 내용이 없을 때, 글자 있이 검색할 때
if(movieNameInput===""){
  alert("내용을 입력하지 않았습니다.");
}else{
  const cardNameArr = [];
  for (let i = 0; i < cardArr.length; i++) {
    cardNameArr[i] = cardArr[i].getElementsByTagName('h2')[0].innerText;
    cardNameArr[i].indexOf(movieNameInput)>-1? cardArr[i].style = 'display:inline-block': cardArr[i].style = 'display:none';
       }
}
}

// 영화 상세 정보(배우명, 역할명) 추가 -> 다른 html,js에 필요한 정보입니다! 이 fetch함수 복붙하시고 두번째 then에 이어서 실행해주세요!

// fetch(urlInformation)
//   .then(response => response.json())
//   .then(response => console.log(response))

// // 영화 목록
// fetch(urlList)
//   .then(response => response.json())
//   .then(response => console.log(response))