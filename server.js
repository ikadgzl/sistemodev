// @ts-check

const { Client } = require('pg');
const express = require('express');
const app = express();
const port = 8080;

const client = new Client({
  password: 'root',
  user: 'root',
  host: 'postgres'
});

app.use(express.static('public'));

app.get('/employees', async (req, res) => {
  await client.query(`INSERT INTO employees(name, title) VALUES
  ('${new Date()}', '${req.ip}');
 `);

  const results = await client
    .query('SELECT * FROM employees')
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error('Query failed');
    });
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(results));
});

(async () => {
  await client.connect();

  await client.query('DELETE FROM employees WHERE id=1');
  await client.query('DELETE FROM employees WHERE id=2');
  await client.query('DELETE FROM employees WHERE id=3');

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
})();
