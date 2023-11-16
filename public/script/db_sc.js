var request = "http://pbl.hknu.ac.kr:51713/get_db";
//get db
fetch(request)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(i);
      const li = document.createElement("li");
      li.setAttribute("id", i);
      const textNode = document.createTextNode(
        "id : " + data[i].id + " 이름 : " + data[i].user_name
      );
      li.appendChild(textNode);
      console.log(data[0].id);
      document.getElementById("user_list").appendChild(li);
    }
  })
  .catch((err) => {
    console.log("er", err);
  });
