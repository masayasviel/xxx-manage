import { Device } from '@prisma/client';

import { DbClient } from '../core/db-client';

export const list = async (): Promise<Device[]> => {
    const client = DbClient.instance;
    return client.device.findMany();
}
