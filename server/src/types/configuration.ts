import { objectType } from 'nexus';

export const Configuration = objectType({
    name: 'Configuration',
    definition(t) {
        t.id('id');
        t.url('url');
        t.string('label');
        t.boolean('active');
        t.list.string('tags');
        t.string('regexpBoundary');
        t.int('maxDepth');
        t.int('intervalMinutes');
        t.list.field('jobs', {
            type: 'Job',
            resolve: async (parent, _args, ctx) => {
                return await ctx.prisma.job.findMany({
                    where: { configurationId: parent.id },
                });
            },
        });
        t.list.field('pages', {
            type: 'Page',
            resolve: async (parent, _args, ctx) => {
                return await ctx.prisma.page.findMany({
                    where: { configurationId: parent.id },
                });
            },
        });
    },
});
