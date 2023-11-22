const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

//commet btn
const btn_add_comment = document.getElementById("comment_btn");

//sql 에서 값 가져오기
fetch("http://127.0.0.1:51713/get_all_post")
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

      //객체 Id 값 설정
      li_c.setAttribute("id", i);

      //객체 Text값 설정
      const title = document.createTextNode("제목 : " + data[i].post_title);

      const content = document.createTextNode("내용 : " + data[i].post_conent);

      const movie_id = document.createTextNode(
        "영화id : " + data[i].post_movie_id
      );

      const movie_name = document.createTextNode(
        "영화 제목 :" + data[i].post_movie_name
      );

      const uuid = document.createTextNode("post_uuid : " + data[i].uuid_users);

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

      li_c.onclick = function (e) {
        window.location.href = "http://127.0.0.1:51713/post_page";
      };
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
