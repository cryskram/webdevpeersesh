import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    participants: async () => {
      return await prisma.participant.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
    },

    participant: async (_: never, { id }: { id: string }) => {
      return await prisma.participant.findUnique({
        where: { id: id },
      });
    },
  },

  Mutation: {
    addStudent: async (
      _: never,
      {
        name,
        email,
        usn,
        dept,
        phone,
      }: {
        name: string;
        email: string;
        usn: string;
        dept: string;
        phone: string;
      }
    ) => {
      return await prisma.participant.create({
        data: {
          name: name,
          email: email,
          usn: usn,
          dept: dept,
          phone: phone,
        },
      });
    },

    toggle: async (_: never, { id }: { id: string }) => {
      const mParticipant = await prisma.participant.findUnique({
        where: { id: id },
      });

      return await prisma.participant.update({
        where: { id: id },
        data: {
          isPresent: !mParticipant?.isPresent,
        },
      });
    },
  },
};
