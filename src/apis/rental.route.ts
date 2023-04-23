import express from 'express';

import { ErrorResponse } from '../interfaces/error.interface';
import {
    DeviceRentalRequestSchema,
    DeviceRentalRequestType
} from '../serializers/rental';

const app = express();

app.post('/:id', async (
    req: express.Request<{ id: number }, any, DeviceRentalRequestType>,
    res: express.Response<ErrorResponse>
): Promise<void> => {
    const deviceId = req.params.id;
    const requestParam = DeviceRentalRequestSchema.parse(req.body);
});

app.patch('/:id', async (
    req: express.Request<{ id: number }>,
    res: express.Response<ErrorResponse>
): Promise<void> => {
    const deviceId = req.params.id;
});

export default app;
