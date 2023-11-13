console.log("start db_sc");
const mysql = require("mysql2");
console.log(__dirname);
const dbconfig = (module.exports = {
  host: "localhost",
  user: "root",
  password: "1215",
  database: "movie_Db",
});

const conn = mysql.createConnection(dbconfig);

window.onload = init();

function init() {
  var p = document.getElementById("text");

  conn.connect(); // mysql과 연결
  var sql = "select * from users1";
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }

    res.send(rows);
    p.innerText(rows[0]);
  });
  conn.end();
}
