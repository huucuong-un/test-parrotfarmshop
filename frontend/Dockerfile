FROM node:18.17-alpine3.18

# COPY [host machine] [container] (first path is relative to the Dockerfile, second is relative to root on the container)
COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

# RUN npm run build
CMD ["npm", "start"]