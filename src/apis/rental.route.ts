import express from 'express';
import { z } from 'zod';

import { NotFoundError } from '../core/error';
import { ErrorResponse } from '../interfaces/error.interface';
import {
    DeviceRentalRequestSchema,
    DeviceRentalRequestType
} from '../serializers/rental';
import { rental } from '../services/device-rental';
import { deviceReturn } from '../services/device-return';

const app = express();

app.post('/:id', async (
    req: express.Request<{ id: number }, any, DeviceRentalRequestType>,
    res: express.Response<ErrorResponse>
): Promise<void> => {
    const deviceId = req.params.id;
    try {
        const requestParam = DeviceRentalRequestSchema.parse(req.body);
        await rental(deviceId, requestParam);
    } catch (e) {
        if (e instanceof z.ZodError) {
            res.status(400).send({
                message: 'Bad Request',
                details: e.message
            });
        }

        if (e instanceof NotFoundError) {
            res.status(404).send({
                message: 'Not Found',
                details: `not found device id: ${deviceId}`
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

app.patch('/:id', async (
    req: express.Request<{ id: number }>,
    res: express.Response<ErrorResponse>
): Promise<void> => {
    const historyId = req.params.id;
    try {
        await deviceReturn(historyId);
    }  catch (e) {
        if (e instanceof z.ZodError) {
            res.status(400).send({
                message: 'Bad Request',
                details: e.message
            });
        }

        if (e instanceof NotFoundError) {
            res.status(404).send({
                message: 'Not Found',
                details: `not found history id: ${historyId}`
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
