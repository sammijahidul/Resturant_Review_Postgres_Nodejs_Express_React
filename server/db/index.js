import pg from 'pg';

const { Pool } = pg;
 
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
 
const query = (text, params, callback) => {
  return pool.query(text, params, callback)
};

export default query;




// CREATE TABLE restaurants (
//     id BIGSERIAL NOT NULL PRIMARY KEY,
//     name VARCHAR(50) NOT NULL,
//     location VARCHAR(50) NOT NULL,
//     price_range INT NOT NULL check( price_range >= 1 AND price_range <= 5)
// );
// INSERT INTO restaurants (name, location, price_range) 
//     values ('Al-Kaderia', 'Rampura', 2);