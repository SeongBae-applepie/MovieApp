var request = "http://127.0.0.1:51713/get_db";

const user_id = document.getElementById("user_id");
const user_passwd = document.getElementById("user_passwd");
const user_name = document.getElementById("user_name");
const user_age = document.getElementById("user_age");

const btn_add_user = document.getElementById("create_user");

function btn_add_user_onclic() {
  var user_id_v = user_id.value;
  var user_passwd_v = user_passwd.value;
  var user_name_v = user_name.value;
  var user_age_v = user_age.value;

  var obj = {
    id: user_id_v,
    passwd: user_passwd_v,
    name: user_name_v,
    age: user_age_v,
  };

  fetch("http://127.0.0.1:51713/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  location.reload(true);
}

fetch(request)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (var i = 0; i < data.length; i++) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      li.setAttribute("id", i);
      btn.setAttribute("id", data[i].id_uuid);
      const textNode = document.createTextNode(
        "id : " + data[i].id + " 이름 : " + data[i].user_name + "     "
      );
      const textbtn = document.createTextNode("삭제");
      li.appendChild(textNode);
      btn.appendChild(textbtn);
      document.getElementById("user_list").appendChild(li).appendChild(btn);

      btn.onclick = function (e) {
        console.log(e.target.id);

        obj = {
          uuid: e.target.id,
        };

        console.log(obj);

        fetch("http://127.0.0.1:51713/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        location.reload(true);
      };
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
