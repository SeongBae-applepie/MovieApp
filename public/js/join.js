const user_id = document.getElementById("user_id");
const user_passwd = document.getElementById("user_passwd");
const user_name = document.getElementById("user_name");

function user_btn() {
  var user_id_v = user_id.value;
  var user_passwd_v = user_passwd.value;
  var user_name_v = user_name.value;

  var obj = {
    id: user_id_v,
    passwd: user_passwd_v,
    name: user_name_v,
  };

  console.log(obj);

  //fetch 로 nodejs Post 값 전달.
  fetch("http://127.0.0.1:51713/insert_users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  window.location.href = "http://127.0.0.1:51713/login2";
}
