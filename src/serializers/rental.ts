import { z } from 'zod';

export const DeviceRentalRequestSchema = z.object({
    lendingDestinate: z.string(),
    returnDate: z.string(),
    remarks: z.string().optional(),
});

export type DeviceRentalRequestType = z.infer<typeof DeviceRentalRequestSchema>;
