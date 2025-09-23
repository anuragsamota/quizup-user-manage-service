// User service file
// Imports

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';

import router from './router/route.js';
import connect from './database/conn.js';
import passport from './passport.js';

config();

const app = express();


const corsOptions = {
  origin: "*", 
  credentials: true, // if you want to allow cookies
};

app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

const port = process.env.PORT || 8080;

app.use('/api', router);

app.get('/', (req, res) => {
    try {
        res.json({"serviceType":"user_manage","endpoint" : "/api"});
    } catch (error) {
        res.json(error)
    }
});

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error => {
    console.log("Invalid Database Connection");
});