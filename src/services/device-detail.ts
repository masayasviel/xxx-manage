import { Device } from '@prisma/client';

import { DbClient } from '../core/db-client';
import { NotFoundError } from '../core/error';

export const detail = async (id: number): Promise<Device> => {
    const client = DbClient.instance;
    const detail = await client.device.findUnique({
        where: { id }
    });
    if (!detail) {
        throw new NotFoundError();
    }
    return detail;
};
