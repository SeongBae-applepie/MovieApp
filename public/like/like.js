document.getElementById('btn-heart').addEventListener('change', function() {
  var img = document.getElementById('img-like');
  if(this.checked) {
      img.src = '../img/redlike.png'; // 좋아요를 눌렀을 때의 이미지
  } else {
      img.src = '../img/like.png'; // 좋아요를 취소했을 때의 이미지
  }
});