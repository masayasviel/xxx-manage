import { PrismaClient } from '@prisma/client';

export class DbClient {
    private static client: PrismaClient;

    static init() {
        DbClient.client = new PrismaClient();
    }

    static get instance(): PrismaClient {
        if (!DbClient.client) {
            DbClient.init();
        }
        return DbClient.client;
    }
}
