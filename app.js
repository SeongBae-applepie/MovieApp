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

//home
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/home.html");
});



//home wbs
app.get("/wbs", function (req, res) {
  res.sendFile(__dirname + "/public/html/wbs.html");
});



//글쓰기 페이지
app.get("/insert_post", function (request, response) {
  fs.readFile("./public/html/post_add_2.html", "utf8", function (error, data) {
    response.send(data);
  });
});


//홈 화면
app.get("/chart", function (request, response) {
  fs.readFile("./public/html/chart.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//검색 화면
app.get("/search", function (request, response) {
  fs.readFile("./public/html/search.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//검색 결과
app.get("/searchResult", function (request, response) {
  fs.readFile(
    "./public/html/searchResult.html",
    "utf8",
    function (error, data) {
      response.send(data);
    }
  );
});

//login_page
app.get("/login2", function (request, response) {
  fs.readFile("./public/html/login2.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//회원가입
app.get("/join", function (request, response) {
  fs.readFile("./public/html/join.html", "utf8", function (error, data) {
    response.send(data);
  });
});

//커뮤티니
app.get("/community", function (request, response) {
  fs.readFile("./public/html/community.html", "utf8", function (error, data) {
    response.send(data);
  });
});

app.get("/post_page", function (request, response) {
  fs.readFile("./public/html/notedetail.html", "utf8", function (error, data) {
    response.send(data);
  });
});

app.get("/mypage", function (request, response) {
  fs.readFile("./public/html/mypage.html", "utf8", function (error, data) {
    response.send(data);
  });
});

app.get("/event", function (request, response) {
  fs.readFile("./public/html/event.html", "utf8", function (error, data) {
    response.send(data);
  });
});


//  ------------------------- get.html ^ -------------------------------------------------
//글 전체 가져오기
app.get("/get_all_post", function (req, res) {
  console.log("Post_C");
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

//댓글 가져오기 가져오기
app.get("/get_id_comment", function (req, res) {
  console.log("get_comment");
  words = req._parsedOriginalUrl.query;
  var words = words.split("=%20");
  uuid_post = words[1];

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();

  var sql = `select * from user_comment where uuid_post="${uuid_post}"`;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

//글 id값 가져오기
app.get("/get_id_post", function (req, res) {
  console.log("get_id_post");
  words = req._parsedOriginalUrl.query;
  var words = words.split("=");
  post_uuid = words[1];

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();

  var sql = `select * from users_post WHERE uuid_post = "${post_uuid}"`;
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
  console.log("get_users");
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

//토론글 가져오기
app.get("/get_debate_post", function (req, res) {
  console.log("Post_D_get");
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();
  var sql = "select * from users_post where post_debate = 1";

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

//핫 게시글 가져오기
app.get("/get_hot_post", function (req, res) {
  console.log("Post_H_get");
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();
  var sql =
    "select * from users_post where post_debate = 0 ORDER BY post_views DESC";

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

//토론글 가져오기
app.get("/get_uuid_users_name", function (req, res) {
  console.log("get_uuid_users");

  words = req._parsedOriginalUrl.query;
  console.log(words);

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();
  // var sql = `select * from users where uuid_users="${words}"`;
  var sql = `SELECT users.name, users_post.post_content, users_post.uuid_post,users_post.post_title,users_post.post_create_date, users_post.uuid_users
FROM users_post JOIN users
ON  users.uuid_users = users_post.uuid_users;`;
  // STRING_AGG('합칠컬럼명', '구분자' ) WITHIN GROUP(ORDER BY '컬럼명')

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

//영화 좋아요
app.get("/get_users_movie_like", function (req, res) {
  words = req._parsedOriginalUrl.query;
  uuid_users = words.split("|")[0];
  movie_id = words.split("|")[1];

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();

  var sql = `select * from users_movie_list WHERE uuid_users = "${uuid_users}" AND movie_id = "${movie_id}"`;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    console.log("rr");
    res.send(rows);
  });
  conn.end();
});

//글 id값 가져오기
app.get("/get_login", function (req, res) {
  words = req._parsedOriginalUrl.query;
  console.log(words);
  var words = words.split("|");
  id = words[0];
  passwd = words[1];
  console.log(id);
  console.log(passwd);

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결.appendChild();

  var sql = `select * from users WHERE id = "${id}" and passwd="${passwd}"`;
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

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결

  var sql = `INSERT INTO users (id, passwd, name) VALUE ('${req.body.id}','${req.body.passwd}','${req.body.name}')`;

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
  console.log("Post_insert");
  console.log(req.body);

  var post_title = req.body.post_title;
  var uuid_users = req.body.uuid_users;
  var post_content = req.body.post_content;
  var post_debate = req.body.post_debate;
  var post_movie_poster = req.body.post_movie_poster;

  var post_movie_name = req.body.post_movie_name;
  var post_movie_id = req.body.post_movie_id;

  const conn = mysql.createConnection(dbconfig);
  conn.connect();
  var sql = `INSERT INTO users_post (post_content, post_debate , post_movie_id, post_movie_name, post_title, uuid_users, post_views, post_movie_poster) VALUE ("${post_content}","${post_debate}","${post_movie_id}","${post_movie_name}","${post_title}","${uuid_users}",0,"${post_movie_poster}")`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//글 생성 post
app.post("/views_post", function (req, res) {
  console.log("views_post");

  var uuid_post = req.body.uuid_post;

  console.log(uuid_post);

  const conn = mysql.createConnection(dbconfig);
  conn.connect();
  var sql = `UPDATE users_post SET post_views = post_views + 1 where uuid_post = "${uuid_post}"`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//글 삭제 post
app.post("/delete_post", function (req, res) {
  console.log(req.body);
  console.log("Post_D");

  var oj = {
    uuid_post: req.body.uuid_post,
  };

  fetch("pbl.hknu.ac.kr:51713/delete_post_C", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oj),
  });

  sql2 = `delete from users_post where uuid_post="${req.body.uuid_post}"`;

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  conn.query(sql2, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//글 삭제 시 comment 삭제 post
app.post("/delete_post_C", function (req, res) {
  console.log(req.body);
  console.log("Post_D");

  sql1 = `delete from user_comment where uuid_post="${req.body.uuid_post}"`;

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  conn.query(sql1, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
  });
  conn.end();
});

//댓글 작성
app.post("/insert_comment", function (req, res) {
  var uuid_post = req.body.uuid_post;
  var uuid_users = req.body.uuid_users;
  var comment_content = req.body.comment_content;

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql = `INSERT INTO user_comment (comment_content, uuid_users, uuid_post) VALUE ( '${comment_content}', '${uuid_users}' ,'${uuid_post}')`;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

app.post("/update_users_movie_list_insert", function (req, res) {
  console.log("uumli");
  console.log(req.body);
  console.log(req.body.movie_like);
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  // var sql = `UPDATE users_movie_list SET movie_star = ${req.body.movie_star} WHERE uuid_users = "${req.body.uuid_users}" AND movie_id = "${req.body.movie_id}" `;
  var sql = `INSERT INTO users_movie_list  (movie_id, movie_name, movie_star, movie_like, uuid_users) VALUE ( '${req.body.movie_id}', '${req.body.movie_name}' ,'${req.body.movie_star}','${req.body.movie_like}','${req.body.uuid_users}')`;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

app.post("/update_users_movie_list_like_update", function (req, res) {
  console.log("uumli");
  console.log(req.body);

  console.log(req.body.movie_like);
  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql = `UPDATE users_movie_list SET movie_like = ${req.body.movie_like} WHERE uuid_users = "${req.body.uuid_users}" AND movie_id = "${req.body.movie_id}" `;
  // var sql = `INSERT INTO users_movie_list  (movie_id, movie_name, movie_star, movie_like, uuid_users) VALUE ( '${req.body.movie_id}', '${req.body.movie_name}' ,'${req.body.movie_star}','${req.body.movie_like}','${req.body.uuid_users}')`;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

app.post("/update_users_movie_list_like", function (req, res) {
  console.log(req.body);

  const conn = mysql.createConnection(dbconfig);
  conn.connect(); // mysql과 연결
  var sql = `UPDATE users_movie_list SET movie_like = ${req.body.movie_like} WHERE uuid_users = "${req.body.uuid_users}" AND movie_id = "${req.body.movie_id}" `;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

app.post("/update_users_movie_list_star", function (req, res) {
  console.log("stars!!!!");
  console.log(req.body);
  const conn = mysql.createConnection(dbconfig);

  conn.connect(); // mysql과 연결
  var sql = `UPDATE users_movie_list SET movie_star=${req.body.movie_star} WHERE uuid_users = "${req.body.uuid_users}" AND movie_id = ${req.body.movie_id} `;
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    res.send(rows);
  });
  conn.end();
});

app.listen(port, () => {
  //클라이언트 대기
  console.log("listening on ??? *:" + port);
});
