const mysql = require('mysql');

// const db = mysql.createConnection({ host: "localhost", user: "mzenati", password: "root", database : "spacegames" });
const db = mysql.createConnection({ host: "db", user: "john", password: "doe", database : "spacegames" });

db.connect(function (err) { if (err) throw err; console.log("Connecté à la base de données MySQL!"); });

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM utilisateur", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});