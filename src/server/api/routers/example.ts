import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getItems: publicProcedure.query(async ({ ctx }) => {
    let items = await ctx.prisma.image.findMany();

    return items;
  }),
});

export const caller = exampleRouter.createCaller({
  session: null,
  prisma: prisma,
});
