const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

var words = db_num.split("|");
uuid_user = words[1];
uuid_post_s = words[0];
uuid_post = uuid_post_s.split(" ").join("");

//commet btn
const btn_add_comment = document.getElementById("comment_btn");
const li_add_comment = document.getElementById("memo");
const ol_list_comment = document.getElementById("comment_list");
//comment_list

//댓글 추가
btn_add_comment.onclick = function () {
  console.log("son");
  console.log(li_add_comment.value);
  var oj = {
    uuid_post: uuid_post,
    uuid_users: uuid_user,
    comment_content: li_add_comment.value,
  };

  fetch("http://pbl.hknu.ac.kr:51713/insert_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oj),
  });
  location.reload(true);
};

//Get post content 내용 가져오기
fetch("http://pbl.hknu.ac.kr:51713/get_id_post?id=" + uuid_post)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    //data (nodejs Get 값)
    //동적으로 list 생성
    for (var i = 0; i < data.length; i++) {
      const li_c = document.createElement("li");
      //list, btn 객체 생성
      const li_title = document.createElement("p");
      const li_content = document.createElement("p");
      const li_movie_id = document.createElement("p");
      const li_movie_name = document.createElement("p");
      const li_uuid = document.createElement("p");

      //객체 Id 값 설정
      li_c.setAttribute("id", i);


      //객체 Text값 설정
      const title = document.createTextNode("제목 : " + data[i].post_title);

      const content = document.createTextNode("내용 : " + data[i].post_content);

      const movie_id = document.createTextNode(
        "영화id : " + data[i].post_movie_id
      );

      const movie_name = document.createTextNode(
        "영화 제목 :" + data[i].post_movie_name
      );

      const uuid = document.createTextNode("user_uuid : " + data[i].uuid_users);

      //list text append
      li_title.appendChild(title);
      li_content.appendChild(content);
      li_movie_id.appendChild(movie_id);
      li_movie_name.appendChild(movie_name);
      li_uuid.appendChild(uuid);
      //LiSt 에 값 할당
      li_c
        .appendChild(li_uuid)
        .appendChild(li_title)
        .appendChild(li_content)
        .appendChild(li_movie_id)
        .appendChild(li_movie_name);

      document.getElementById("post_list").appendChild(li_c);

      // location.reload(true);
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

    return res.json();
  })
  .then((data) => {

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
        "내용 : " + data[i].comment_content
      );

      //list text append
      li_id.appendChild(li_id_t);
      li_comment.appendChild(li_comment_t);

      //LiSt 에 값 할당
      li_c.appendChild(li_id).appendChild(li_comment);

      document.getElementById("comment_list").appendChild(li_c);
    }
  });
