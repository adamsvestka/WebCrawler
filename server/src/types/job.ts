import { objectType } from 'nexus';

export const Job = objectType({
    name: 'Job',
    definition(t) {
        t.int('id');
        t.field('status', { type: 'Status' });
        t.nullable.date('startTime');
        t.nullable.date('endTime');
        t.nullable.int('pageCount');
        t.list.field('pages', {
            type: 'Page',
            resolve: async (root, _args, ctx) => {
                console.log(root, _args);
                return await ctx.prisma.page.findMany({
                    where: { configurationId: root.configurationId },
                });
            },
        });
    },
});
