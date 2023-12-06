const btnHeart = document.getElementById("btn-heart");

btnHeart.addEventListener("change", () => {
  //change 이벤트를 감지해 체크박스 선택 상태가 변경될 때 호출
    const labelHeart = document.querySelector("label[for='btn-heart']");
    labelHeart.classList.toggle("select", btnHeart.checked);
    //select 클래스 토글
    //체크박스의 checked 속성이 true면 추가하고 false면 제거
});
