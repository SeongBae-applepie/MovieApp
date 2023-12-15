const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

console.log("users+id");
console.log(db_num);

const list_c = document.getElementById("list_c");
// const search_i = document.getElementById("search");

const bottom_c = document.getElementById("go_c");
const bottom_h = document.getElementById("go_h");
const bottom_e = document.getElementById("go_e");
const bottom_m = document.getElementById("go_m");
const go_logo = document.getElementById("go_logo");
const search_i = document.getElementById("search");
search_i.onclick = function () {
  // console.log("sss");
  location.href = `http://pbl.hknu.ac.kr:51713/search?uuid=${db_num}`;
};

go_logo.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/chart?id=${db_num}`;
};

bottom_h.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/chart?id=${db_num}`;
};

bottom_c.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/community?id=${db_num}`;
};
bottom_e.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/event?id=${db_num}`;
};
bottom_m.onclick = function () {
  location.href = `http://pbl.hknu.ac.kr:51713/mypage?id=${db_num}`;
};


// search_i.onclick = function () {
//   // console.log("sss");
//   location.href = `http://pbl.hknu.ac.kr:51713/search?uuid=${db_num}`;
// };
function add_post() {
  window.location.href = "http://pbl.hknu.ac.kr:51713/insert_post?id=" + db_num;
}


fetch("http://pbl.hknu.ac.kr:51713/get_uuid_users_name")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      user_post_id =
        data[i].uuid_post + "|" + data[i].uuid_users + "|" + db_num;
      console.log(user_post_id);

      var date = data[i].post_create_date.substr(0, 10);

      const div_o = document.createElement("div");
      div_o.setAttribute("class", "combined-card");
      div_o.setAttribute("id", user_post_id);
      //41
      const div_1_41 = document.createElement("div");
      div_1_41.setAttribute("class", "post-card post-card-41");
      const div_2_41 = document.createElement("div");
      div_2_41.setAttribute("class", "circle");
      const table_41 = document.createElement("table");
      const tr_1_41 = document.createElement("tr");
      const td_1_41 = document.createElement("td");
      const tr_2_41 = document.createElement("tr");
      const td_2_41 = document.createElement("td");

      td_1_41.setAttribute("id", "td_1_41");
      td_2_41.setAttribute("id", "td_1_41");

      var td_1_41_t = document.createTextNode(data[i].name);

      td_1_41.appendChild(td_1_41_t);

      var td_2_41_t = document.createTextNode("  " + date);
      td_2_41.appendChild(td_2_41_t);

      div_1_41.appendChild(div_2_41);
      div_1_41.appendChild(table_41);

      table_41.appendChild(tr_1_41);
      div_1_41.appendChild(table_41);
      table_41.appendChild(tr_1_41);
      table_41.appendChild(tr_2_41);
      tr_1_41.appendChild(td_1_41);
      tr_2_41.appendChild(td_2_41);

      div_o.appendChild(div_1_41);

      //42
      const div_1_42 = document.createElement("div");
      div_1_42.setAttribute("class", "post-card post-card-42");
      const table_42 = document.createElement("table");
      const tr_1_42 = document.createElement("tr");
      const td_1_42 = document.createElement("td");
      const tr_2_42 = document.createElement("tr");
      const td_2_42 = document.createElement("td");

      // var td_1_42_t = document.createTextNode( <strong> + data[i].post_title</strong> );
      // td_1_42.appendChild(td_1_42_t);
      td_1_42.innerHTML = "<strong>" + data[i].post_title+ "</strong>";
            var td_2_42_t = document.createTextNode(data[i].post_content);
      td_2_42.appendChild(td_2_42_t);

      div_1_42.appendChild(table_42);
      table_42.appendChild(tr_1_42);
      table_42.appendChild(tr_2_42);
      tr_1_42.appendChild(td_1_42);
      tr_2_42.appendChild(td_2_42);

      //end------

      div_o.appendChild(div_1_42);

      div_o.onclick = function (e) {
        var uuid = e.currentTarget.id;
        window.location.href = "http://pbl.hknu.ac.kr:51713/post_page?id= " + uuid;
      };

      document.getElementById("list_c").append(div_o);
    }
  })
  .catch((err) => {
    console.log("er", err);
  });

//sql 에서 값 가져오기
