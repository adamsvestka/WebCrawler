import { intArg, list, queryField } from 'nexus';

export const query_crawlers = queryField('crawlers', {
    type: list('Crawler'),
    resolve: async (_root, _args, ctx) => {
        return await ctx.prisma.crawler.findMany();
    },
});

export const query_pages = queryField('pages', {
    type: list('Page'),
    args: {
        crawlerIds: list(intArg()),
    },
    resolve: async (_root, args, ctx) => {
        return await ctx.prisma.page.findMany({
            where: {
                crawlerId: { in: args.crawlerIds },
            },
        });
    },
});
