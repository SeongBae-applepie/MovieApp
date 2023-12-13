//별 개수 불러와서 받아서 별 생성
const starRating = $container => {
  const statNum = $container.getAttribute('data-max-rating')

  const items = document.createElement("div")
  items.classList.add("star-rating-container");

  for (let i = 0; i < statNum; i++) {
      const item = document.createElement("i")
      item.className = 'bx bxs-star'
      items.appendChild(item)
  }
  return items
}



const $containers = [...document.querySelectorAll('.star-rating-container')];
const $currentRatings = document.querySelectorAll('.current-star-rating > span');

$containers.forEach(($container, i) => {
// star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달해 star 요소들로 구성된 star-rating 요소를 동적 생성한다.
const starContainer = starRating($container);
$container.appendChild(starContainer)
let indexState = -1
let clickState = -1

// 마우스 오버가 발생하면 hovered클래스 생성
$container.addEventListener('mouseover', e => {
  const nodes = [...e.target.parentElement.children];
  const index = nodes.indexOf(e.target)

  if (e.target.nodeName === "I") {
    if (indexState !== index) {         //인덱스 상태와 현재 인덱스랑 비교, 같지 않은 경우 체크
      if (indexState < index) {         //현재 인덱스가 더 큰 경우 index까지 색칠해줌
        for (let i = 0; i <= index; i++) {
          nodes[i].classList.add("hovered")
        }
      } else {
        for (let i = indexState; index <= i; i--) {
          nodes[i].classList.remove("hovered")
        }
      }
      indexState = index              //인덱스 상태값 교체
    }
  }
});

// 마우스가 별에서 떨어지면 생성되었던 hovered클래스가 제거된다
$container.addEventListener('mouseout', e => {
  indexState = -1
  const nodes = [...e.target.parentElement.children];
  const index = nodes.indexOf(e.target)

  for (let i = 0; i <= index; i++) {
    nodes[i].classList.remove("hovered")
  }
});

//클릭이벤트 발생생시 별점 포인트 색상 변경
$container.addEventListener('click', e => {
  const nodes = [...e.target.parentElement.children];
  const index = nodes.indexOf(e.target);
  console.log(index);
  result = score(index);
  send_star_db(result);
  teststar.innerText = result;

  if (e.target.nodeName === "I") {
    if (clickState !== index) {         //인덱스 상태와 현재 인덱스랑 비교, 같지 않은 경우 체크
      if (clickState < index) {         //현재 인덱스가 더 큰 경우 index까지 색칠해줌
        for (let i = 0; i <= index; i++) {
          nodes[i].classList.add("selected")
        }
      } else {
        for (let i = clickState; index < i; i--) {
          nodes[i].classList.remove("selected")
        }
      }
      clickState = index                //체크 상태값 교체
      console.log("클릭으로 인한 상태:", clickState)
    }
    $currentRatings[i].textContent = index + 1;
  }
});
});
