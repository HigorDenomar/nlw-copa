import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        avatarUrl: true,
        name: true,
        email: true,
      },
      take: 4,
    });

    return { count, users };
  });
}
