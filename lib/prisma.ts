// lib/prisma.js (or utils/db.js, etc.)
import { PrismaClient } from "./generated/prisma";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

// This ensures only one PrismaClient instance is created globally
declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
