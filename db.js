import mysql from 'mysql2'

export const db = mysql.createConnection({
    host:"localhost",
    user:'admin',
    password:'admin',
    database:'crud'
})