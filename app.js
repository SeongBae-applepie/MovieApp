const express = require("express");
const app = express();
const path = require("path")
const mysql = require("mysql2");
const dbconfig = require("./public/config/db_config");
const conn = mysql.createConnection(dbconfig);
app.use(express.static(path.join(__dirname+"/public")));

app.use(express.static(path.join("./public/script")));



var port = 51713;

app.get("/", function(req,res) {
    res.sendFile(__dirname+"/public/home.html");
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
    res.sendFile(__dirname+"/public/api.html");
});


app.get('/m',function(req,res){
   var result = get_db();
   console.log(result);
   res.send(result);
});

app.get('/wbs',function(req,res){
    res.sendFile(__dirname+"/public/wbs.html");
 });

app.listen(port, () => {
  //클라이언트 대기
  console.log("listening on ??? *:" + port);
});




function get_db(){
    var result;
    conn.connect(); // mysql과 연결
    var sql = 'select * from users2'

    

    conn.query(sql, function(err, rows, fields){
        if (err) {
            console.error('error connecting: ' + err.stack);
        }

      
        console.log(rows[0].uuid);
        result = rows[0][0];
        console.log("res !!   "+result);
        console.log("res !!   2"+rows);
        return(result);
    });
    
}