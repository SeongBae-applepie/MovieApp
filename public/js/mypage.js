const urlParams = new URL(location.href).searchParams;

const db_num = urlParams.get("id");

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
}

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
