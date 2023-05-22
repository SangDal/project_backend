import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import adminRouter from './router/admin.js';
import userRouter from  "./router/user.js"
import { config } from './config.js';
import morgan from 'morgan';
import { db } from './db/database.js'

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny")); // 요청온거 확인하게 
app.use(adminRouter);
app.use("/user", userRouter);



app.listen(config.host.port, () => {
    console.log(`Server is running on port ${config.host.port}`);
});

