import { DbClient } from '../core/db-client';
import { NotFoundError } from '../core/error';

export const deviceDelete = async (id: number): Promise<void> => {
    const client = DbClient.instance;
    const detail = await client.device.findUnique({
        where: { id }
    });
    if (!detail) {
        throw new NotFoundError();
    }

    await client.device.delete({
        where: { id }
    });
}
