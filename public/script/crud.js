//create Textfield
const user_id = document.getElementById("user_id");
const user_passwd = document.getElementById("user_passwd");
const user_name = document.getElementById("user_name");
const user_age = document.getElementById("user_age");

//create btn
const btn_add_user = document.getElementById("create_user");

//create btn onclic
function btn_add_user_onclick() {
  var user_id_v = user_id.value;
  var user_passwd_v = user_passwd.value;
  var user_name_v = user_name.value;
  var user_age_v = user_age.value;

  //생성할때 전달 오브젝트
  var obj = {
    id: user_id_v,
    passwd: user_passwd_v,
    name: user_name_v,
    age: user_age_v,
  };

  console.log(obj);

  //fetch 로 nodejs Post 값 전달.
  fetch("http://pbl.hknu.ac.kr:51713/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  location.reload(true);
}

//sql 에서 값 가져오기
fetch("http://pbl.hknu.ac.kr:51713/get_db")
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

      //객체 Id 값 설정
      li.setAttribute("id", i);
      btn_d.setAttribute("id", data[i].uuid);
      btn_u.setAttribute("id", i);

      //객체 Text값 설정
      const textNode = document.createTextNode(
        "id : " + data[i].id + " 이름 : " + data[i].user_name + "     "
      );
      const textbtn_d = document.createTextNode("삭제");
      const textbtn_u = document.createTextNode("수정");

      //list text append
      li.appendChild(textNode);
      btn_d.appendChild(textbtn_d);
      btn_u.appendChild(textbtn_u);

      //LiSt 에 값 할당
      document.getElementById("user_list").appendChild(li).appendChild(btn_d);
      document.getElementById("user_list").appendChild(btn_u);

      //삭제 btn
      btn_d.onclick = function (e) {
        console.log(e.target.id);

        obj = {
          uuid: e.target.id,
        };

        console.log(obj);

        fetch("http://pbl.hknu.ac.kr:51713/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        location.reload(true);
      };

      //수정 btn
      btn_u.onclick = function (e) {
        console.log("수정");
        var num = Number(e.target.id);
        window.location.href = "http://pbl.hknu.ac.kr:51713/update?id=" + num;
      };
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
