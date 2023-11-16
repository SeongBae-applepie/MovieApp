const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const mysql = require("mysql2");
const dbconfig = require("./public/config/db_config");
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join("./public")));

var port = 51713;



setInterval(function () {
    conn = mysql.createConnection(dbconfig);
    console.log("ccDB");
    conn.connect(); // mysql과 연결
    conn.query('SELECT 1');
}, 60000);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/db", function (req, res) {
  res.sendFile(__dirname + "/public/db.html");
});

app.get("/api", function (req, res) {
  res.sendFile(__dirname + "/public/api.html");
});


app.get("/wbs", function (req, res) {
  res.sendFile(__dirname + "/public/wbs.html");
});

app.get("/demo", function (req, res) {
  res.sendFile(__dirname + "/public/demo.html");
  // res.end(__dirname+"/public/src/db.PNG")
});

// app.get("/crud", function (req, res) {
//   res.sendFile(__dirname + "/public/CRUD.html");
// });

//DB_R
app.get("/get_db", function (req, res) {
    conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql = "select * from users1";
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
});

//DB_C
app.get("/crud", function (request, response) {
  fs.readFile("./public/CRUD.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//DB_U
app.get("/update", function (request, response) {
  fs.readFile("./public/update.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//sql 생성
app.post("/insert", function (req, res) {
  console.log("Post_C");
  console.log(req.body);
  var sql =
    "INSERT INTO users1 (id, passwd, user_name, age)" +
    "VALUE (" +
    '"' +
    req.body.id +
    '"' +
    "," +
    '"' +
    req.body.passwd +
    '"' +
    "," +
    '"' +
    req.body.name +
    '"' +
    "," +
    req.body.age +
    ");";
  //나이 예외 처리 필요
  conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
});

//sql 삭제
app.post("/delete", function (req, res) {
  console.log(req.body);
  console.log("Post_D");

  sql = "delete from users1 where uuid =" + '"' + req.body.uuid + '"';
  conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
});

//sql 생성
app.post("/update_p", function (req, res) {
  console.log("Post_C");
  console.log(req.body);

  //나이 예외 처리 필요
  conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  // var sql =
  //   "INSERT INTO users1 (id, passwd, user_name, age)" +
  //   "VALUE (" +
  //   '"' +
  //   req.body.id +
  //   '"' +
  //   "," +
  //   '"' +
  //   req.body.passwd +
  //   '"' +
  //   "," +
  //   '"' +
  //   req.body.name +
  //   '"' +
  //   "," +
  //   req.body.age +
  //   ");";

  var sql =
    "update users1 set id =" +
    '"' +
    req.body.id +
    '"' +
    "," +
    "passwd =" +
    '"' +
    req.body.passwd +
    '"' +
    "," +
    "age = " +
    '" ' +
    req.body.age +
    '"' +
    "," +
    "user_name =" +
    '" ' +
    req.body.name +
    '"' +
    " where uuid = " +
    '"' +
    req.body.uuid +
    '"';

  //update users1 set id = "1", passwd = "2", age = "4",user_name = "aaa" where id_uuid = "a3182bc6-83ca-11ee-a489-a385b1e66c6d"
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
});

app.listen(port, () => {
  //클라이언트 대기
  console.log("listening on ??? *:" + port);
});
