import { getBoxOfficeList } from "../api/boxOfficeApi.js";
import { getMovieInfo } from "../api/movieApi.js";

const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

console.log("users+id");
const search_i = document.getElementById("search");

const bottom_c = document.getElementById("go_c");
const bottom_h = document.getElementById("go_h");
const bottom_e = document.getElementById("go_e");
const bottom_m = document.getElementById("go_m");

bottom_h.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/chart?id=${db_num}`;
};

bottom_c.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/community?id=${db_num}`;
};
bottom_e.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/event?id=${db_num}`;
};
bottom_m.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/mypage?id=${db_num}`;
};


search_i.onclick = function () {
  // console.log("sss");
  location.href = `http://pbl.hknu.ac.kr:51713/search?uuid=${db_num}`;
};
console.log(db_num);

const loadingItem = document.querySelectorAll(".loading");

const debate_ol = document.getElementById("debate_ol");
// const post_ol = document.getElementById("post_ol");




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
    // li.style.backgroundImage = `url(${poster})`;
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
      location.href = `http://pbl.hknu.ac.kr:51713/searchResult?movieId=${detailResult.movieId}&movieSeq=${detailResult.movieSeq}&uuid=${db_num}`;
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
  fetch("http://pbl.hknu.ac.kr:51713/get_debate_post")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        const div_post_data = document.createElement("div");
        div_post_data.setAttribute("class", "postData");
        div_post_data.style.marginTop = "30%";
        const table = document.createElement("table");
        const tbody = document.createElement("tbody");
        const tr1 = document.createElement("tr");
        const td_title = document.createElement("td");
        td_title.style.fontSize = "18px";
        td_title.style.color = "#b7b7b7ff";
        const tr2 = document.createElement("tr");
        const td_content = document.createElement("td");

        table.setAttribute("class", "card-m");

        var user_post_id =
          data[i].uuid_post + "|" + data[i].uuid_users + "|" + db_num;

        //객체 Id 값 설정
        div_post_data.setAttribute("id", user_post_id);

        //객체 Text값 설정
        const title = document.createTextNode("제목 : " + data[i].post_title);

        const content = document.createTextNode(
          "내용 : " + data[i].post_content
        );

        //list text append
        // li_title.appendChild(title);
        // li_content.appendChild(content);
        // li_movie_id.appendChild(movie_id);
        // li_movie_name.appendChild(movie_name);
        // li_uuid.appendChild(uuid);
        // li_uuid_post.appendChild(uuid_post);

        td_title.appendChild(title);
        td_content.appendChild(content);

        // //LiSt 에 값 할당
        // li_c
        //   .appendChild(li_uuid)
        //   .appendChild(li_title)
        //   .appendChild(li_content)
        //   .appendChild(li_movie_id)
        //   .appendChild(li_movie_name)
        //   .appendChild(li_uuid_post);

        // debate_ol.appendChild(li_c);

        div_post_data.appendChild(table);
        table.appendChild(tbody);

        tbody.appendChild(tr1);
        tbody.appendChild(tr2);
        tr1.appendChild(td_title);
        tr2.appendChild(td_content);
        post_ol.appendChild(table);

        table.onclick = function (e) {
          var uuid = e.currentTarget.id;
          window.location.href = "http://pbl.hknu.ac.kr:51713/post_page?id= " + uuid;
        };
      }
    })
    .catch((err) => {
      console.log("er", err);
    });
}

async function get_hot_post() {
  //sql 에서 값 가져오기
  fetch("http://pbl.hknu.ac.kr:51713/get_hot_post")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        const table = document.createElement("table");
        const tbody = document.createElement("tbody");
        const tr1 = document.createElement("tr");
        const td_title = document.createElement("td");
        td_title.style.fontSize = "18px";
        td_title.style.color = "#b7b7b7ff";
        const tr2 = document.createElement("tr");
        const td_content = document.createElement("td");


        var user_post_id =
          data[i].uuid_post + "|" + data[i].uuid_users + "|" + db_num;
        table.setAttribute("id", user_post_id);

        //객체 Text값 설정

        var title_array;
        var content_array;

        if (data[i].post_title.length > 10) {
          title_array = data[i].post_title.substr(0, 10);
        } else {
          title_array = data[i].post_title;
        }

        if (data[i].post_content.length > 10) {
          content_array = data[i].post_content.substr(0, 10);
        } else {
          content_array = data[i].post_content;
        }

        console.log(content_array);
        console.log(title_array);
        const content = document.createTextNode("내용 : " + content_array);
        const title = document.createTextNode("제목 : " + title_array);

        td_title.appendChild(title);
        td_content.appendChild(content);

        table.appendChild(tbody);
        tbody.appendChild(tr1);
        tbody.appendChild(tr2);
        tr1.appendChild(td_title);
        tr2.appendChild(td_content);

        debate_ol.appendChild(table);

        table.onclick = function (e) {
          var uuid = e.currentTarget.id;
          window.location.href = "http://pbl.hknu.ac.kr:51713/post_page?id= " + uuid;
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
