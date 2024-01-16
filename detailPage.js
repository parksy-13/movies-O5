//리뷰창 보이도록 하는 함수
window.onload = function () {
  loadComments();
}

// 브라우저의 뒤로 가기 기능 사용
function goBack() {
  window.history.back();
}


document.addEventListener("DOMContentLoaded", () => {
  // URL 파라미터에서 필요한 정보들을 읽어옴
  const urlParams = new URLSearchParams(window.location.search);
  const movieCd = urlParams.get("movieCd");

  // 로컬 스토리지에서 데이터 읽기
  const storedData = JSON.parse(localStorage.getItem(movieCd));

  if (storedData) {
    const { movieTitle, openDate, rank } = storedData;

    // 필요한 정보 확인
    console.log(`Movie Code: ${movieCd}`);
    console.log(`Movie Title: ${movieTitle}`);
    console.log(`Open Date: ${openDate}`);
    console.log(`Rank: ${rank}`);

    // detailPage 화면에 해당 정보 나오게 하기
    //   document.getElementById("movieTitle").textContent = movieTitle;
    //   document.getElementById("openDate").textContent = openDate;
    //   document.getElementById("rank").textContent = `Rank: ${rank}`;

    // 영화 상세 정보 가져오기
    const key = config.apikey;
    const urlInformation = `${address}/movie/searchMovieInfo.json?key=${key}&movieCd=${movieCd}`; //영화 상세 정보

    console.log(urlInformation);

    fetch(urlInformation)
      .then((response) => response.json())
      .then((response) => {
        let movieInfo = response["movieInfoResult"]["movieInfo"];

        // 영화 상세 정보를 화면에 표시
        const detailContainer = document.getElementById("detailContainer");
        detailContainer.innerHTML = `
            <h2>영화 상세 정보</h2>
            <img src ='./posters/no${rank}.jpg' alt="" style="width:20%;height:10%;border:auto; justify-content: center">
            <p>영화 제목: ${movieInfo.movieNm}</p>
            <p>장르: ${movieInfo.genres
            .map((genre) => genre.genreNm)
            .join(", ")}</p>
            <p>감독: ${movieInfo.directors
            .map((director) => director.peopleNm)
            .join(", ")}</p>
            <p>제작년도: ${movieInfo.prdtYear}</p>
            <p>개봉일: ${movieInfo.openDt}</p>
            <p>상영시간: ${movieInfo.showTm}분</p>
            <!-- <p>등급: ${movieInfo.audit}</p> undifined 떠서 주석 처리 함-->
            <p>배우: ${movieInfo.actors
            .map((actors) => actors.peopleNm)
            .join(", ")}</p>
            <!-- 나머지 상세 정보 표시 추가 가능.. -->
          `;
      })
  } else {
    console.log("Data not found in local storage");
  }
});

// 리뷰창 업로드 기능
// 새로고침하면 전역변수도 새로 선언되므로 count도 localStorage에 저장합니다.
const upload = document.getElementById('uploadbutton');
if (!localStorage.getItem('userCount')) {
  localStorage.setItem('userCount', 0);
}
function ulbutton() {
  event.preventD
  let userCount = localStorage.getItem('userCount');

  // 유저 이름, 비밀번호, 리뷰 map 생성, localStorage에 저장
  let userName = document.getElementById("userName").value;
  localStorage.setItem(`${userCount}name`, userName);

  let password = document.getElementById("password").value;
  let reviewtext = document.getElementById("reviewtextinput").value;
  const checking = userName.length * password.length * reviewtext.length;
  let userInfo = { userName: userName, password: password, reviewtext: reviewtext };
  userInfo = JSON.stringify(userInfo);
  if (checking === 0){ //작성상태 확인
      alert("작성이 완료되지 않았습니다.");
  }
  else if(!localStorage.getItem('userCount')){ // 웹페이지 초기상태
      localStorage.setItem('userCount',0);
      localStorage.setItem(localStorage.getItem('userCount'), userInfo);
      createcard(userName, reviewtext);
      ++userCount;
      localStorage.setItem('userCount',userCount);
      alert("작성 되었습니다.");
    }
  else if (searchvalue(userName) < 0) { //기존 정보가 없고, Id가 겹치지 않을때
      localStorage.setItem(localStorage.getItem('userCount'), userInfo);
      createcard(userName, reviewtext);
      ++userCount;
      localStorage.setItem('userCount',userCount);
      alert("작성 되었습니다.");
    }
  else if(matchingUser(userName, password)){ //기존 정보가 있을때
      createcard(userName, reviewtext);
      alert("작성 되었습니다.");
  }
  else { // 그 외
      alert("Password가 틀렸습니다.");
  }
};

function searchvalue(userName){ //userName의 index값을 찾음.
  let counter = localStorage.getItem('userCount')
  for (let i = 0; i < counter; i++){
      let checkUN = JSON.parse(localStorage.getItem(i));
      console.log(checkUN);
      if (userName === checkUN["userName"]){
          console.log(checkUN["userName"]);
          return i
      }
  return -1;
  }
}
  localStorage.setItem(`${userCount}password`, password);
  

  let reviewtext = document.getElementById("reviewtextinput").value;
  localStorage.setItem(`${userCount}reviewtext`, reviewtext);

  alert("작성이 완료되었습니다.");

function matchingUser(userName, password){ //유저가 맞는지에 대한 함수
  let i = searchvalue(userName);
  let savedNamed = JSON.parse(localStorage.getItem(i));
  let savedPassword = JSON.parse(localStorage.getItem(i));
  return (userName === savedNamed["userName"]) * (password == savedPassword["password"]) ? true : false;


function loadComments() {
  let userCount = localStorage.getItem('userCount');

  let commentList = document.getElementById('makeReviewed');
  commentList.innerHTML = '';

  for (let i = 0; i <= userCount; i++) {
    let name = localStorage.getItem(`${i}name`);
    let reviewtext = localStorage.getItem(`${i}reviewtext`);
    let listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = "Delete";
    button.addEventListener('click', delbutton);
    listItem.innerHTML = `
    <div id = "reviewItem">
  ID : ${name}
  </div>
  <ul>
      <textarea readonly rows ="5" cols ="70" class="userReview">${reviewtext}</textarea>
  </ul>
  `
    listItem.appendChild(button);
    commentList.appendChild(listItem);
  }
}
}