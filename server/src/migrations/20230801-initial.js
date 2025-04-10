exports.up = async (db) => {
  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`
  );
  
  await db.query(`
    CREATE TABLE courses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      price NUMERIC(10,2) NOT NULL
    )`
  );
};

exports.down = async (db) => {
  await db.query('DROP TABLE IF EXISTS users CASCADE');
  await db.query('DROP TABLE IF EXISTS courses CASCADE');
};
