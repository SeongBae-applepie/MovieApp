console.log("stat");
var today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate() - 1; // 날짜

if (month < 10) {
  month = "0" + month;
} else if (date < 10) {
  date = "0" + date;
}

var request =
  "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=아이언맨&ServiceKey=4786FH56Q4Q7K100VTQK";

console.log("set date : " + year + month + date);

fetch(request)
  .then((response) => {
    //console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for (var i = 0; i < data.boxOfficeResult.dailyBoxOfficeList.length; i++) {
      const li = document.createElement("li");
      li.setAttribute("id", i);
      const textNode = document.createTextNode(
        data.boxOfficeResult.dailyBoxOfficeList[i].movieNm
      );
      li.appendChild(textNode);
      console.log(data.boxOfficeResult.dailyBoxOfficeList[i].movieNm + "\n");
      document.getElementById("moivelist").appendChild(li);
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
