import { objectType } from 'nexus';

export const Page = objectType({
    name: 'Page',
    definition(t) {
        t.int('id');
        t.string('title');
        t.url('url');
        t.date('crawlTime');
        t.list.url('links');
    },
});
