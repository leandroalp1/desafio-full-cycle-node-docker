import express from 'express'
import mysql from 'mysql'
const app = express()


const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb',
});

connection.connect();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`;
const name = 'Leandro';

const insertQuery = `INSERT INTO people (name) VALUES ('${name}')`;

connection.query(createTableQuery)
connection.query(insertQuery)

app.get('/', (req, res) => {
 
  const selectQuery = 'SELECT * FROM people';

  connection.query(selectQuery, (err, rows) => {
    console.log(rows)
    if (err) throw err;
    let names = '<ul>';
    rows.forEach(row => {
      names += `<li>${row.name}</li>`;
    });
    names += '</ul>';

    res.send(`<h1>Full Cycle Rocks!</h1>`);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000')
})


