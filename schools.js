const express = require('express');
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'temp1234',
  database: 'wizard_schools_db',
});

connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// Routes

app.get('/', (req, res) => {
  connection.query('SELECT * FROM schools', (err, result) => {
    let html = '<h1>Magical Schools</h1>';
    html += '<ul>';

    result.forEach(item => {
      html += `<li><p> ID: ${item.id}</p>`;
      html += `<p>School: ${item.name} </p></li>`;
    });

    html += '</ul>';

    res.send(html);
  });
});
