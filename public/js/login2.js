import { getBoxOfficeList } from "../api/boxOfficeApi.js";
const login = document.getElementById("login");
const user_id = document.getElementById("user_id");
const user_passwd = document.getElementById("user_passwd");

console.log(await getBoxOfficeList());
window.localStorage.setItem("movie",JSON.stringify(await getBoxOfficeList()));


login.onclick = function () {

  console.log("nn");
  var user_id_v = user_id.value;
  var user_passwd_v = user_passwd.value;
  console.log(user_id_v);

  fetch(`http://pbl.hknu.ac.kr:51713/get_login?${user_id_v}|${user_passwd_v}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        console.log(data[0]);
        console.log(data[0].uuid_users);
        window.location.href =
          "http://pbl.hknu.ac.kr:51713/chart?id=" + data[0].uuid_users;
          // "http://pbl.hknu.ac.kr:51713/chart";
      } else {
        alert("아이디가 없습니다!");
      }
    })
    .catch((err) => {
      console.log("er", err);
    });
}
