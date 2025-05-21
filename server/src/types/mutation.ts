import {
    arg,
    booleanArg,
    intArg,
    list,
    mutationField,
    nullable,
    stringArg,
} from 'nexus';
import { z } from 'npm:zod';

const CrawlerSchema = z.object({
    url: z.string().url(),
    label: z.string().nonempty(),
    active: z.boolean(),
    tags: z.array(z.string()),
    regexpBoundary: z.string()
        .refine((val) => new RegExp(val), {
            message: 'Invalid regular expression pattern',
        }),
    maxDepth: z.number().positive({
        message: 'maxDepth must be greater than 0',
    }),
    intervalMinutes: z.number().positive({
        message: 'intervalMinutes must be greater than 0',
    }),
});

export const mutation_createCrawler = mutationField('createCrawler', {
    type: 'Crawler',
    args: {
        url: arg({ type: 'URL' }),
        label: stringArg(),
        active: booleanArg({ default: false }),
        tags: list(stringArg({ default: [] })),
        regexpBoundary: stringArg({ default: '.*' }),
        maxDepth: intArg({ default: 2 ** 15 - 1 }),
        intervalMinutes: intArg({ default: 60 }),
    },
    resolve: async (_root, args, ctx) => {
        const { data, success, error } = CrawlerSchema.safeParse(args);
        if (!success) {
            throw new Error(
                error.issues.map((e) => `"${e.path}": ${e.message}`).join('; '),
            );
        }
        return await ctx.prisma.crawler.create({ data });
    },
});

export const mutation_updateCrawler = mutationField('updateCrawler', {
    type: 'Crawler',
    args: {
        id: intArg(),
        url: nullable(arg({ type: 'URL' })),
        label: nullable(stringArg()),
        active: nullable(booleanArg()),
        tags: nullable(list(stringArg())),
        regexpBoundary: nullable(stringArg()),
        maxDepth: nullable(intArg()),
        intervalMinutes: nullable(intArg()),
    },
    resolve: async (_root, args, ctx) => {
        const { data, success, error } = CrawlerSchema.safeParse(args);
        if (!success) {
            throw new Error(
                error.issues.map((e) => `"${e.path}": ${e.message}`).join('; '),
            );
        }
        return await ctx.prisma.crawler.update({
            where: { id: args.id },
            data,
        });
    },
});

export const mutation_deleteCrawler = mutationField('deleteCrawler', {
    type: 'Crawler',
    args: {
        id: intArg(),
    },
    resolve: async (_root, args, ctx) => {
        return await ctx.prisma.crawler.delete({
            where: { id: args.id },
        });
    },
});

export const mutation_startCrawling = mutationField('startCrawling', {
    type: 'Job',
    args: {
        id: intArg(),
    },
    resolve: async (_root, args, ctx) => {
        const job = await ctx.prisma.job.create({
            data: {
                status: 'PENDING',
                crawler: {
                    connect: {
                        id: args.id,
                    },
                },
            },
        });
        return job;
    },
});
