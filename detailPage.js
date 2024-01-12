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
    const service = config.apikey;
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
function ulbutton (){
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  let reviewtext = document.getElementById("reviewtextinput").value;
  let checking = userName.length * password.length * reviewtext.length;
  if (checking === 0){
      alert("작성이 완료되지 않았습니다.");
  }
  else if (password !== "sparta"){
      alert("비밀번호가 올바르지 않습니다.");
  }
  else {
  const reviewed = `
  <form class = "reviewed">
  <li class="userId">
  ID : ${userName}
  </li>
  <ul>
      <textarea readonly rows ="8" cols ="85" class="userReview">${reviewtext}</textarea>
  </ul>
  </form>
  `;
  
  const node = document.createElement(`div`);
  node.innerHTML = reviewed;
  console.log(node);
  document.getElementById("makeReviewed").appendChild(node);
  alert ("작성이 완료되었습니다.")
  };
  document.getElementById("userName").value='';
  document.getElementById("password").value='';
  document.getElementById("reviewtextinput").value='';
};
