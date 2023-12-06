import { getMovieInfo } from "../api/movieApi.js";

//DOM 요소 선택
const title = document.querySelector(".detailmovie-title");
const poster = document.querySelector(".poster-card");
const stll = document.querySelector(".stll-card");
const release = document.querySelector(".release");
const director = document.querySelector(".director");
const actor = document.querySelector(".actor");
const genre = document.querySelector(".genre");
const runtime = document.querySelector(".runtime");
const rating = document.querySelector(".rating");
const summary = document.querySelector(".movie-summary>dd");
var like_mo;
var title_mo;
var star_mo;
var chaeck_users;
let chaeck_num = 999999;

const labelHeart = document.querySelector("label[for='btn-heart']");

/*현재 페이지의 URL에서 movieId와 movieSeq 파라미터 값 가져오기
여러 페이지 간 정보 전달하거나 특정 영화에 대한 추가 데이터 요청*/
//현재 페이지의 URL에서 쿼리 문자열 가져오기
//URL의 물음표(?) 이후의 부분이 쿼리 문자열, 페이지에 전달된 매개변수 포함
const queryString = window.location.search;
//URLSearchParams 객체 생성 <- 쿼리 문자열을 다루기 쉽게
const params = new URLSearchParams(queryString);
//파라미터 값 가져오기

//css 클래스가 star-rating인 모든 요소 선택해 NodeList에 저장
const containers = document.querySelectorAll(".starrating");

const teststar = document.getElementById("textstar");
const btnHeart = document.getElementById("btn-heart");

var result = 0;

const uuid = params.get("uuid");
const movieId = params.get("movieId");
const movieSeq = params.get("movieSeq");
const loading = document.querySelector(".wrapper-etc");

function visit_user(title_mo2) {
  //sql 에서 값 가져오기
  fetch(`http://127.0.0.1:51713/get_users_movie_like?${uuid + "|" + movieSeq}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data.length == 0) {
        console.log("insert");

        fetch("http://127.0.0.1:51713/update_users_movie_list_insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie_id: movieSeq,
            movie_name: title_mo2,
            movie_star: 0,
            movie_like: 0,
            uuid_users: uuid,
          }),
        });

        // insert_user_list(obj);
      } else {
        chaeck_users = chaeck_num;
        star_mo = data[0].movie_star;
        teststar.innerText = star_mo + "⭐";
        console.log(data[0].movie_like);
        if (data[0].movie_like != 1) {
          labelHeart.classList.toggle("select", (btnHeart.checked = false));
          like_mo = 0;
        } else {
          labelHeart.classList.toggle("select", (btnHeart.checked = true));
          like_mo = 1;
        }
      }
    })
    .catch((err) => {
      console.log("er", err);
    });
}

//페이지 로드 -> 이벤트 리스너 추가
window.addEventListener("load", async () => {
  //두 객체 모두 null이 아닌 경우에만 실행
  //URL에서 객체 추출해 해당 값 유효한지 확인하는 조건문
  if (movieId !== null && movieSeq !== null) {
    //영화 정보 얻어오는 함수(개별 영화 정보)
    //사용해 서버로부터 해당하는 데이터 가져오기
    const movieInfo = await getMovieInfo({
      movieId: movieId,
      movieSeq: movieSeq,
    });

    //가져온 영화 정보 객체의 TotalCount가 0인 경우
    //해당하는 영화 없다는 것 의미
    if (movieInfo.TotalCount === 0) {
      location.href = "/pages/notFound.html";
    }

    title_mo = await movieInfo.title;
    title_mo = await title_mo.replace(" ", "");

    visit_user(title_mo);

    //가져온 영화 정보 화면에 표시 위해 함수 호출
    showValue(movieInfo);
  }
});

//함수 영화 정보 받아와 해당 정보를 화면에 표시
//특정 클래스 요소에 텍스트 콘텐츠 삽입 방식으로 표시
const showValue = (movie) => {
  //영화 제목
  title.textContent = movie.title;
  title_mo = movie.title;

  //포스터 이미지 설정
  const poster_str =
    movie.posters.split("|")[0] === "" ? "" : movie.posters.split("|")[0];

  if (poster_str !== "") {
    poster.src = poster_str;
  } else {
    poster.src = "../img/redlogo.png";
  }

  const stll_str =
    movie.stlls.split("|")[0] === "" ? "" : movie.stlls.split("|")[0];
  console.log(stll_str);
  //스틸컷 설정
  if (stll_str !== "") {
    stll.src = stll_str;
  } else {
    stll.src = "../img/redlogo.png";
  }

  //개봉일
  if (movie.repRlsDate === "") {
    release.textContent = movie.prodYear;
  } else {
    //YYYY.MM.DD 형식으로 설정
    release.textContent =
      movie.repRlsDate.slice(0, 4) +
      "." +
      movie.repRlsDate.slice(4, 6) +
      "." +
      movie.repRlsDate.slice(6);
  }

  //감독
  if (movie.directors.director[0].directorNm === "") {
    director.textContent = "정보 없음";
  } else {
    //비어 있지 않다면 첫 번째 감독의 이름 사용
    director.textContent = movie.directors.director[0].directorNm;
  }

  //배우
  let actorBox = "";
  if (!movie.actors.actor[0].actorNm) {
    actor.textContent = "정보 없음";
  } else {
    //비어 있지 않다면 모든 배우 이름 |로 구분하여 표시
    for (let i = 0; i < movie.actors.actor.length; i++) {
      actorBox += movie.actors.actor[i].actorNm;
      actorBox += " | ";
    }
    actor.textContent = actorBox.slice(0, -2);
  }

  //장르
  if (movie.genre === "") {
    genre.textContent = "정보 없음";
  } else {
    //비어 있지 않다면 ,를 |로 대체해서 표시
    genre.textContent = movie.genre.replace(/,/g, " | ");
  }

  //런타임
  if (movie.runtime === "") {
    runtime.textContent = "정보 없음";
  } else {
    runtime.textContent = movie.runtime + "분";
  }

  //평점
  if (movie.rating === "") {
    rating.textContent = "정보 없음";
  } else {
    rating.textContent = movie.rating;
  }

  //줄거리
  if (movie.plots.plot[0].plotText === "") {
    summary.textContent = "줄거리가 제공되지 않습니다 :)";
  } else {
    summary.textContent = movie.plots.plot[0].plotText;
  }
};

function score(num) {
  if (num == 9) {
    return 1;
  } else if (num == 7) {
    return 2;
  } else if (num == 5) {
    return 3;
  } else if (num == 3) {
    return 4;
  } else if (num == 1) {
    return 5;
  }
}

async function send_star_db(result) {
  title_mo = title_mo.replace(" ", "");
  console.log(title_mo);
  var oj = {
    movie_id: movieSeq,
    movie_name: title_mo,
    movie_star: result,
    movie_like: like_mo,
    uuid_users: uuid,
  };

  console.log(oj);

  fetch("http://127.0.0.1:51713/update_users_movie_list_star", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oj),
  });
}

//forEach 메서드 사용 -> NodeList의 각 요소에 대해 함수 실행
//각 반복에서 container 현재 처리 중인 요소
containers.forEach((container) => {
  //현재 마우스가 올려진 요소의 인덱스 저장 변수
  let indexState = -1;
  //클릭된 요소의 인덱스 저장 변수
  let clickState = -1;

  //마우스가 요소 위로 이동할 때
  container.addEventListener("mouseover", (e) => {
    //container의 자식 요소들을 배열로 변환
    const nodes = [...container.children];
    //현재 마우스 이벤트가 발생한 요소의 인덱스 찾기
    const index = nodes.indexOf(e.target);
    //현재 이벤트가 I 태그(별점 아이콘)인지 확인
    if (e.target.nodeName === "I") {
      //현재 마우스 위치의 인덱스가 이전에 저장된 인덱스와 다를 경우
      if (indexState !== index) {
        //현재 마우스 위치가 이전 위치보다 오른쪽
        if (indexState < index) {
          //해당 인덱스까지 별 아이콘에 클래스 추가
          for (let i = 0; i <= index; i++) {
            nodes[i].classList.add("hovered");
          }
        } else {
          //왼쪽
          //클래스 제거
          for (let i = indexState; index <= i; i--) {
            nodes[i].classList.remove("hovered");
          }
        }
        //마지막으로 현재 인덱스 저장해 다음 이벤트 비교에 사용
        indexState = index;
      }
    }
  });

  //마우스가 요소에서 벗어날 때
  container.addEventListener("mouseout", (e) => {
    //마우스가 요소를 벗어났으므로 재설정
    indexState = -1;

    //이벤트 발생 시점에서 요소 자식들 배열로 저장
    const nodes = [...container.children];

    //마우스가 벗어난 지점의 인덱스 찾기
    const index = nodes.indexOf(e.target);

    //마우스가 위치한 지점까지 별 아이콘에서 클래스 제거
    for (let i = 0; i <= index; i++) {
      nodes[i].classList.remove("hovered");
    }
  });

  //클릭 이벤트에 대한 이벤트 리스너
  container.addEventListener("click", (e) => {
    //클릭 이벤트가 발생한 시점에서 요소의 자식들 배열로 저장
    const nodes = [...container.children];
    //클릭된 지점의 인덱스 찾기
    const index = nodes.indexOf(e.target);

    result = score(index);

    send_star_db(result);
    teststar.innerText = result + "⭐";

    //클릭된 요소가 별 아이콘인지 확인
    if (e.target.nodeName === "I") {
      //현재 클릭된 별과 이전 클릭된 별의 인덱스 다를 경우
      if (clickState !== index) {
        //현재 클릭된 별이 이전에 클릭된 별보다 오른쪽
        if (clickState < index) {
          //해당 인덱스까지 클래스 추가
          for (let i = 0; i <= index; i++) {
            nodes[i].classList.add("selected");
          }
        } else {
          //왼쪽
          //클래스 제거
          for (let i = clickState; index < i; i--) {
            nodes[i].classList.remove("selected");
          }
        }
        //현재 클릭된 별의 인덱스 저장해 다음 클릭과 비교
      }
    }
  });
});

btnHeart.addEventListener("change", () => {
  //change 이벤트를 감지해 체크박스 선택 상태가 변경될 때 호출
  console.log("like_mo");
  if (like_mo == 1) {
    labelHeart.classList.toggle("select", (btnHeart.checked = false));
    like_mo = 0;
    fetch("http://127.0.0.1:51713/update_users_movie_list_like_update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: movieSeq,
        movie_name: title_mo,
        movie_star: 2,
        movie_like: like_mo,
        uuid_users: uuid,
      }),
    });
    // update_users_movie_list_like_update
  } else {
    labelHeart.classList.toggle("select", (btnHeart.checked = true));
    console.log(like_mo);
    like_mo = 1;
    console.log(like_mo);

    fetch("http://127.0.0.1:51713/update_users_movie_list_like_update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: movieSeq,
        movie_name: title_mo,
        movie_star: 2,
        movie_like: like_mo,
        uuid_users: uuid,
      }),
    });
  }
});
