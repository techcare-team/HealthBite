import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

const init = async (): Promise<string> => {

    return new Promise((resolve, rejected) => {
        const connection = mysql.createConnection({
            host: 'mysql-db',
            user: 'resanata',
            password: '1231',
            database: 'healthbite',
        })
        connection.connect((err) => {
            if(err){
                rejected(`err : ${err}`);
            }
        });
        const app = express();

        app.get('/', (req, res) => {
            res.send('ok2');
        })

        app.listen(+process.env.PORT_APP!, () => {
            console.log(`APPLICATION RUNNING ON PORT ${+process.env.PORT_APP!}`);
        });
    })
};

init().catch(err => console.log(err));

