import express from 'express';
import { Device } from '@prisma/client';
import { z } from 'zod';

import { NotFoundError } from '../core/error';
import { ErrorResponse } from '../interfaces/error.interface';
import {
    DeviceRegisterRequestSchema,
    DeviceRegisterRequestType,
    DeviceUpdateRequestSchema,
    DeviceUpdateRequestType
} from '../serializers/device';
import { list } from '../services/device-list';
import { register } from '../services/device-register';
import { detail } from '../services/device-detail';
import { update } from '../services/device-update';
import { deviceDelete } from '../services/device-delete';

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

app.get('/:id', async (
    req: express.Request<{ id: number }>,
    res: express.Response<Device | ErrorResponse>
): Promise<void> => {
    const id = req.params.id;
    try {
        const responseData = await detail(id);
        res.status(200).send(responseData);
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404).send({
                message: 'Not Found',
                details: `not found id: ${id}`
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
    req: express.Request<{ id: number }, any, DeviceUpdateRequestType>,
    res: express.Response<ErrorResponse>
): Promise<void> => {
    const id = req.params.id;
    const requestBody = DeviceUpdateRequestSchema.parse(req.body);
    try {
        await update(id, requestBody);
        res.sendStatus(201);
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
                details: `not found id: ${id}`
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
app.delete('/:id', async (
    req: express.Request<{ id: number }>,
    res: express.Response<Device | ErrorResponse>
): Promise<void> => {
    const id = req.params.id;
    try {
        const responseData = await deviceDelete(id);
        res.status(201);
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404).send({
                message: 'Not Found',
                details: `not found id: ${id}`
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
