import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { DbClient } from './src/core/db-client';
import device from './src/apis/device.route';
import rental from './src/apis/rental.route';

dotenv.config();
DbClient.init();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/device', device);
app.use('/rental', rental);

app.listen(PORT, () => {
    console.log(`https server running: http://localhost:${PORT}`);
});
