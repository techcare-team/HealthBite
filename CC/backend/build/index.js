"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const connection = mysql2_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'resanata',
    password: '1231',
    database: 'healthbite'
});
connection.connect((err) => {
    if (err) {
        console.log('asd');
    }
    else {
        console.log('success');
    }
});
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('ok');
});
app.listen(+process.env.PORT_APP, () => {
    console.log(`APPLICATION RUNNING ON PORT ${+process.env.PORT_APP}`);
});
