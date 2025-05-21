FROM denoland/deno:latest

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY . .

RUN deno cache src/server.ts
RUN deno task generate

CMD ["deno", "run", "-A", "--env-file", "src/server.ts"]
