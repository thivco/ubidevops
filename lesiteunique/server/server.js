const express = require("express");
const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: "localhost", 
//   user: "mzenati", 
//   password: "root", 
//   database: "spacegames"
// });

const db = mysql.createConnection({
  host: "db", 
  user: "john", 
  password: "doe", 
  database: "spacegames"
});



const app = express();
const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
  res.json({ message: "Hello from ZAAP D ASTRUB!" });
});

app.get("/final", (req, res) => {
  let sql = 'INSERT INTO Utilisateur (pseudo, score) VALUES ("Cheval", "1000")';
  db.query(sql, (err, result) => {
    if (err) throw err;
  });
})

app.get("/user", (req, res) => {
    db.query("SELECT * FROM Utilisateur", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
    });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});