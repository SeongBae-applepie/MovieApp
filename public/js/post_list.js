const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

console.log("users+id");
console.log(db_num);

//commet btn
// const btn_add_comment = document.getElementById("comment_btn");
// const btn_add_post = document.getElementById("add_post");

function btn_add_post() {
  window.location.href = "http://pbl.hknu.ac.kr:51713/insert_post?id=" + db_num;
}

//sql 에서 값 가져오기
fetch("http://pbl.hknu.ac.kr:51713/get_all_post")
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
      const btn_delete_post = document.createElement("button");

      user_post_id =
        data[i].uuid_post + "|" + data[i].uuid_users + "|" + db_num;

      user_delete_id = data[i].uuid_post + "|" + data[i].uuid_users;
      //객체 Id 값 설정
      li_c.setAttribute("id", user_post_id);
      btn_delete_post.setAttribute("id", user_delete_id);
      console.log(li_c.id);

      //객체 Text값 설정
      const title = document.createTextNode("제목 : " + data[i].post_title);

      const content = document.createTextNode("내용 : " + data[i].post_content);

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

      const delete_b = document.createTextNode("삭제");

      //list text append
      li_title.appendChild(title);
      li_content.appendChild(content);
      li_movie_id.appendChild(movie_id);
      li_movie_name.appendChild(movie_name);
      li_uuid.appendChild(uuid);
      li_uuid_post.appendChild(uuid_post);
      btn_delete_post.appendChild(delete_b);

      //LiSt 에 값 할당
      li_c
        .appendChild(li_uuid)
        .appendChild(li_title)
        .appendChild(li_content)
        .appendChild(li_movie_id)
        .appendChild(li_movie_name)
        .appendChild(li_uuid_post);

      document.getElementById("post_list").appendChild(li_c);
      document.getElementById("post_list").append(btn_delete_post);

      btn_delete_post.onclick = function (e) {
        // var uuid = e.currentTarget.id;
        var words = e.currentTarget.id.split("|");
        console.log(words[1]);
        console.log(db_num);
        var uuid_post_d = words[0];
        var uuid_user_d = words[1];

        if (uuid_user_d == db_num) {
          //생성할때 전달 오브젝트
          var obj = {
            uuid_post: uuid_post_d,
          };

          //fetch 로 nodejs Post 값 전달.
          fetch("http://pbl.hknu.ac.kr:51713/delete_post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          });

          location.reload(true);
        } else {
          alert("본인의 글만 삭제 가능 합니다.");
        }
      };

      li_c.onclick = function (e) {
        var uuid = e.currentTarget.id;

        window.location.href = "http://pbl.hknu.ac.kr:51713/post_page?id= " + uuid;
      };
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
