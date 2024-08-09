const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',       // Substitua pelo seu usuário
  password: 'ifsp',  // Substitua pela sua senha
  database: 'loja',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Operações CRUD

// Criar um novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;
  pool.query(
    'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
    [nome, preco],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Erro ao criar o produto');
      }
      res.status(201).json({ id: results.insertId, nome, preco });
    }
  );
});

// Ler todos os produtos
app.get('/produtos', (req, res) => {
  pool.query('SELECT * FROM produtos', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Erro ao buscar produtos');
    }
    res.json(results);
  });
});

// Ler um produto específico
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM produtos WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Erro ao buscar o produto');
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Produto não encontrado');
    }
  });
});

// Atualizar um produto
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  pool.query(
    'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?',
    [nome, preco, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Erro ao atualizar o produto');
      }
      if (results.affectedRows > 0) {
        res.json({ id, nome, preco });
      } else {
        res.status(404).send('Produto não encontrado');
      }
    }
  );
});

// Excluir um produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM produtos WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Erro ao excluir o produto');
    }
    if (results.affectedRows > 0) {
      res.send('Produto excluído com sucesso');
    } else {
      res.status(404).send('Produto não encontrado');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
