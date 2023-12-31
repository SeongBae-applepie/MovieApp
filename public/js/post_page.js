const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");
console.log(db_num);
var words = db_num.split("|");
uuid_post_user = words[1];
uuid_post_s = words[0];
uuid_login_s = words[2];
uuid_post = uuid_post_s.split(" ").join("");
uuid_login = uuid_login_s.split(" ").join("");

window.addEventListener("load", post_views());

//commet btn
const btn_add_comment = document.getElementById("comment_btn");
const li_add_comment = document.getElementById("memo");
const ol_list_comment = document.getElementById("comment_list");

const movie_title_text = document.getElementById("movie_title_text");
const name_text = document.getElementById("name_text");
const date_text = document.getElementById("date_text");
const title_text = document.getElementById("title_text");
const poster = document.getElementById("poster");
const movie_title_text2 = document.getElementById("movie_title_text2");
const movie_detail = document.getElementById("movie_detail");
const content_text = document.getElementById("content_text");
// const comment_name = document.getElementById("comment_name");
// const comment_content = document.getElementById("comment_content");
// btn-heart
const like_btn = document.getElementById("like_i");
const num_like = document.getElementById("num");
like_i = 0;
like_btn.onclick = function(){
  if(like_i == 0){
    like_btn.src = '../img/like.png'
    like_i =1;
    num_like.innerText="5"
  }else{
    like_btn.src = '../img/redlike.png'
    like_i =0;
    num_like.innerText="6"
  }


}
const bottom_c = document.getElementById("go_c");
const bottom_h = document.getElementById("go_h");
const bottom_e = document.getElementById("go_e");
const bottom_m = document.getElementById("go_m");
const go_logo = document.getElementById("go_logo");
const search_i = document.getElementById("search");
search_i.onclick = function () {
  // console.log("sss");
  location.href = `http://pbl.hknu.ac.kr:51713/search?uuid=${uuid_post_user}`;
};

go_logo.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/chart?id=${uuid_post_user}`;
};

bottom_h.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/chart?id=${uuid_post_user}`;
};

bottom_c.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/community?id=${uuid_post_user}`;
};
bottom_e.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/event?id=${uuid_post_user}`;
};
bottom_m.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/mypage?id=${uuid_post_user}`;
};


$(window).on('load resize', function() {
  var imgHeight = $('.example').height(); // 이미지 높이를 가져옴 example << 이미지 이름 
  var newHeight = imgHeight * 1.1; // 이미지 높이의 110%를 계산
  $('.movieData').css('height', newHeight + 'px'); // .movieData의 높이를 새로운 높이로 설정
});


function post_views() {
  obj = {
    uuid_post: uuid_post,
  };

  fetch("http://pbl.hknu.ac.kr:51713/views_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
}

// //댓글 추가
// btn_add_comment.onclick = function () {
//   console.log("son");
//   var oj = {
//     uuid_post: uuid_post,
//     uuid_users: uuid_login,
//     comment_conent: li_add_comment.value,
//   };

//   fetch("http://pbl.hknu.ac.kr:51713/insert_comment", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(oj),
//   });

//   location.reload(true);
// };

//Get post content 내용 가져오기
fetch("http://pbl.hknu.ac.kr:51713/get_id_post?id=" + uuid_post)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    //data (nodejs Get 값)
    //동적으로 list 생성
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      var date = data[i].post_create_date.substr(0, 10);
      a = document.createTextNode(data[i].post_movie_name);
      movie_title_text.appendChild(a);
      // name_text.appendChild(); //작성자 이름
      b = document.createTextNode(date);
      date_text.appendChild(b);
      c = document.createTextNode(data[i].post_title);
      title_text.appendChild(c);
      poster.src = data[i].post_movie_poster;
      d = document.createTextNode(data[i].post_movie_name);
      movie_title_text2.appendChild(d);

      // movie_detail.appendChild(f);
      e = document.createTextNode(data[i].post_content);
      content_text.appendChild(e);
    }
  })
  .catch((err) => {
    console.log("er", err);
  });

//-----get comment list-----

//get comment list

var obj = {
  uuid_post: uuid_post,
};

fetch("http://pbl.hknu.ac.kr:51713/get_id_comment?id= " + uuid_post)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data.length);
      const li_c = document.createElement("li");
      //list 객체 생성
      const li_id = document.createElement("p");
      const li_comment = document.createElement("p");

      //객체 Id 값 설정
      li_c.setAttribute("id", i);

      //객체 Text값 설정
      const li_id_t = document.createTextNode("아이디 : " + data[i].uuid_users);
      const li_comment_t = document.createTextNode(
        "내용 : " + data[i].comment_conent
      );

      //list text append
      li_id.appendChild(li_id_t);
      li_comment.appendChild(li_comment_t);

      //LiSt 에 값 할당
      li_c.appendChild(li_id).appendChild(li_comment);

      document.getElementById("comment_list").appendChild(li_c);
    }
  });
