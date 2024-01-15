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
      .catch((error) => console.error("영화 상세 정보 가져오기 오류:", error));
  } else {
    console.log("Data not found in local storage");
  }
});

// 리뷰창 기능
function ulbutton (event){ //생성버튼 clear
  event.preventDefault();
  let userCount = localStorage.getItem('userCount');
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  let reviewtext = document.getElementById("reviewtextinput").value;
  const checking = userName.length * password.length * reviewtext.length;
  if (checking === 0){ //작성상태 확인
      alert("작성이 완료되지 않았습니다.");
  }
  else if(!localStorage.getItem('userCount')){ // 웹페이지 초기상태
      localStorage.setItem('userCount',0);
      localStorage.setItem(`${localStorage.getItem('userCount')}userName`,userName);
      localStorage.setItem(`${localStorage.getItem('userCount')}password`,password);
      localStorage.setItem(`${localStorage.getItem('userCount')}reviewtext`,reviewtext);
      createcard(userName, reviewtext);
      ++userCount;
      localStorage.setItem('userCount',userCount);
      alert("작성 되었습니다.");
    }
  else if (localStorage.valueOf().indexOf === -1) { //기존 정보가 없고, Id가 겹치지 않을때 (현재 작동 안함)
      localStorage.setItem(`${localStorage.getItem('userCount')}userName`,userName);
      localStorage.setItem(`${localStorage.getItem('userCount')}password`,password);
      localStorage.setItem(`${localStorage.getItem('userCount')}reviewtext`,reviewtext);
      createcard(userName, reviewtext);
      ++userCount;
      localStorage.setItem('userCount',userCount);
      alert("작성 되었습니다.");
    }
  else if(matchingUser(userName, password)){ //기존 정보가 있을때  (이것만 작동하는듯? 근거 : 유저카운트가 안올라감)
      createcard(userName, reviewtext);
      alert("작성 되었습니다.");
  }
  else { // 그 외
      alert("Password가 틀렸습니다.");
  }
};

function searchvalue (userName){
  let i = 0;
  while (true) {
  let foundPos = [localStorage.valueOf()].indexOf(userName, pos);
  if (foundPos == -1) break;
  document.writeln( foundPos );
  i = foundPos + 1; 
}
}


function matchingUser(userName, password){ //유저가 맞는지에 대한 함수 불안정함 (작동안함)
  let i = localStorage[userName].valueOf();
  const savedName = localStorage.getItem(`${i}name`);
  const savedPassword = localStorage.getItem(`${i}password`);
  return (userName, password) => userName === savedName * password === savedPassword ? true : false;
};

function createcard(userName, reviewtext){ //리뷰카드를 만드는 함수 (잘작동함)
  const reviewed = `
  <form class = messagebox>
      <ul>
      <li class="userId">
      ID : ${userName}
      <input id="cppassword" type="text" placeholder="Password...">
      <button id="DeleteBtn" onclick="deletecard(event);">Delete</button>
      </ul>
      <ul class = reviewbox>
      <textarea readonly rows ="8" cols ="85" class="userReview">${reviewtext}</textarea>
      </ul>
  </form>
  `;
  const node = document.createElement(`div`);
  node.innerHTML = reviewed;
  console.log(node);
  document.getElementById("makeReviewed").appendChild(node);
  document.getElementById("userName").value='';
  document.getElementById("password").value='';
  document.getElementById("reviewtextinput").value='';
};

function deletecard(event){ // 삭제기능 (무조건 비밀번호가 다르다고 뜸)
  event.preventDefault();
  let cppassword = document.getElementById("cppassword").value;
  if (cppassword === localStorage.getItem('password')){
      localStorage.removeItem('userName');
      localStorage.removeItem('password');
      localStorage.removeItem('reviewtext');
      alert("삭제되었습니다.")
      location.reload(true)
  }
  else {
      alert("비밀번호가 다릅니다.")
  }
}