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

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/home.html");
});

app.get("/db", function (req, res) {
  res.sendFile(__dirname + "/public/html/db.html");
});

app.get("/api", function (req, res) {
  res.sendFile(__dirname + "/public/html/api.html");
});

app.get("/api_p", function (req, res) {
  res.sendFile(__dirname + "/public/html/api_poster.html");
});

app.get("/wbs", function (req, res) {
  res.sendFile(__dirname + "/public/html/wbs.html");
});

app.get("/demo", function (req, res) {
  res.sendFile(__dirname + "/public/html/demo.html");
  // res.end(__dirname+"/public/src/db.PNG")
});

app.get("/crud", function (req, res) {
  res.sendFile(__dirname + "/public/html/CRUD.html");
});

app.get("/homeview", function (req, res) {
  res.sendFile(__dirname + "/public/html/home_view.html");
});

//사용자 만들기 페이지
app.get("/insert_users", function (request, response) {
  fs.readFile("./public/html/CRUD.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//사용자 업데이트 페이지
app.get("/update_users", function (request, response) {
  fs.readFile("./public/html/update.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//글쓰기 페이지
app.get("/insert_post", function (request, response) {
  fs.readFile("./public/html/post_add.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//글 리스트 페이지
app.get("/post_list", function (request, response) {
  fs.readFile("./public/html/post_list.html", "utf8", function (error, data) {
    response.send(data);
  });
});

app.get("/post_page", function (request, response) {
  fs.readFile("./public/html/post_page.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//  ------------------------- get.html ^ -------------------------------------------------

//글 전체 가져오기
app.get("/get_all_post", function (req, res) {
  console.log("Post_C");
  console.log(req.body);

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();
  var sql = "select * from users_post";

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//사용자 전체 가져오기
app.get("/get_users", function (req, res) {
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql = "select * from users";
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//  ------------------------- get.sql ^ -------------------------------------------------

//사용자 생성 post
app.post("/insert_users", function (req, res) {
  console.log("Post_C");
  console.log(req.body);
  var uuid = req.body.uuiid;
  var id = req.body.id;
  var passwd = req.body.passwd;
  var name = req.body.name;
  var create_date = req.body.create_date;

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결

  var sql = `INSERT INTO users (id, passwd, name) VALUE ('${id}','${passwd}','${name}')`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//사용자 삭제 post
app.post("/delete_users", function (req, res) {
  console.log(req.body);
  console.log("Post_D");

  sql = "delete from users where uuid_users =" + '"' + req.body.uuid + '"';
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
});

//사용자 수정 Post
app.post("/update_p", function (req, res) {
  console.log("Post_C");
  console.log(req.body);

  //나이 예외 처리 필요
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql =
    "update users set id =" +
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
    " where id_uuid = " +
    '"' +
    req.body.uuid +
    '"';

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//글 생성 post
app.post("/insert_post", function (req, res) {
  console.log("Post_C");
  console.log(req.body);

  var post_title = req.body.post_title;
  var uuid_users = req.body.uuid_users;
  var post_conent = req.body.post_conent;

  if ((req.body.post_debate = "on")) {
    post_debate = 1;
  } else {
    post_debate = 0;
  }
  var post_movie_name = req.body.post_movie_name;
  var post_movie_id = req.body.post_movie_id;

  const conn = mysql.createConnection(dbconfig);
  conn.connect();
  var sql = `INSERT INTO users_post (post_conent, post_debate , post_movie_id, post_movie_name, post_title, uuid_users) VALUE ('${post_conent}','${post_debate}','${post_movie_id}','${post_movie_name}','${post_title}',"${uuid_users}")`;

  console.log(sql);
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

// //sql 생성
// app.post("/get_comment", function (req, res) {
//   console.log("comment_i");
//   console.log(req.body);

//   var uuid_post = req.body.uuid_post;

//   //나이 예외 처리 필요
//   const conn = mysql.createConnection(dbconfig);
//   conn.connect(); // mysql과 연결
//   var sql =
//     "select * from users_comment where uuid_post =" + '"' + uuid_post + '"';
//   console.log(sql);
//   conn.query(sql, function (err, rows, fields) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//     }

//     res.send(rows);
//   });
//   conn.end();
// });

// app.post("/update_movie_list", function (req, res) {
//   console.log("Post_C");
//   console.log(req.body);

//   //나이 예외 처리 필요
//   const conn = mysql.createConnection(dbconfig);
//   conn.connect(); // mysql과 연결
//   var sql =
//     "select * from users_movie_list" +
//     "where uuid_movie =" +
//     '"' +
//     req.body.uuid +
//     '"' +
//     "";
//   conn.query(sql, function (err, rows, fields) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//     }

//     res.send(rows);
//   });
//   conn.end();
// });

app.listen(port, () => {
  //클라이언트 대기
  console.log("listening on ??? *:" + port);
});
