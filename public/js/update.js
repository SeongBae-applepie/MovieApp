const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");
//create Textfield
const user_id = document.getElementById("user_id");
const user_passwd = document.getElementById("user_passwd");
const user_name = document.getElementById("user_name");
const user_age = document.getElementById("user_age");

//create btn
const btn_add_user = document.getElementById("create_user");

var request = "http://pbl.hknu.ac.kr:51713/get_db";
var id_uuid;
//get db
fetch(request)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data[db_num]);
    user_id.value = data[db_num].id;
    user_passwd.value = data[db_num].passwd;
    user_name.value = data[db_num].user_name;
    user_age.value = data[db_num].age;
    id_uuid = data[db_num].uuid;
  })
  .catch((err) => {
    console.log("er", err);
  });

//create btn onclic
function btn_update_user_onclick() {
  var user_id_v = user_id.value;
  var user_passwd_v = user_passwd.value;
  var user_name_v = user_name.value;
  var user_age_v = user_age.value;

  //생성할때 전달 오브젝트
  var obj = {
    uuid: id_uuid,
    id: user_id_v,
    passwd: user_passwd_v,
    name: user_name_v,
    age: user_age_v,
  };

  //fetch 로 nodejs Post 값 전달.
  fetch("http://pbl.hknu.ac.kr:51713/update_p", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  window.location.href = "http://pbl.hknu.ac.kr:51713/CRUD";
}
