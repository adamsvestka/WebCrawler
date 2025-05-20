import { join } from '@std/path/join';
import { makeSchema } from 'nexus';
import * as types from './types/index.ts';

const pathname = new URL('../generated/graphql', import.meta.url).pathname;

export const schema = makeSchema({
    types,
    outputs: {
        schema: join(pathname, 'schema.graphql'),
        typegen: join(pathname, 'nexus-typegen.ts'),
    },
    contextType: {
        module: join(new URL('.', import.meta.url).pathname, 'context.ts'),
        export: 'Context',
    },
    nonNullDefaults: {
        input: true,
        output: true,
    },
});
