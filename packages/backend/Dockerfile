FROM node:16-alpine3.14 as builder

WORKDIR /usr/app

COPY . ./

RUN npm install
RUN npm run build

FROM node:16-alpine3.14 as publish

WORKDIR /app

COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/dist ./
RUN npm install --only=production

FROM gcr.io/distroless/nodejs:16
WORKDIR /app
COPY --from=publish /app ./

EXPOSE 8080

CMD ["index.js"]
