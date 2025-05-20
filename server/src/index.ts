import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { context } from './context.ts';
import { schema } from './schema.ts';

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => await context,
});

console.log(`🚀 Server ready at ${url}`);
