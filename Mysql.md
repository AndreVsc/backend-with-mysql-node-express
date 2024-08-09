```SQL
CREATE SCHEMA loja;
USE loja;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);
INSERT INTO produtos (nome, preco) VALUES 
('Produto A', 29.99),
('Produto B', 49.99),
('Produto C', 99.99),
('Produto D', 19.99);

SELECT * FROM produtos;

```
