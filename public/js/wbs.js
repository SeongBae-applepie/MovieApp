


document.getElementById("text").i

conn.connect(); // mysql과 연결
var sql = 'select * from users2'
conn.query(sql, function(err, rows, fields){
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
    
        text.innerText(rows); // rows: 쿼리 실행 결과물
});
conn.end();