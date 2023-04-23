import { z } from 'zod';

const CODE_REGEX = /^[0-9]{1,2}$/;

export const DeviceRegisterRequestSchema = z.object({
    maker: z.string().optional(),
    category: z.string().regex(CODE_REGEX),
    name: z.string(),
    tepla: z.string(),
    os: z.string().optional(),
    osVersion: z.string().optional(),
    isEmergencyContact: z.boolean(),
    isCapitalization: z.boolean(),
    amount: z.number().min(0),
    purchaseDate: z.string().datetime({ offset: true }).optional(),
    storageLocate: z.string().optional(),
    deviceStatus: z.string().regex(CODE_REGEX),
    remarks: z.string().optional(),
});

export type DeviceRegisterRequestType = z.infer<typeof DeviceRegisterRequestSchema>;

export const DeviceUpdateRequestSchema = z.object({
    maker: z.string().optional(),
    category: z.string().regex(CODE_REGEX),
    name: z.string(),
    tepla: z.string(),
    os: z.string().optional(),
    osVersion: z.string().optional(),
    isEmergencyContact: z.boolean(),
    isCapitalization: z.boolean(),
    amount: z.number().min(0),
    purchaseDate: z.string().datetime({ offset: true }).optional(),
    storageLocate: z.string().optional(),
    deviceStatus: z.string().regex(CODE_REGEX),
    remarks: z.string().optional(),
});

export type DeviceUpdateRequestType = z.infer<typeof DeviceUpdateRequestSchema>;
