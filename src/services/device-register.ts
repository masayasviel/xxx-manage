import { DbClient } from '../core/db-client';
import {
    DeviceRegisterRequestType
} from '../serializers/device';

export const register = async (data: DeviceRegisterRequestType): Promise<void> => {
    const client = DbClient.instance;
    await client.device.create({
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
};
