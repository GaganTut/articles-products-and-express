DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price MONEY NOT NULL,
  inventory INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS articles;

CREATE TABLE IF NOT EXISTS articles (
  title VARCHAR(100) PRIMARY KEY,
  body text NOT NULL,
  author VARCHAR(50) NOT NULL
);

INSERT INTO products (name, price, inventory)
  VALUES
    ('Gameboy', '59.99', 2),
    ('PSP', '99.99', 34),
    ('Basketball', '14.49', 23),
    ('Markers', '0.99', 342);

INSERT INTO articles (title, body, author)
  VALUES
    ('Flying Birds', 'Most birds fly unless you are a chicken or an ostrich or few others.', 'Bird Master'),
    ('Awesome Sauce', 'It is all about tapatiooooooo', 'Doctor Sauce');
