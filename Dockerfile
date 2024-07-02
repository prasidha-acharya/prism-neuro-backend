FROM node:20-alpine 
RUN npm install -g prisma


WORKDIR /app


COPY package*.json /


RUN  npm install 

COPY . .

RUN npm run generate:prisma
# RUN npm run migration:create
EXPOSE 8000



CMD ["sh", "-c", "npx prisma migrate deploy && npm run swagger && npm run build  && npm run start:backend"]
