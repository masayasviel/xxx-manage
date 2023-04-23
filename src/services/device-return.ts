import { DbClient } from '../core/db-client';
import { NotFoundError } from '../core/error';

export const deviceReturn = async (id: number): Promise<void> => {
    const client = DbClient.instance;
    const device = await client.history.findUnique({
        where: { id }
    });
    if (!device) {
        throw new NotFoundError();
    }
    await client.$transaction(async (prismaClient): Promise<void> => {
        await prismaClient.device.update({
            where: { id },
            data: {
                deviceStatus: '0',  // TODO: 返却済み
            }
        });
        await prismaClient.history.update({
            where: {
                id
            },
            data: {
                isReturn: true,
            }
        });
    });
};
