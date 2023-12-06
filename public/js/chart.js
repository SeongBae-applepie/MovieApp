import { getBoxOfficeList } from "../api/boxOfficeApi.js";
import { getMovieInfo } from "../api/movieApi.js";

const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

console.log("users+id");
console.log(db_num);

const loadingItem = document.querySelectorAll(".loading");
const bottom_community = document.getElementById("go_c");
const debate_ol = document.getElementById("debate_ol");
const post_ol = document.getElementById("post_ol");
const search_i = document.getElementById("search");

search_i.onclick = function () {
  // console.log("sss");
  location.href = `http://127.0.0.1:51713/search?uuid=${db_num}`;
};

bottom_community.onclick = function () {
  location.href = `http://127.0.0.1:51713/community?id=${db_num}`;
};

// 일별 박스 오피스 값을 넣어 영화 상세 결과값을 얻어내기
//배열을 받아 영화에 대한 상세 정보 얻기
const movieDetail = async (boxOfficeResult) => {
  //배열 순회하며 영화에 대한 상세 정보 얻어오기
  boxOfficeResult.forEach(async (movie) => {
    let detailResult;
    const title = movie.movieNm.replace(/ /g, ""); //영화명에서 공백 제거
    const releaseDts = movie.openDt.replace(/-/gi, ""); //개봉일에서 - 제거

    detailResult = await getMovieInfo({
      title: title,
      releaseDts: releaseDts,
    });

    // 만약 검색한 결과 값이 없을 경우 검색 조건을 바꿔서 한 번 더 시도
    if (detailResult.TotalCount === 0) {
      detailResult = await getMovieInfo({
        title: title,
        releaseDte: releaseDts,
      });
    }

    setMovieDetail(movie, detailResult);
  });
};

// 영화상세정보를 받아와 화면에 표시하는 함수
const setMovieDetail = async (movie, detailResult) => {
  //해당 영화의 순위에 해당하는 li 엘리먼트 찾기
  const li = document.getElementById(`rank${movie.rank}`);
  //영화 포스터를 li 엘리먼트의 배경 이미지로 설정
  if (li instanceof HTMLLIElement) {
    const poster =
      detailResult.posters.split("|")[0] === ""
        ? "../image/redfullogo.png"
        : detailResult.posters.split("|")[0];
    li.style.backgroundImage = `url(${poster})`;
    console.log(poster);

    // 영화 포스터를 이미지 태그로 생성
    const posterImg = document.createElement("img");
    posterImg.src = poster;
    posterImg.alt = "영화 포스터";
    posterImg.classList.add("movie-poster");

    // 영화 제목을 나타내는 div 엘리먼트 생성 및 설정
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("movie-title");
    titleDiv.textContent = movie.movieNm;
    //클릭 이벤트 -> 영화 상세 페이지로 이동
    li.addEventListener("click", () => {
      // window.location.href = "http://127.0.0.1:51713/post_list?id=" + uuid;
      location.href = `http://127.0.0.1:51713/searchResult?movieId=${detailResult.movieId}&movieSeq=${detailResult.movieSeq}&uuid=${db_num}`;
    });

    // li 엘리먼트에 영화 포스터와 영화 제목을 추가
    li.appendChild(posterImg);
    li.appendChild(titleDiv);
  }
};

//로딩 중인 요소들: loding 클래스 제거해 로딩 상태 숨기기
const hideLoading = () => {
  loadingItem.forEach((element) => {
    element.classList.remove("loading");
  });
};

async function get_hot_debate() {
  //sql 에서 값 가져오기
  fetch("http://127.0.0.1:51713/get_debate_post")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //data (nodejs Get 값)
      //동적으로 list 생성
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        const li_c = document.createElement("li");
        //list, btn 객체 생성
        const li_title = document.createElement("p");
        const li_content = document.createElement("p");
        const li_movie_id = document.createElement("p");
        const li_movie_name = document.createElement("p");
        const li_uuid = document.createElement("p");
        const li_uuid_post = document.createElement("p");

        var user_post_id =
          data[i].uuid_post + "|" + data[i].uuid_users + "|" + db_num;

        console.log(user_post_id);

        //객체 Id 값 설정
        li_c.setAttribute("id", user_post_id);
        li_c.setAttribute("class", "scroll--element");

        li_c.style.color = "black";
        //객체 Text값 설정
        const title = document.createTextNode("제목 : " + data[i].post_title);

        const content = document.createTextNode(
          "내용 : " + data[i].post_content
        );

        const movie_id = document.createTextNode(
          "영화id : " + data[i].post_movie_id
        );

        const movie_name = document.createTextNode(
          "영화 제목 :" + data[i].post_movie_name
        );

        const uuid = document.createTextNode(
          "users_uuid : " + data[i].uuid_users
        );

        const uuid_post = document.createTextNode(
          "post_uuid : " + data[i].uuid_post
        );

        //list text append
        li_title.appendChild(title);
        li_content.appendChild(content);
        li_movie_id.appendChild(movie_id);
        li_movie_name.appendChild(movie_name);
        li_uuid.appendChild(uuid);
        li_uuid_post.appendChild(uuid_post);

        //LiSt 에 값 할당
        li_c
          .appendChild(li_uuid)
          .appendChild(li_title)
          .appendChild(li_content)
          .appendChild(li_movie_id)
          .appendChild(li_movie_name)
          .appendChild(li_uuid_post);

        debate_ol.appendChild(li_c);

        li_c.onclick = function (e) {
          var uuid = e.currentTarget.id;
          window.location.href = "http://127.0.0.1:51713/post_page?id= " + uuid;
        };
      }
    })
    .catch((err) => {
      console.log("er", err);
    });
}

async function get_hot_post() {
  //sql 에서 값 가져오기
  fetch("http://127.0.0.1:51713/get_hot_post")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //data (nodejs Get 값)
      //동적으로 list 생성
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data);
        const li_c = document.createElement("li");
        //list, btn 객체 생성
        const li_title = document.createElement("p");
        const li_content = document.createElement("p");
        const li_movie_id = document.createElement("p");
        const li_movie_name = document.createElement("p");
        const li_uuid = document.createElement("p");
        const li_uuid_post = document.createElement("p");

        var user_post_id =
          data[i].uuid_post + "|" + data[i].uuid_users + "|" + db_num;

        console.log(user_post_id);

        //객체 Id 값 설정
        li_c.setAttribute("id", user_post_id);
        li_c.setAttribute("class", "scroll--element");

        li_c.style.color = "black";
        //객체 Text값 설정
        const title = document.createTextNode("제목 : " + data[i].post_title);

        const content = document.createTextNode(
          "내용 : " + data[i].post_content
        );

        const movie_id = document.createTextNode(
          "영화id : " + data[i].post_movie_id
        );

        const movie_name = document.createTextNode(
          "영화 제목 :" + data[i].post_movie_name
        );

        const uuid = document.createTextNode(
          "users_uuid : " + data[i].uuid_users
        );

        const uuid_post = document.createTextNode(
          "post_uuid : " + data[i].uuid_post
        );

        //list text append
        li_title.appendChild(title);
        li_content.appendChild(content);
        li_movie_id.appendChild(movie_id);
        li_movie_name.appendChild(movie_name);
        li_uuid.appendChild(uuid);
        li_uuid_post.appendChild(uuid_post);

        //LiSt 에 값 할당
        li_c
          .appendChild(li_uuid)
          .appendChild(li_title)
          .appendChild(li_content)
          .appendChild(li_movie_id)
          .appendChild(li_movie_name)
          .appendChild(li_uuid_post);

        post_ol.appendChild(li_c);

        li_c.onclick = function (e) {
          var uuid = e.currentTarget.id;
          window.location.href = "http://127.0.0.1:51713/post_page?id= " + uuid;
        };
      }
    })
    .catch((err) => {
      console.log("er", err);
    });
}

//페이지가 로드되면 실행되는 이벤트 핸들러
window.addEventListener("load", async () => {
  //함수 호출해 일별 박스 오피스 결과 얻어오기
  const results = await getBoxOfficeList();
  //각 영화에 대한 상세 정보 얻어와 표시
  movieDetail(results);
  get_hot_debate();
  get_hot_post();
  //함수 호출해 로딩 중인 상태 숨기기
  hideLoading();
});
