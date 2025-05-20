FROM rust:latest

WORKDIR /app

RUN git clone --depth 1 --branch v0.1.0 https://github.com/apollographql/apollo-mcp-server.git apollo-mcp-server
RUN cargo build --release --manifest-path apollo-mcp-server/Cargo.toml --package apollo-mcp-server
RUN cp apollo-mcp-server/target/release/apollo-mcp-server /usr/local/bin
RUN rm -rf apollo-mcp-server

COPY mcp/operations operations
COPY server/generated/graphql/schema.graphql schema.graphql

EXPOSE 3001

# -m to allow mutations
# -e graphql endpoint
CMD ["apollo-mcp-server", "-d", ".", "-s", "schema.graphql", "-o", "operations/GetConfigurations.graphql", "operations/GetPages.graphql", "-e", "http://host.docker.internal:4000", "--sse-port", "3001"]
