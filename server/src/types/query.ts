import { extendType, intArg, list } from 'nexus';

export const Query = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('configurations', {
            type: 'Configuration',
            resolve: async (_root, _args, ctx) => {
                return await ctx.prisma.configuration.findMany();
            },
        });
        t.list.field('pages', {
            type: 'Page',
            args: {
                configurationIds: list(intArg()),
            },
            resolve: async (_root, args, ctx) => {
                return await ctx.prisma.page.findMany({
                    where: {
                        configurationId: { in: args.configurationIds },
                    },
                });
            },
        });
    },
});
