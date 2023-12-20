FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
ENV PORT "5000"
ENV DATABASE_URL "postgresql://postgres:1231@34.101.111.250:5432/healthbite?schema=public"
ENV JWT_SECRET "JWT_RAHASIA"
ENV GOOGLE_CLIENT_ID "1034337740753-38gq0b2cggpp4k8vurr5409v67l23dg4.apps.googleusercontent.com"
ENV GOOGLE_CLIENT_SECRET "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"
RUN npx prisma generate
CMD npm run start:prod