import { Device } from '@prisma/client';

import { DbClient } from '../core/db-client';
import { NotFoundError } from '../core/error';
import { DeviceUpdateRequestType } from '../serializers/device';

export const update = async (id: number, data: DeviceUpdateRequestType): Promise<void> => {
    const client = DbClient.instance;
    const detail = await client.device.findUnique({
        where: { id }
    });
    if (!detail) {
        throw new NotFoundError();
    }

    await client.device.update({
        where: { id },
        data: {
            maker: data.maker ?? null,
            category: data.category,
            name: data.name,
            tepla: data.tepla,
            os: data.os ?? null,
            osVersion: data.osVersion ?? null,
            isEmergencyContact: data.isEmergencyContact,
            isCapitalization: data.isCapitalization,
            amount: data.amount,
            purchaseDate: data.purchaseDate ?? null,
            storageLocate: data.storageLocate ?? null,
            deviceStatus: data.deviceStatus,
            remarks: data.remarks ?? null,
        }
    });
}
