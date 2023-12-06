const user_id = document.getElementById("user_id");
const user_passwd = document.getElementById("user_passwd");
const user_name = document.getElementById("user_name");

function btn_login() {
  console.log("nn");
  var user_id_v = user_id.value;
  var user_passwd_v = user_passwd.value;

  fetch(`http://127.0.0.1:51713/get_login?${user_id_v}|${user_passwd_v}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        window.location.href =
          "http://127.0.0.1:51713/chart?id=" + data.uuid_users;
      } else {
        alert("아이디가 없습니다!");
      }
    })
    .catch((err) => {
      console.log("er", err);
    });
}

// 2. 카카오 초기화
Kakao.init("3d95c617c738c50b0bed0103658da3a5");
console.log(Kakao.isInitialized()); // 초기화 판단여부

function loginWithKakao() {
  Kakao.Auth.login({
    success: function (authObj) {
      console.log(authObj); // access토큰 값
      Kakao.Auth.setAccessToken(authObj.access_token); // access토큰값 저장

      getInfo();
    },
    fail: function (err) {
      console.log(err);
    },
  });
}

// 4. 엑세스 토큰을 발급받고, 아래 함수를 호출시켜서 사용자 정보를 받아옴.
function getInfo() {
  Kakao.API.request({
    url: "/v2/user/me",
    success: function (res) {
      var email = res.kakao_account.email;
      var nickname = res.kakao_account.profile.nickname;
      var profile_image = res.kakao_account.profile.thumbnail_image_url;

      // 서버로 사용자 데이터 전송
      fetch("/save_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nickname, profile_image }),
      })
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
          window.location.href = "/test"; // 홈페이지로 리다이렉트
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("사용자 데이터 전송 중 에러가 발생했습니다."); // 사용자에게 에러 메시지 보여주기
        });
    },
    fail: function (error) {
      alert(
        "카카오 로그인에 실패했습니다. 관리자에게 문의하세요." +
          JSON.stringify(error)
      );
    },
  });
}

// 5. 로그아웃 기능 - 카카오 서버에 접속하는 엑세스 토큰을 만료, 사용자 어플리케이션의 로그아웃은 따로 진행.
function kakaoLogout() {
  if (!Kakao.Auth.getAccessToken()) {
    alert("Not logged in.");
    return;
  }
  Kakao.Auth.logout(function () {
    alert("logout ok\naccess token -> " + Kakao.Auth.getAccessToken());
  });
}
