import mysql from 'mysql2/promise';

export const connectDB = async() => {
  const connection = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1423',
    database:'my-api',
  });
  console.log('MySQL connected');
  return connection;
}