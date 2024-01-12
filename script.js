//  api 연결
const key = config.apikey;

const address = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest'

const urlBoxoffice = `${address}/boxoffice/searchWeeklyBoxOfficeList.json?key=${key}&targetDt=20231229`; //주간/주말 박스오피스

const urlInformation = `${address}/movie/searchMovieInfo.json?key=${key}&movieCd=20124080`; //영화 상세 정보

const urlList = `${address}/rest/movie/searchMovieList.json?key=${key}&itemPerPage=20`; //영화 목록
// 박스오피스 정보로 영화 카드 생성

fetch(urlBoxoffice)
  .then((response) => response.json())
  .then((response) => {
    let movieList = response["boxOfficeResult"]["weeklyBoxOfficeList"];

    let temp_html = ``;
    movieList.forEach((i) => {
      let movieTitle = i["movieNm"];
      let movieCd = i["movieCd"];
      let openDate = i["openDt"];
      let rank = i["rank"];

      //로컬 스토리지에 데이터 저장
      localStorage.setItem(
        movieCd,
        JSON.stringify({ movieTitle, openDate, rank })
      );

      // alt ="" onclick="alert('이 영화의 코드: ${movieCd}'
      // 이미지 클릭시 알럿 기능은 일단 빼놨습니다. 필요시 위에 주석만 가져다 붙이시면 됩니다!
      temp_html += `
        <div class="col">
          <a href="detailPage.html?movieCd=${movieCd}"> 
            <img src ='./posters/no${rank}.jpg' alt="" style="width:50%;height:30%;border:auto;">
            <div class="wrap">
              <h2>${movieTitle}</h2>
              <h3>${rank}</h3>
              <p>${openDate}</p>
            </div>
          </a>
        </div>`;
    });
    // cardsBox 요소가 존재하는지 확인 후 innerHTML 설정
    const cardsBox = document.getElementById("cardsBox");
    if (cardsBox) {
      cardsBox.innerHTML = temp_html;
    } else {
      console.error("cardsBox element not found");
    }
  });

//영화 검색 구현
const searchBtn = () => {
  const movieNameInput = document.getElementById("movieNameInput").value;
  const cardArr = document.getElementsByClassName("col");

  // 검색창 구현 - 내용이 없을 때, 글자 있이 검색할 때
  if (movieNameInput === "") {
    alert("내용을 입력하지 않았습니다.");
  } else {
    const cardNameArr = [];
    for (let i = 0; i < cardArr.length; i++) {
      cardNameArr[i] = cardArr[i].getElementsByTagName("h2")[0].innerText;
      cardNameArr[i].indexOf(movieNameInput) > -1
        ? (cardArr[i].style = "display:inline-block")
        : (cardArr[i].style = "display:none");
    }
  }
};

function resetBtn(){
  location.reload();
}

let gobackBtn = () => window.scrollTo(0, 0);