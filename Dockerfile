FROM node:25.8.2-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . . 

RUN pnpm run build

FROM node:25.8.2-slim AS runner

WORKDIR /app
ENV NODE_EVN=production

RUN corepack enable

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3100

CMD ["node", "dist/main"]
