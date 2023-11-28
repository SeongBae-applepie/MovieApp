const urlParams = new URL(location.href).searchParams;

const db_uuid = urlParams.get("id");
//create Textfield
const user_id = document.getElementById("users");
const post_content = document.getElementById("memo");
const post_title = document.getElementById("title");
const post_debate = document.getElementById("debate");
const post_movie_id = document.getElementById("movie_name");
const post_movie_name = document.getElementById("movie_id");
//movie_select
user_id.innerText = db_uuid;

//post btn
const btn_add_posd = document.getElementById("post_btn");
//commet btn
const btn_add_comment = document.getElementById("comment_btn");

//create btn onclic
function btn_update_post_onclick() {
  var post_title_v = post_title.value;
  var post_content_v = post_content.value;
  var post_debate_v = post_debate.value;
  var post_movie_id_v = post_movie_id.value;
  var post_movie_name_v = post_movie_name.value;

  //생성할때 전달 오브젝트
  var obj = {
    post_title: post_title_v,
    uuid_users: db_uuid,
    post_content: post_content_v,
    post_debate: post_debate_v,
    post_movie_name: post_movie_name_v,
    post_movie_id: post_movie_id_v,
  };
  console.log(db_uuid);

  //fetch 로 nodejs Post 값 전달.
  fetch("http://pbl.hknu.ac.kr:51713/insert_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  window.location.href = "http://pbl.hknu.ac.kr:51713/post_list?id="+db_uuid;
}

//sql 에서 값 가져오기
fetch("http://pbl.hknu.ac.kr:51713/get_post")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    //data (nodejs Get 값)
    //동적으로 list 생성
    for (var i = 0; i < data.length; i++) {
      //list, btn 객체 생성
      const li = document.createElement("li");
      const btn_d = document.createElement("button");
      const btn_u = document.createElement("button");
      const btn_p = document.createElement("button");

      //객체 Id 값 설정
      li.setAttribute("id", i);
      btn_d.setAttribute("id", data[i].uuid_users);
      btn_u.setAttribute("id", i);
      btn_p.setAttribute("id", data[i].uuid_users);

      //객체 Text값 설정
      const textNode = document.createTextNode(
        "uuid : " +
          data[i].uuid_users +
          "id : " +
          data[i].id +
          "passwd :" +
          data[i].passwd +
          " 이름 : " +
          data[i].name +
          "생성날짜 :" +
          data[i].create_date
      );

      //list text append
      li.appendChild(textNode);
      btn_d.appendChild(textbtn_d);
      btn_u.appendChild(textbtn_u);
      btn_p.appendChild(textbtn_p);

      //LiSt 에 값 할당
      document.getElementById("comment_list").appendChild(li);
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
