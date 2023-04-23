import { DbClient } from '../core/db-client';
import { NotFoundError } from '../core/error';
import { DeviceRentalRequestType } from '../serializers/rental';

export const rental = async (id: number, param: DeviceRentalRequestType): Promise<void> => {
    const client = DbClient.instance;
    const device = await client.device.findUnique({
        where: { id }
    });
    if (!device) {
        throw new NotFoundError();
    }
    await client.$transaction(async (prismaClient): Promise<void> => {
        await prismaClient.device.update({
            where: { id },
            data: {
                deviceStatus: '0',  // TODO: 貸出中
            }
        });
        await prismaClient.history.create({
            data: {
                deviceId: id,
                lendingDestinate: param.lendingDestinate,
                returnDate: param.returnDate,
                remarks: param.remarks ?? null
            }
        });
    });
};
