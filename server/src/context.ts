import { PrismaClient } from '../generated/prisma/client.ts';

export interface Context {
    prisma: PrismaClient;
}

export const context: Context = {
    prisma: new PrismaClient(),
};
