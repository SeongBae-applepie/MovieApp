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
  "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=c3a7a8c29dd8b16ea02a63b2f43335e8&targetDt=" +
  year +
  month +
  date;

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

      var request2 =
        "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&RANK&title=" +
        data.boxOfficeResult.dailyBoxOfficeList[i].movieNm +
        "&ServiceKey=4786FH56Q4Q7K100VTQK";

      fetch(request2)
        .then((response) => {
          //console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data.Data);
          var url = String(data.Data[0].Result[0].posters).split("|");
          console.log(url[0]);
          //console.log(data.Data.Result[0].posters);
        })
        .catch((err) => {
          console.log("er", err);
        });

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
