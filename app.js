const express = require("express");
const app = express();
const path = require("path")
const mysql = require("mysql2");
const dbconfig = require("./db_config.js");
const conn = mysql.createConnection(dbconfig);
app.use(express.static(path.join(__dirname)));



var port = 51713;

app.get("/", function(req,res) {
    res.sendFile(__dirname+"/home.html");
})


app.get('/db',function(req, res){
const conn = mysql.createConnection(dbconfig);
conn.connect(); // mysql과 연결
var sql = 'select * from users2'
conn.query(sql, function(err, rows, fields){
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        
        res.send(rows);
        
});
});



app.get('/api', function(req,res) {
    console.log(__dirname);
    res.sendFile(__dirname+"/api.html");
})
 


app.listen(port, () => {
  //클라이언트 대기
  console.log("listening on ??? *:" + port);
});

function get_db(){
    conn.connect(); // mysql과 연결
    var sql = 'select * from users2'
    conn.query(sql, function(err, rows, fields){
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        
        res.send(rows);
});

}