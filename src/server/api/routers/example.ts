import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { Input } from "postcss";

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

  getItems: publicProcedure
    .input(
      z.object({
        color: z.string().default(""),
        brand: z.string().default(""),
        size: z.string().default(""),
      })
    )
    .query(async ({ input, ctx }) => {
      let items = await ctx.prisma.image.findMany({
        where: {
          AND: [input.brand ? { brand: input.brand } : {}],
        },
      });

      return items;
    }),
});

export const caller = exampleRouter.createCaller({
  session: null,
  prisma: prisma,
});
