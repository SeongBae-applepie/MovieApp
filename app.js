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
const conn = mysql.createConnection(dbconfig);

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join("./public")));

var port = 51713;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/db", function (req, res) {
  res.sendFile(__dirname + "/public/db.html");
});

app.get("/api", function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "/public/api.html");
});

app.get("/m", function (req, res) {
  var result = get_db();
  console.log(result);
  res.send(result);
});

app.get("/wbs", function (req, res) {
  res.sendFile(__dirname + "/public/wbs.html");
});

app.get("/demo", function (req, res) {
  res.sendFile(__dirname + "/public/demo.html");
  // res.end(__dirname+"/public/src/db.PNG")
});

app.get("/crud", function (req, res) {
  res.sendFile(__dirname + "/public/CRUD.html");
});

//DB_R
app.get("/get_db", function (req, res) {
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql = "select * from users1";
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//DB_C

app.get("/insert", function (request, response) {
  fs.readFile("./public/CRUD.html", "utf8", function (error, data) {
    //응답
    response.send(data);
  });
});

app.post("/insert", function (req, res) {
  console.log(req.body);

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql =
    "INSERT INTO users1 (id, passwd, user_name, age)" +
    "VALUE (" +
    '"' +
    req.body.id +
    '"' +
    "," +
    '"' +
    req.body.psswd +
    '"' +
    "," +
    '"' +
    req.body.name +
    '"' +
    "," +
    req.body.age +
    ");";
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

app.post("/delete", function (req, res) {
  console.log(req.body.uuid);

  sql = "delete from users1 where id_uuid =" + '"' + req.body.uuid + '"';
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
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
