import { PrismaClient } from '@prisma/client';

class PrismaInstance extends PrismaClient { };

export default new PrismaInstance;