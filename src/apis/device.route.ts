import express from 'express';
import { Device } from '@prisma/client';
import { z } from 'zod';

import { ErrorResponse } from '../interfaces/error.interface';
import {
    DeviceRegisterRequestSchema,
    DeviceRegisterRequestType
} from '../serializers/device';
import { list } from '../services/device-list';
import { register } from '../services/device-register';


const app = express();

app.get('', async (_, res: express.Response<Device[] | ErrorResponse>): Promise<void> => {
    try {
        const deviceList = await list();
        res.status(200).send(deviceList);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send({
                message: 'Internal Server Error',
                details: e.message
            });
        }

        console.error(e);

        res.status(500).send({
            message: 'Internal Server Error',
            details: 'unknown error!!!'
        });
    }
});

app.post('', async (
    req: express.Request<any, any, DeviceRegisterRequestType>,
    res: express.Response
): Promise<void> => {
    try {
        const requestBody = DeviceRegisterRequestSchema.parse(req.body);
        await register(requestBody);
        res.sendStatus(201);
    } catch (e) {
        if (e instanceof z.ZodError) {
            res.status(400).send({
                message: 'Bad Request',
                details: e.message
            });
        }

        if (e instanceof Error) {
            res.status(500).send({
                message: 'Internal Server Error',
                details: e.message
            });
        }

        console.error(e);

        res.status(500).send({
            message: 'Internal Server Error',
            details: 'unknown error!!!'
        });
    }
});

export default app;
